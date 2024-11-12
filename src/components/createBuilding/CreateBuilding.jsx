import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Swal from 'sweetalert2';
import Footer from "../footer/Footer";
import NavbarDefault from "../navbarDefault/NavbarDefault";
import { useAuthContext } from "../../context/AuthContext";
import { useBuildingContext } from "../../context/BuildingContext";

const CreateBuilding = () => {
    const [address, setAddress] = useState("");
    const [locality, setLocality] = useState("");
    const [backyard, setBackyard] = useState(false);
    const [garage, setGarage] = useState(false);
    const { auth } = useAuthContext();
    const { createBuilding } = useBuildingContext();

    const formValid = address && locality && backyard && garage;

    const submitBuildingHandler = (event) => {
        event.preventDefault();
        const buildingData = {
            ubication: locality,   // Asumiendo que 'locality' es lo que quieres usar para 'ubication'
            address: address,
            ownerId: auth.userId, // O el ID de usuario correspondiente
            garage: garage === 'si' ? true : false, // Convierte "si" o "no" a booleano
            backyard: backyard === 'si' ? true : false,
        };
    
        createBuilding(buildingData);

        Swal.fire({
            title: 'Propiedad creada',
            text: 'La propiedad ha sido creada exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/Rent';
            }
        });

        setAddress("");
        setLocality("");
        setBackyard(false);
        setGarage(false);
    };

  return (
    <>
        <NavbarDefault />
        <div style={{minHeight: "100vh"}}>
            <Card className="w-80 mx-auto" style={{ maxWidth: "800px", marginTop: "20px", marginBottom:"20px"}}>
            <Card.Header>
                <Card.Title>Crear Edificio</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={submitBuildingHandler}>
                <Form.Group controlId="address" className="mb-3">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Ingrese la dirección"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    />
                </Form.Group>

                <Form.Group controlId="locality" className="mb-3">
                    <Form.Label>Localidad</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Ingrese la localidad"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    required
                    />
                </Form.Group>

                <Form.Group controlId="backyard" className="mb-3">
                    <Form.Label>¿Tiene Patio?</Form.Label>
                    <Form.Select
                    value={backyard}
                    onChange={(e) => setBackyard(e.target.value)}
                    >
                    <option>¿La propiedad tiene patio?</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="garage" className="mb-3">
                    <Form.Label>¿Tiene Garage?</Form.Label>
                    <Form.Select
                    value={garage}
                    onChange={(e) => setGarage(e.target.value)}
                    >
                    <option>¿El edificio tiene Garage?</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                    </Form.Select>
                </Form.Group>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-100"
                    disabled={!formValid}
                >
                    Crear Propiedad
                </Button>
                </Form>
            </Card.Body>
            </Card>
        </div>
        <Footer />
    </>
  );
};

export default CreateBuilding;
