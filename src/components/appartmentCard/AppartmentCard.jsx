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
import { Carousel } from "react-bootstrap";

const AppartmentCard = () => {
  const { id } = useParams();
  const { getAppartmentById, getAllBuildings, reservation, rentAppartment } = useBuildingContext();
  const { getUserById } = useUserContext();
  const { auth } = useAuthContext();
  const [appartment, setAppartment] = useState(null);
  const [owner, setOwner] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false); 

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
      <div style={{ minHeight: "100vh" }}>
  <Container fluid className="p-4" style={{ backgroundColor: '#f5f5f5', maxWidth: '1000px', marginBottom: '20px', marginTop: '20px', minHeight: 'minContent' }}>
    <Row>
      <Col md={6} className="d-flex justify-content-center align-items-center text-center">
        <Carousel interval={null} indicators={true} controls={true} className="w-100" style={{ maxWidth: "500px" }}>
          {appartment.pictures.map((picture, index) => (
            <Carousel.Item key={index} style={{ aspectRatio: "1/1" }}>
              <Image
                src={picture}
                alt={`Property ${index + 1}`}
                fluid
                style={{
                  border: "2px solid #9c27b0",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "5px",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>

      <Col md={6} className="text-center" style={{ alignContent: "center", marginTop: "20px" }}>
        <h4>{appartment.address}</h4>
        <h5>USD {appartment.price}/m</h5>
        <Button
          variant="primary"
          onClick={handleShowModal}
          disabled={!appartment.isAvailable || auth.role == 'Owner' || auth.role == 'Admin'}
        >
          {appartment.isAvailable ? 'Reservar' : 'No disponible'}
        </Button>
        <p className="mt-3">{appartment.description}</p>
      </Col>
    </Row>

    <Row className="mt-4" style={{ justifyContent: "space-around" }}>
      <Col md={4} className="text-center" style={{alignContent: "center"}}>
        <Card style={{ marginBottom: 24 }}>
          <Card.Body>
            <Card.Text>Departamento con {appartment.rooms} habitaciones y {appartment.bathrooms} baños.</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} className="text-center">
        <Card>
          <Card.Body>
            <Card.Text>Propietario</Card.Text>
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
</div>

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
                onChange={(e) => setSelectedDate(e.target.value)}  
                min={new Date().toISOString().split("T")[0]} 
              />
            </div>
            <Button
              variant="secondary"
              onClick={handleReservation}
              block
              disabled={!selectedDate}  
            >
              Guardar una reserva
            </Button>
            <Button variant="primary" onClick={handleRent} disabled={!auth.loggedIn} block>Alquilar ahora</Button>
          </form>
        </Modal.Body>
      </Modal>


      <Footer />
    </>
  );
};

export default AppartmentCard;
