import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Swal from 'sweetalert2';
import Footer from "../footer/Footer";
import NavbarDefault from "../navbarDefault/NavbarDefault";
import { useBuildingContext } from "../../context/BuildingContext";
import { useParams } from "react-router-dom";

const CreateAppartment = () => {

    const { buildingId } = useParams();

    const [floor, setFloor] = useState("");
    const [number, setNumber] = useState("");
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState([]);
    const [bathrooms, setBathrooms] = useState("");
    const [rooms, setRooms] = useState("");
    const [price, setPrice] = useState("");

    const { createAppartment } = useBuildingContext();

    const formValid = floor && number && description && photos && bathrooms && rooms && price


    const [photoUrl, setPhotoUrl] = useState(""); 

    const addPhotoUrl = (url) => {
        
        if (isValidUrl(url)) {
            setPhotos([...photos, url]);
            setPhotoUrl("");
        } else {
            alert("URL no válida");
        }
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };


    const submitAppartmentHandler = (event) => {
        event.preventDefault();

        const appartmentData = {
            floor: floor,
            number: number,
            buildingId: buildingId,
            bathrooms: bathrooms,
            rooms: rooms,
            pictures: Array.from(photos),
            description: description,
            price: price,
        };
        console.log(appartmentData)

        createAppartment(appartmentData);

        Swal.fire({
            title: 'Propiedad creada',
            text: 'La propiedad ha sido creada exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })

        setFloor("");
        setDescription("");
        setPhotos([]);
        setBathrooms("");
        setRooms("");
        setPrice("");
        setNumber("");
        setPhotoUrl("");
    };

    return (
        <>
            <NavbarDefault />
            <div style={{minHeight: "100vh"}}>
                <Card className="w-80 mx-auto" style={{ maxWidth: "800px", marginTop: "20px", marginBottom: "20px"}}>
                    <Card.Header>
                        <Card.Title>Crear Propiedad</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={submitAppartmentHandler}>
                        
                            <Form.Group controlId="floor" className="mb-3">
                                <Form.Label>Número de Piso</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingrese el número de piso"
                                    value={floor}
                                    onChange={(e) => setFloor(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="floor" className="mb-3">
                                <Form.Label>Número de departamento</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingrese el número de departamento"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="description" className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Ingrese la descripción de la propiedad"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="photos" className="mb-3">
                                <Form.Label >Fotos (Ingrese URLs)</Form.Label>
                                <div style={{display:"flex", flexDirection:"row"}}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese URL de la imagen"
                                        onChange={(e) => setPhotoUrl(e.target.value)} // Guarda la URL ingresada
                                    />
                                    <Button
                                        style={{marginLeft:20}}
                                        variant="primary"
                                        onClick={() => addPhotoUrl(photoUrl)} // Agrega la URL al arreglo
                                    >
                                        Agregar
                                    </Button>
                                </div>
                            </Form.Group>

                            <ul>
                                {photos.map((photo, index) => (
                                    <li key={index}>
                                        <img src={photo} alt={`Foto ${index + 1}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                    </li>
                                ))}
                            </ul>

                            <Form.Group controlId="bathrooms" className="mb-3">
                                <Form.Label>Cantidad de Baños</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    placeholder="Ingrese la cantidad de baños"
                                    value={bathrooms}
                                    onChange={(e) => setBathrooms(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="rooms" className="mb-3">
                                <Form.Label>Cantidad de Habitaciones</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    placeholder="Ingrese la cantidad de habitaciones"
                                    value={rooms}
                                    onChange={(e) => setRooms(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        
                            <Form.Group controlId="price" className="mb-3">
                                <Form.Label>Valor:</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    placeholder="Ingrese el valor de la propiedad"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
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

export default CreateAppartment;