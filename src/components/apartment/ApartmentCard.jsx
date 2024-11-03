import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Footer from '../footer/Footer';
import NavbarDefault from '../navbarDefault/NavbarDefault';


const ApartmentCard = ({ properties }) => {
  const { id } = useParams();

  const apartment = properties.find(property => property.id === parseInt(id));

  if (!apartment) {
    return <p>Apartamento no encontrado</p>;
  }

  return (
    <>
      <NavbarDefault />
      <Container fluid className="p-4" style={{ backgroundColor: '#f5f5f5', maxWidth: '1000px', marginBottom: '20px', marginTop: '20px' }}>
        <Row>
          <Col md={6} className="d-flex justify-content-center align-items-center position-relative">
            <FaArrowLeft style={{ position: 'absolute', left: 10, cursor: 'pointer', fontSize: '1.5rem' }} />
            <Image
              src={apartment.pictures[0]}  // Imagen principal del apartamento
              alt="Property"
              fluid
              style={{ border: '2px solid #9c27b0', maxWidth: '100%' }}
            />
            <FaArrowRight style={{ position: 'absolute', right: 10, cursor: 'pointer', fontSize: '1.5rem' }} />
          </Col>

          <Col md={6} className="text-center">
            <h4>{apartment.address}</h4>
            <h5>USD {apartment.price}/m</h5>
            <Button variant="primary">Reservar</Button>
            <p className="mt-3">
              {apartment.description}
            </p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={4} className="text-center">
            <Card>
              <Card.Body>
                <Card.Text>{apartment.type} con {apartment.rooms} habitaciones y {apartment.bathrooms} baños.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center">
            <h5>Reputación del Propietario:</h5>
            <div>
              {[...Array(apartment.rating)].map((_, index) => (
                <FaStar key={index} color="gold" />
              ))}
            </div>
          </Col>
          <Col md={4} className="text-center">
            <Card>
              <Card.Body>
                <Image
                  src={apartment.ownerImage} // Imagen del propietario
                  roundedCircle
                  width={50}
                  height={50}
                  alt="Propietario"
                />
                <Card.Text>{apartment.ownerName}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ApartmentCard;
