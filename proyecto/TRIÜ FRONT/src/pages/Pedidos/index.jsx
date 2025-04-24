import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Alert, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaFileInvoice, FaEye } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function PedidosLista() {
    const [listaPedido, setlistaPedido] = useState([]);
    const [pedidoEdit, setPedidoEdit] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [platillosDisponibles, setPlatillosDisponibles] = useState([]);
    const [totalPedido, setTotalPedido] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [facturaGenerada, setFacturaGenerada] = useState(null);

    // PAGINACIÓN
    const [paginaActual, setPaginaActual] = useState(1);
    const pedidosPorPagina = 6;
    const totalPaginas = Math.ceil(listaPedido.length / pedidosPorPagina);
    const pedidosMostrados = listaPedido
        .filter((p) => p && p.estado)
        .slice(
            (paginaActual - 1) * pedidosPorPagina,
            paginaActual * pedidosPorPagina
        );
    const cambiarPagina = (numero) => {
        setPaginaActual(numero);
    };

    // Configuracion para el uso de formato de moneda COP
    const formatoPesos = (valor) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
        }).format(valor);
    };

    const totalAcumulado = listaPedido.reduce(
        (total, pedido) => total + pedido.total,
        0
    );

    const consultarDatos = async () => {
        try {
            setLoading(true);
            const [pedidosResponse, platillosResponse] = await Promise.all([
                axios.get("http://localhost:9001/api/Pedidos", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }),
                axios.get("http://localhost:9001/api/platillos", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
            ]);

            setlistaPedido(pedidosResponse.data);
            setPlatillosDisponibles(platillosResponse.data.data || []);
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        consultarDatos();
    }, []);

    const calcularTotal = (platillos) => {
        return platillos.reduce((total, item) => {
            const platillo = platillosDisponibles.find(p => p._id === item.platillo);
            return total + (platillo?.precio || 0) * item.cantidad;
        }, 0);
    };

    const agregarPlatilloAPedido = (platilloId, cantidad) => {
        const platilloSeleccionado = platillosDisponibles.find(p => p._id === platilloId);
        if (!platilloSeleccionado) return;

        const nuevosPlatillos = [
            ...(pedidoEdit.platillos || []),
            { platillo: platilloId, cantidad: Number(cantidad) },
        ];

        setPedidoEdit(prev => ({
            ...prev,
            platillos: nuevosPlatillos,
        }));

        setTotalPedido(calcularTotal(nuevosPlatillos));
    };

    const eliminarPlatilloDelPedido = (index) => {
        const nuevosPlatillos = pedidoEdit.platillos.filter((_, i) => i !== index);
        setPedidoEdit(prev => ({
            ...prev,
            platillos: nuevosPlatillos,
        }));
        setTotalPedido(calcularTotal(nuevosPlatillos));
    };

    const eliminarPedido = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este pedido?")) {
            try {
                await axios.delete(`http://localhost:9001/api/Pedidos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                await consultarDatos();
            } catch (error) {
                setError("Error al eliminar pedido");
            }
        }
    };

    const abrirModalEditar = (pedido = null) => {
        setPedidoEdit(pedido || {
            fecha: new Date().toISOString().split('T')[0],
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            total: 0,
            Descripcion: "",
            estado: "Activo",
            platillos: [],
            cliente: {
                nombre: "",
                identificacion: "",
                direcFcion: "",
                telefono: "",
                email: ""
            }
        });

        setTotalPedido(pedido?.total || 0);
        setShowModal(true);
    };

    const generarFactura = async (pedidoId) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(
                `http://localhost:9001/api/pedidos/${pedidoId}/factura`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );

            setFacturaGenerada(response.data.factura);

            if (window.confirm(`¿Desea enviar la factura al correo ${response.data.factura.cliente.email}?`)) {
                await enviarFacturaPorEmail(pedidoId);
            }

        } catch (error) {
            console.error("Error completo:", error.response?.data || error.message);
            setError(error.response?.data?.error || "Error al generar factura");
        } finally {
            setLoading(false);
        }
    };

    const enviarFacturaPorEmail = async (pedidoId) => {
        try {
            await axios.post(
                `http://localhost:9001/api/pedidos/${pedidoId}/factura/enviar-email`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );
            alert("Factura enviada por correo exitosamente");
        } catch (error) {
            setError("Error al enviar email: " + (error.response?.data?.error || error.message));
        }
    };

    const handleImprimirFactura = () => {
        const ventanaImpression = window.open('', '_blank');
        const fechaFactura = new Date(facturaGenerada.fechaEmision).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        ventanaImpression.document.write(`
            <html>
                <head>
                    <title>Factura ${facturaGenerada.numeroFactura}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
                        .encabezado { text-align: center; margin-bottom: 20px; }
                        .titulo-factura { font-size: 24px; font-weight: bold; color: #2c3e50; }
                        .empresa { font-size: 18px; margin-bottom: 5px; }
                        .fecha { margin-bottom: 15px; }
                        .secciones { display: flex; justify-content: space-between; margin-bottom: 30px; }
                        .seccion { width: 48%; }
                        .tabla-productos { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        .tabla-productos th { background-color: #f8f9fa; text-align: left; padding: 10px; border: 1px solid #dee2e6; }
                        .tabla-productos td { padding: 10px; border: 1px solid #dee2e6; }
                        .totales { text-align: right; margin-top: 20px; }
                        .total-general { font-size: 18px; font-weight: bold; margin-top: 10px; }
                        .estado-pago { 
                            display: inline-block; 
                            padding: 5px 10px; 
                            border-radius: 5px; 
                            font-weight: bold;
                            background-color: ${facturaGenerada.estadoPago === 'Pagado' ? '#28a745' : facturaGenerada.estadoPago === 'Pendiente' ? '#ffc107' : '#dc3545'};
                            color: ${facturaGenerada.estadoPago === 'Pendiente' ? '#212529' : 'white'};
                        }
                        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #6c757d; }
                    </style>
                </head>
                <body>
                    <div class="encabezado">
                        <div class="empresa">Triti Raclette</div>
                        <div class="titulo-factura">FACTURA #${facturaGenerada.numeroFactura}</div>
                        <div class="fecha">${fechaFactura}</div>
                    </div>

                    <div class="secciones">
                        <div class="seccion">
                            <h4>Información del Cliente</h4>
                            <p><strong>Nombre:</strong> ${facturaGenerada.cliente?.nombre || 'No especificado'}</p>
                            <p><strong>Identificación:</strong> ${facturaGenerada.cliente?.identificacion || 'No especificado'}</p>
                            <p><strong>Dirección:</strong> ${facturaGenerada.cliente?.direccion || 'No especificada'}</p>
                        </div>
                        <div class="seccion">
                            <h4>Detalles de Factura</h4>
                            <p><strong>Estado:</strong> <span class="estado-pago">${facturaGenerada.estadoPago}</span></p>
                            <p><strong>Método de Pago:</strong> ${facturaGenerada.metodoPago}</p>
                            <p><strong>Pedido #:</strong> ${facturaGenerada.pedido || 'N/A'}</p>
                        </div>
                    </div>

                    <table class="tabla-productos">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${facturaGenerada.items.map(item => `
                                <tr>
                                    <td>${item.nombre}</td>
                                    <td>${item.cantidad}</td>
                                    <td>${formatoPesos(item.precioUnitario)}</td>
                                    <td>${formatoPesos(item.subtotal)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <div class="totales">
                        <div><strong>Subtotal:</strong> ${formatoPesos(facturaGenerada.subtotal)}</div>
                        <div><strong>Impuestos:</strong> ${formatoPesos(facturaGenerada.impuestos)}</div>
                        <div class="total-general"><strong>TOTAL:</strong> ${formatoPesos(facturaGenerada.total)}</div>
                    </div>

                    <div class="footer">
                        <p>¡Gracias por su preferencia!</p>
                        <p>Triti Raclette - ${new Date().getFullYear()}</p>
                    </div>

                    <script>
                        setTimeout(() => {
                            window.print();
                            window.onafterprint = function() {
                                setTimeout(() => window.close(), 300);
                            };
                        }, 300);
                    </script>
                </body>
            </html>
        `);
        ventanaImpression.document.close();
    };

    const guardarPedido = async () => {
        if (!validarPedido()) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No se encontró token de autenticación");
            }

            const url = pedidoEdit._id
                ? `http://localhost:9001/api/Pedidos/${pedidoEdit._id}`
                : "http://localhost:9001/api/Pedidos";

            const method = pedidoEdit._id ? "put" : "post";

            const payload = {
                ...pedidoEdit,
                total: totalPedido,
                cliente: {
                    nombre: pedidoEdit.cliente?.nombre || "Cliente Generico",
                    identificacion: pedidoEdit.cliente?.identificacion || "0000000000",
                    direccion: pedidoEdit.cliente?.direccion || "No especificada",
                    telefono: pedidoEdit.cliente?.telefono || "No especificado",
                    email: pedidoEdit.cliente?.email || "no@especificado.com"
                },
                fecha: pedidoEdit.fecha || new Date().toISOString().split('T')[0],
                hora: pedidoEdit.hora || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                estado: pedidoEdit.estado || "Activo"
            };

            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                timeout: 10000
            };

            const response = await axios[method](url, payload, config);

            if (!response.data) {
                throw new Error("No se recibieron datos en la respuesta");
            }

            await consultarDatos();

            alert(`Pedido ${pedidoEdit._id ? "actualizado" : "creado"} correctamente`);
            cerrarModal();

        } catch (error) {
            let errorMessage = "Error al procesar el pedido";

            if (error.response) {
                errorMessage = error.response.data?.message ||
                    `Error ${error.response.status}: ${error.response.statusText}`;
            } else if (error.request) {
                errorMessage = "No se recibió respuesta del servidor";
            } else {
                errorMessage = error.message;
            }

            console.error("Error detallado:", {
                error: error.message,
                config: error.config,
                response: error.response?.data
            });

            setError(errorMessage);
            alert(errorMessage);
        }
    };

    const validarPedido = () => {
        if (
            !pedidoEdit.fecha ||
            !pedidoEdit.hora ||
            !pedidoEdit.Descripcion ||
            !pedidoEdit.estado ||
            !pedidoEdit.platillos?.length
        ) {
            alert("Por favor completa todos los campos y selecciona al menos un platillo.");
            return false;
        }
        return true;
    };

    const cerrarModal = () => {
        setShowModal(false);
        setPedidoEdit(null);
        setTotalPedido(0);
        setFacturaGenerada(null);
    };

    const getEstadoBadge = (estado) => {
        return estado === "Activo"
            ? <Badge bg="success">Activo</Badge>
            : <Badge bg="secondary">Inactivo</Badge>;
    };

    if (!listaPedido) return


    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div className="container-fluid vh-100" style={{ minHeight: "100vh", width: "100vw", padding: "0", backgroundColor: "#343a40", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card text-primary h-100 shadow-lg rounded">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total de Pedidos</h5>
                            <h2 className="text-primary">{listaPedido.length}</h2>
                            <p>El total de Pedidos es</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-success h-100 shadow-lg rounded">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total Acumulado</h5>
                            <p className="card-text display-4">{formatoPesos(totalAcumulado)}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-success h-100 shadow-lg rounded">
                        <div className="card-body text-center">
                            <h5 className="card-title">Pedidos Activos</h5>
                            <h2 className="text-primary">
                                {listaPedido.filter(p => p?.estado === "Activo").length}
                            </h2>
                            <p>Pedidos activos</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="mb-0">
                            <FaFileInvoice className="me-2" />
                            Listado de Pedidos
                        </h2>
                        <Button variant="primary" onClick={() => abrirModalEditar()}>
                            Nuevo Pedido
                        </Button>
                    </div>

                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead className="table-dark">
                                <tr>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Total</th>
                                    <th>Descripción</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidosMostrados.map((pedido) => (
                                    <tr key={pedido._id}>
                                        <td>{new Date(pedido.fecha).toLocaleDateString("es-ES")}</td>
                                        <td>{pedido.hora}</td>
                                        <td>{formatoPesos(pedido.total)}</td>
                                        <td>{pedido.Descripcion}</td>
                                        <td>{getEstadoBadge(pedido.estado)}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Button variant="info" size="sm" onClick={() => abrirModalEditar(pedido)}>
                                                    <FaEdit />
                                                </Button>
                                                <Button variant="danger" size="sm" onClick={() => eliminarPedido(pedido._id)}>
                                                    <FaTrash />
                                                </Button>

                                                {/* Este boton es para generar la factura pero esta cambiado  */}
                                                {/* <Button
                                                    variant="success"
                                                    size="sm"
                                                    onClick={() => generarFactura(pedido._id)}
                                                    disabled={pedido.estado === "Inactivo"}
                                                >
                                                    <FaFileInvoice />
                                                </Button> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/* Paginación visual */}
                        <div className="d-flex justify-content-center mt-3">
                            <nav>
                                <ul className="pagination">
                                    {[...Array(totalPaginas).keys()].map((num) => (
                                        <li key={num} className={`page-item ${paginaActual === num + 1 ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => cambiarPagina(num + 1)}>
                                                {num + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Edición/Creación */}
            <Modal show={showModal} onHide={cerrarModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{pedidoEdit?._id ? "Editar Pedido" : "Nuevo Pedido"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="fecha"
                                value={pedidoEdit?.fecha || ""}
                                onChange={(e) => setPedidoEdit({ ...pedidoEdit, fecha: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Hora</Form.Label>
                            <Form.Control
                                type="time"
                                name="hora"
                                value={pedidoEdit?.hora || ""}
                                onChange={(e) => setPedidoEdit({ ...pedidoEdit, hora: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="Descripcion"
                                value={pedidoEdit?.Descripcion || ""}
                                onChange={(e) => setPedidoEdit({ ...pedidoEdit, Descripcion: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Estado</Form.Label>
                            <Form.Select
                                name="estado"
                                value={pedidoEdit?.estado || ""}
                                onChange={(e) => setPedidoEdit({ ...pedidoEdit, estado: e.target.value })}
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </Form.Select>
                        </Form.Group>
                        {/* Parte del cliente del pedido */}
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Cliente</Form.Label>
                            <Form.Control
                                type="text"
                                value={pedidoEdit?.cliente?.nombre || ""}
                                onChange={(e) => setPedidoEdit({
                                    ...pedidoEdit,
                                    cliente: { ...pedidoEdit.cliente, nombre: e.target.value }
                                })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Identificación</Form.Label>
                            <Form.Control
                                type="text"
                                value={pedidoEdit?.cliente?.identificacion || ""}
                                onChange={(e) => setPedidoEdit({
                                    ...pedidoEdit,
                                    cliente: { ...pedidoEdit.cliente, identificacion: e.target.value }
                                })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                value={pedidoEdit?.cliente?.direccion || ""}
                                onChange={(e) => setPedidoEdit({
                                    ...pedidoEdit,
                                    cliente: { ...pedidoEdit.cliente, direccion: e.target.value }
                                })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                value={pedidoEdit?.cliente?.telefono || ""}
                                onChange={(e) => setPedidoEdit({
                                    ...pedidoEdit,
                                    cliente: { ...pedidoEdit.cliente, telefono: e.target.value }
                                })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={pedidoEdit?.cliente?.email || ""}
                                onChange={(e) => setPedidoEdit({
                                    ...pedidoEdit,
                                    cliente: { ...pedidoEdit.cliente, email: e.target.value }
                                })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Total</Form.Label>
                            <Form.Control
                                type="text"
                                value={formatoPesos(totalPedido)}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Agregar Platillo</Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Select
                                    onChange={(e) => {
                                        const platilloId = e.target.value;
                                        if (platilloId) {
                                            const cantidad = prompt("Ingrese la cantidad:");
                                            if (cantidad && !isNaN(cantidad)) {
                                                agregarPlatilloAPedido(platilloId, cantidad);
                                            }
                                            e.target.value = "";
                                        }
                                    }}
                                >
                                    <option value="">Seleccionar platillo</option>
                                    {platillosDisponibles.map((platillo) => (
                                        <option key={platillo._id} value={platillo._id}>
                                            {platillo.nombre} - {formatoPesos(platillo.precio)}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>
                        </Form.Group>

                        <div className="mb-3">
                            <h5>Platillos seleccionados</h5>
                            {pedidoEdit?.platillos?.map((item, index) => {
                                const platillo = platillosDisponibles.find(p => p._id === item.platillo);
                                return (
                                    <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                                        <div>
                                            <strong>{platillo?.nombre || "Platillo no encontrado"}</strong> -
                                            Cantidad: {item.cantidad} -
                                            Subtotal: {formatoPesos((platillo?.precio || 0) * item.cantidad)}
                                        </div>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => eliminarPlatilloDelPedido(index)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={guardarPedido}>
                        {pedidoEdit?._id ? "Guardar Cambios" : "Crear Pedido"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de Factura Generada */}
            <Modal show={!!facturaGenerada} onHide={() => setFacturaGenerada(null)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Factura Generada</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {facturaGenerada && (
                        <div className="invoice-container">
                            <div className="invoice-header text-center mb-4">
                                <h2>FACTURA #{facturaGenerada.numeroFactura}</h2>
                                <p>Fecha: {new Date(facturaGenerada.fechaEmision).toLocaleDateString()}</p>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h5>Información del Cliente</h5>
                                    <p><strong>Nombre:</strong> {facturaGenerada.cliente?.nombre || "No especificado"}</p>
                                    <p><strong>Identificación:</strong> {facturaGenerada.cliente?.identificacion || "No especificado"}</p>
                                </div>
                                <div className="col-md-6">
                                    <h5>Detalles de Pago</h5>
                                    <p><strong>Estado:</strong> <Badge bg={facturaGenerada.estadoPago === "Pagado" ? "success" : "warning"}>
                                        {facturaGenerada.estadoPago}
                                    </Badge></p>
                                    <p><strong>Método:</strong> {facturaGenerada.metodoPago}</p>
                                </div>
                            </div>

                            <Table striped bordered className="mb-4">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>P. Unitario</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facturaGenerada.items?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nombre}</td>
                                            <td>{item.cantidad}</td>
                                            <td>{formatoPesos(item.precioUnitario)}</td>
                                            <td>{formatoPesos(item.subtotal)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <div className="text-end">
                                <div className="d-flex justify-content-end">
                                    <div className="invoice-totals" style={{ width: "300px" }}>
                                        <div className="d-flex justify-content-between">
                                            <strong>Subtotal:</strong>
                                            <span>{formatoPesos(facturaGenerada.subtotal)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <strong>Impuestos:</strong>
                                            <span>{formatoPesos(facturaGenerada.impuestos)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between fs-5 mt-2">
                                            <strong>Total:</strong>
                                            <strong>{formatoPesos(facturaGenerada.total)}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setFacturaGenerada(null)}>
                        Cerrar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleImprimirFactura}
                        className="me-2"
                    >
                        Imprimir Factura
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PedidosLista;