import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaFileInvoiceDollar } from 'react-icons/fa';

const FacturasLista = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentFactura, setCurrentFactura] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9001/api/facturas', {
          headers: { Authorization: `Bearer ${token}` }
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

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta factura?')) {
      try {
        await axios.delete(`http://localhost:9001/api/facturas/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setFacturas(facturas.filter(f => f._id !== id));
      } catch (err) {
        setError('Error al eliminar factura');
      }
    }
  };

  const filteredFacturas = facturas.filter(factura =>
    (factura.numeroFactura?.toString().toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (factura.cliente?.nombre?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(value);
  };

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'Pagado': return <Badge bg="success">Pagado</Badge>;
      case 'Pendiente': return <Badge bg="warning" text="dark">Pendiente</Badge>;
      case 'Cancelado': return <Badge bg="danger">Cancelado</Badge>;
      default: return <Badge bg="secondary">{estado}</Badge>;
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  if (error) return <Alert variant="danger" className="mt-3">{error}</Alert>;

  return (
    <div className="container-fluid vh-100" style={{ minHeight: "100vh", width: "100vw", padding: "0", backgroundColor: "#343a40", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaFileInvoiceDollar className="me-2" />
          Gestión de Facturas
        </h2>
        <Link to="/facturas/nueva" className="btn btn-primary">
          Nueva Factura
        </Link>
      </div>

      <div className="card shadow-sm mb-4">
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
              <Form.Select>
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
                {filteredFacturas.map((factura) => (
                  <tr key={factura._id}>
                    <td>{factura.numeroFactura}</td>
                    <td>{new Date(factura.fechaEmision).toLocaleDateString()}</td>
                    <td>{factura.cliente?.nombre || 'N/A'}</td>
                    <td className="text-end">{formatCurrency(factura.total)}</td>
                    <td>{getEstadoBadge(factura.estadoPago)}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => setCurrentFactura(factura)}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        as={Link}
                        to={`/facturas/editar/${factura._id}`}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(factura._id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
                  <p><strong>N° Factura:</strong> {currentFactura.numeroFactura}</p>
                  <p><strong>Fecha:</strong> {new Date(currentFactura.fechaEmision).toLocaleString()}</p>
                  <p><strong>Estado:</strong> {getEstadoBadge(currentFactura.estadoPago)}</p>
                </div>
                <div className="col-md-6">
                  <h5>Información del Cliente</h5>
                  <p><strong>Nombre:</strong> {currentFactura.cliente?.nombre || 'N/A'}</p>
                  <p><strong>Identificación:</strong> {currentFactura.cliente?.identificacion || 'N/A'}</p>
                  <p><strong>Teléfono:</strong> {currentFactura.cliente?.telefono || 'N/A'}</p>
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
    </div>
  );
};

export default FacturasLista;