import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Swal from 'sweetalert2';
import Footer from "../footer/Footer";
import NavbarDefault from "../navbarDefault/NavbarDefault";
import { useAuthContext } from "../../context/AuthContext";
import { useBuildingContext } from "../../context/BuildingContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateBuilding = () => {
    const [address, setAddress] = useState("");
    const [locality, setLocality] = useState("");
    const [backyard, setBackyard] = useState(false);
    const [garage, setGarage] = useState(false);
    const { auth } = useAuthContext();
    const { updateBuilding, getBuildingById, deleteBuilding } = useBuildingContext();
    const { buildingId } = useParams();
    const navigate = useNavigate();
    const [building, setBuilding] = useState(null);
    useEffect(() => {
        const fetchBuilding = async () => {
            const fetchedBuilding = await getBuildingById(buildingId);
            if (fetchedBuilding) {
                setBuilding(fetchedBuilding);
                setAddress(fetchedBuilding.address);
                setLocality(fetchedBuilding.ubication);
                setBackyard(fetchedBuilding.backYard ? 'si' : 'no');
                setGarage(fetchedBuilding.garage ? 'si' : 'no');
            }
        };
        fetchBuilding();
    }, [buildingId, getBuildingById]);

    const formValid = address && locality && backyard && garage;

    const submitBuildingHandler = (event) => {
        event.preventDefault();
        const buildingData = {
            ubication: locality,
            address: address,
            ownerId: auth.userId,
            garage: garage === 'si' ? true : false,
            backYard: backyard === 'si' ? true : false,
        };
    
        updateBuilding(buildingId ,buildingData);

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

    const DeleteHandler =() => {
        const response = deleteBuilding(buildingId);
        if (response){
            Swal.fire({
                title: 'Success',
                text: 'Edificio eliminado correctamente',
                icon: 'success',
                confirmButtonText: 'Volver al inicio'
            });
            navigate("/");
        }
        else {
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido eliminar el edificio',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }

  return (
    <>
        <NavbarDefault />
        <Card className="w-80 mx-auto" style={{ maxWidth: "800px", marginTop: "20px", marginBottom:"20px" }}>
        <Card.Header>
            <Card.Title>Modificar Edificio</Card.Title>
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
                style={{ marginBottom: 5 }}
                type="submit"
                variant="primary"
                className="w-100"
                disabled={!formValid}
            >
                Actualizar Propiedad
            </Button>
            <Button
                type="button"
                variant="danger"
                className="w-100"
                disabled={!formValid}
                onClick={() => DeleteHandler()}
            >
                Eliminar
            </Button>
            </Form>
        </Card.Body>
        </Card>
        <Footer />
    </>
  );
};

export default UpdateBuilding;