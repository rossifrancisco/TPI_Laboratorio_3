import React from 'react';
import { Container, Row, Col, Card, Button, Image, Modal } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Footer from '../footer/Footer';
import NavbarDefault from '../navbarDefault/NavbarDefault';
import { useEffect, useState } from "react";
import { useBuildingContext } from "../../context/BuildingContext";
import { useUserContext } from "../../context/UserContext";
import { useAuthContext } from '../../context/AuthContext';
import Swal from "sweetalert2";

const AppartmentCard = () => {
  const { id } = useParams();
  const { getAppartmentById, getAllBuildings, reservation, rentAppartment } = useBuildingContext();
  const { getUserById } = useUserContext();
  const { auth } = useAuthContext();
  const [appartment, setAppartment] = useState(null);
  const [owner, setOwner] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);  // Estado para mostrar el modal

  useEffect(() => {
    const fetchAppartment = async () => {
      try {
        const appartment = await getAppartmentById(id);
        const allBuildings = await getAllBuildings();
        const property = allBuildings.find(b => b.id === appartment.buildingId);
        const appartmentData = {
          ...appartment,
          garage: property.garage,
          backYard: property.backYard,
          address: property.address,
          ubication: property.ubication,
          ownerId: property.ownerId
        };
        setAppartment(appartmentData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchAppartment();
  }, [id]);

  useEffect(() => {
    const fetchOwner = async () => {
      if (appartment) {
        try {
          const owner = await getUserById("Owner", appartment.ownerId);
          setOwner(owner);
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      }
    };

    fetchOwner();
  }, [appartment]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleReservation = async () => {
    if (!selectedDate) {
      alert("Por favor, selecciona una fecha para la reserva.");
      return;
    }

    const newReservation = {
      tenantID: auth.userId,
      visitDate: selectedDate,  // Pasa la fecha seleccionada
    };

    const response = await reservation(appartment.id, newReservation);
    if (response) {
      Swal.fire({
        title: 'Reserva creada',
        text: 'La reserva ha sido creada exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo realizar la reserva.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }

    console.log("Reserva guardada", newReservation);
    handleCloseModal();
  };

  const handleRent = async () => {
    const response = await rentAppartment(auth.userId, appartment.id);
    if (response) {
      Swal.fire({
        title: 'Departamento alquilado!',
        text: 'Departamento alquilado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      setAppartment(prevState => ({
        ...prevState,
        isAvailable: false,  
      }));
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo alquilar el departamento.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
    console.log("Departamento alquilado");
    handleCloseModal();
  };

  if (!appartment || !owner) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <NavbarDefault />
      <Container fluid className="p-4" style={{ backgroundColor: '#f5f5f5', maxWidth: '1000px', marginBottom: '20px', marginTop: '20px' }}>
        <Row>
          <Col md={6} className="d-flex justify-content-center align-items-center position-relative">
            <FaArrowLeft style={{ position: 'absolute', left: 10, cursor: 'pointer', fontSize: '1.5rem' }} />
            <Image
              src={appartment.pictures[0]}
              alt="Property"
              fluid
              style={{ border: '2px solid #9c27b0', maxWidth: '100%' }}
            />
            <FaArrowRight style={{ position: 'absolute', right: 10, cursor: 'pointer', fontSize: '1.5rem' }} />
          </Col>

          <Col md={6} className="text-center">
            <h4>{appartment.address}</h4>
            <h5>USD {appartment.price}/m</h5>
            <Button
              variant="primary"
              onClick={handleShowModal}
              disabled={!appartment.isAvailable || auth.role == 'Owner'}
            >
              {appartment.isAvailable ? 'Reservar' : 'No disponible'}
            </Button>
            <p className="mt-3">{appartment.description}</p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={4} className="text-center">
            <Card>
              <Card.Body>
                <Card.Text>Departamento con {appartment.rooms} habitaciones y {appartment.bathrooms} baños.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center">
            <Card>
              <Card.Body>
                <Image
                  src={owner.photo}
                  roundedCircle
                  width={50}
                  height={50}
                  alt="Propietario"
                />
                <Card.Text>{owner.firstName} {owner.lastName}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal para elegir entre reservar o alquilar */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>¿Qué quieres hacer?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="reservationDate" className="form-label">Selecciona la fecha para la visita:</label>
              <input
                type="date"
                id="reservationDate"
                className="form-control"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}  // Actualiza el estado con la fecha seleccionada
                min={new Date().toISOString().split("T")[0]}  // Asegura que no se pueda seleccionar una fecha pasada
              />
            </div>
            <Button
              variant="secondary"
              onClick={handleReservation}
              block
              disabled={!selectedDate}  // Deshabilita el botón si no se selecciona una fecha
            >
              Guardar una reserva
            </Button>
            <Button variant="primary" onClick={handleRent} block>Alquilar ahora</Button>
          </form>
        </Modal.Body>
      </Modal>


      <Footer />
    </>
  );
};

export default AppartmentCard;
