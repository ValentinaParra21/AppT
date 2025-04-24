import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaTrash, FaFilePdf, FaPaperPlane, FaFileInvoiceDollar } from 'react-icons/fa';

const FacturasLista = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentFactura, setCurrentFactura] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [showEstadoModal, setShowEstadoModal] = useState(false);
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Estados para paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const facturasPorPagina = 6;

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9001/api/facturas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFacturas(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar facturas');
      } finally {
        setLoading(false);
      }
    };
    fetchFacturas();
  }, []);


  // Resetear paginación cuando cambian los filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [searchTerm, estadoFiltro]);

  const totalFacturado = facturas.reduce((sum, f) => sum + (f.total || 0), 0);
  const facturasActivas = facturas.filter(f => ['Pendiente', 'Pagado'].includes(f.estadoPago)).length;

  const filteredFacturas = facturas.filter((factura) => {
    const coincideBusqueda =
      (factura.numeroFactura?.toString().toLowerCase() || '')
        .includes(searchTerm.toLowerCase()) ||
      (factura.cliente?.nombre?.toLowerCase() || '')
        .includes(searchTerm.toLowerCase());
    const coincideEstado = estadoFiltro ? factura.estadoPago === estadoFiltro : true;
    return coincideBusqueda && coincideEstado;
  });

  // Calcular facturas a mostrar
  const totalPaginas = Math.ceil(filteredFacturas.length / facturasPorPagina);
  const facturasMostradas = filteredFacturas.slice(
    (paginaActual - 1) * facturasPorPagina,
    paginaActual * facturasPorPagina
  );

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  const handleImprimirPDF = (factura) => {
    const ventana = window.open('', '_blank');
    const fechaFactura = new Date(factura.fechaEmision).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    ventana.document.write(`
      <html>
        <head>
          <title>Factura ${factura.numeroFactura}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 20px; 
              color: #333; 
            }
            .encabezado { 
              text-align: center; 
              margin-bottom: 20px; 
            }
            .titulo-factura { 
              font-size: 24px; 
              font-weight: bold; 
              color: #2c3e50; 
            }
            .empresa { 
              font-size: 18px; 
              margin-bottom: 5px; 
            }
            .fecha { 
              margin-bottom: 15px; 
            }
            .secciones { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 30px; 
            }
            .seccion { 
              width: 48%; 
            }
            .tabla-productos { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 20px; 
            }
            .tabla-productos th { 
              background-color: #f8f9fa; 
              text-align: left; 
              padding: 10px; 
              border: 1px solid #dee2e6; 
            }
            .tabla-productos td { 
              padding: 10px; 
              border: 1px solid #dee2e6; 
            }
            .totales { 
              text-align: right; 
              margin-top: 20px; 
            }
            .total-general { 
              font-size: 18px; 
              font-weight: bold; 
              margin-top: 10px; 
            }
            .estado-pago { 
              display: inline-block; 
              padding: 5px 10px; 
              border-radius: 5px; 
              font-weight: bold;
              background-color: ${factura.estadoPago === 'Pagado' ? '#28a745' : factura.estadoPago === 'Pendiente' ? '#ffc107' : '#dc3545'};
              color: ${factura.estadoPago === 'Pendiente' ? '#212529' : 'white'};
            }
            .footer { 
              margin-top: 40px; 
              text-align: center; 
              font-size: 12px; 
              color: #6c757d; 
            }
          </style>
        </head>
        <body>
          <div class="encabezado">
            <div class="empresa">Triti Raclette</div>
            <div class="titulo-factura">FACTURA #${factura.numeroFactura}</div>
            <div class="fecha">${fechaFactura}</div>
          </div>
  
          <div class="secciones">
            <div class="seccion">
              <h4>Información del Cliente</h4>
              <p><strong>Nombre:</strong> ${factura.cliente?.nombre || 'Cliente Genérico'}</p>
              <p><strong>Identificación:</strong> ${factura.cliente?.identificacion || '0000000000'}</p>
              <p><strong>Teléfono:</strong> ${factura.cliente?.telefono || 'No especificado'}</p>
            </div>
            <div class="seccion">
              <h4>Detalles de Factura</h4>
              <p><strong>Estado:</strong> <span class="estado-pago">${factura.estadoPago}</span></p>
              <p><strong>Fecha:</strong> ${new Date(factura.fechaEmision).toLocaleString('es-CO')}</p>
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
              ${factura.items.map(item => `
                <tr>
                  <td>${item.nombre}</td>
                  <td>${item.cantidad}</td>
                  <td>${formatCurrency(item.precioUnitario)}</td>
                  <td>${formatCurrency(item.subtotal)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
  
          <div class="totales">
            <div><strong>Subtotal:</strong> ${formatCurrency(factura.subtotal)}</div>
            <div><strong>Impuestos:</strong> ${formatCurrency(factura.impuestos)}</div>
            <div class="total-general"><strong>TOTAL:</strong> ${formatCurrency(factura.total)}</div>
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
    ventana.document.close();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta factura?')) {
      try {
        setActionLoading(true);
        await axios.delete(`http://localhost:9001/api/facturas/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setFacturas(facturas.filter((f) => f._id !== id));
        setSuccessMessage('Factura eliminada correctamente.');
      } catch (err) {
        setError('Error al eliminar factura');
      } finally {
        setActionLoading(false);
      }
    }
  };


  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(value);
  };

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "Pendiente":
        return <span className="badge bg-warning">Pendiente</span>;
      case "Pagado":
        return <span className="badge bg-success">Pagado</span>;
      case "Cancelado":
        return <span className="badge bg-danger">Cancelado</span>;
      default:
        return <span className="badge bg-secondary">Desconocido</span>;
    }
  };

  const handleActualizarEstado = async () => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem('token');

      await axios.patch(
        `http://localhost:9001/api/facturas/${selectedFactura._id}/estado`,
        { estadoPago: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFacturas(
        facturas.map((f) =>
          f._id === selectedFactura._id ? { ...f, estadoPago: nuevoEstado } : f
        )
      );

      setShowEstadoModal(false);
      setSelectedFactura(null);
      setSuccessMessage('Estado de factura actualizado correctamente.');
    } catch (err) {
      console.error(err.response?.data || err);
      setError('Error al actualizar el estado de pago');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  return (
    <div
      className="container-fluid vh-100"
      style={{
        minHeight: "100vh",
        width: "100vw", 
        padding: "0", 
        backgroundColor: "#343a40", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat"
      }}
    >


      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}


      {/* ─── TARJETAS DE RESUMEN ───────────────────── */}
      <div className="row g-3 mb-2">
        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="text-muted">Total de Facturas</h5>
              <h2 className="text-primary">{facturas.length}</h2>
              <p>Total de facturas registradas</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="text-muted">Total Facturado</h5>
              <h2 className="text-success">${totalFacturado.toLocaleString()}</h2>
              <p>Suma de todas las facturas</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="text-muted">Facturas Activas</h5>
              <h2 className="text-primary">{facturasActivas}</h2>
              <p>Facturas pendientes o pagadas</p>
            </div>
          </div>
        </div>
      </div>
      {/* ──────────────────────────────────────────── */}

      <div className="card shadow-sm mb-4">
        <h2 className="mb-0">
          <FaFileInvoiceDollar className="me-2" />
          Gestión de Facturas
        </h2>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Control
                type="text"
                placeholder="Buscar por número o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <Form.Select
                value={estadoFiltro}
                onChange={(e) => setEstadoFiltro(e.target.value)}
              >
                <option value="">Todos los estados</option>
                <option value="Pagado">Pagado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelado">Cancelado</option>
              </Form.Select>
            </div>
            <div className="col-md-2">
              <Button variant="outline-secondary" className="w-100">
                Filtrar
              </Button>
            </div>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>N° Factura</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {facturasMostradas.map((factura) => (
                  <tr key={factura._id}>
                    <td>{factura.numeroFactura}</td>
                    <td>{new Date(factura.fechaEmision).toLocaleDateString()}</td>
                    <td>{factura.cliente?.nombre || 'N/A'}</td>
                    <td className="text-end">{formatCurrency(factura.total)}</td>
                    <td>{getEstadoBadge(factura.estadoPago)}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="info"
                          size="sm"
                          className="me-1"
                          onClick={() => setCurrentFactura(factura)}
                        >
                          <FaEye />
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-1"
                          onClick={() => handleImprimirPDF(factura)}
                        >
                          <FaFilePdf />
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="me-1"
                          onClick={() => handleEnviarCorreo(factura)}
                        >
                          <FaPaperPlane />
                        </Button>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="me-1"
                          onClick={() => {
                            setSelectedFactura(factura);
                            setNuevoEstado(factura.estadoPago);
                            setShowEstadoModal(true);
                          }}
                        >
                          Cambiar Estado
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(factura._id)}
                          disabled={actionLoading}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Controles de paginación */}
            {totalPaginas > 1 && (
              <div className="d-flex justify-content-center mt-3">
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => cambiarPagina(paginaActual - 1)}
                      >
                        &laquo;
                      </button>
                    </li>

                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                      <li
                        key={num}
                        className={`page-item ${paginaActual === num ? 'active' : ''}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => cambiarPagina(num)}
                        >
                          {num}
                        </button>
                      </li>
                    ))}

                    <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => cambiarPagina(paginaActual + 1)}
                      >
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Detalle */}
      <Modal show={!!currentFactura} onHide={() => setCurrentFactura(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalle de Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentFactura && (
            <div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5>Información General</h5>
                  <p>
                    <strong>N° Factura:</strong> {currentFactura.numeroFactura}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {new Date(currentFactura.fechaEmision).toLocaleString()}
                  </p>
                  <p>
                    <strong>Estado:</strong> {getEstadoBadge(currentFactura.estadoPago)}
                  </p>
                </div>
                <div className="col-md-6">
                  <h5>Información del Cliente</h5>
                  <p>
                    <strong>Nombre:</strong> {currentFactura.cliente?.nombre || 'N/A'}
                  </p>
                  <p>
                    <strong>Identificación:</strong> {currentFactura.cliente?.identificacion || 'N/A'}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {currentFactura.cliente?.telefono || 'N/A'}
                  </p>
                </div>
              </div>

              <h5 className="mt-4">Detalle de Productos</h5>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>P. Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFactura.items?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>{formatCurrency(item.precioUnitario)}</td>
                      <td>{formatCurrency(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="row mt-3">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-between">
                    <strong>Subtotal:</strong>
                    <span>{formatCurrency(currentFactura.subtotal)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <strong>Impuestos:</strong>
                    <span>{formatCurrency(currentFactura.impuestos)}</span>
                  </div>
                  <div className="d-flex justify-content-between fs-5 mt-2">
                    <strong>Total:</strong>
                    <strong>{formatCurrency(currentFactura.total)}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCurrentFactura(null)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Cambio de Estado */}
      <Modal show={showEstadoModal} onHide={() => setShowEstadoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Estado de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="estadoPagoSelect">
            <Form.Label>Estado de Pago</Form.Label>
            <Form.Select value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)}>
              <option value="Pagado">Pagado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Cancelado">Cancelado</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEstadoModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleActualizarEstado} disabled={actionLoading}>
            {actionLoading ? <Spinner as="span" animation="border" size="sm" /> : 'Guardar Cambios'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FacturasLista;