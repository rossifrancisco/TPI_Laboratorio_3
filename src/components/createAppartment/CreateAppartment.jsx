import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import Swal from 'sweetalert2';
import Footer from "../footer/Footer";
import NavbarDefault from "../navbarDefault/NavbarDefault";
import { useAuthContext } from "../../context/AuthContext";
import { useBuildingContext } from "../../context/BuildingContext";

const CreateAppartment = () => {
    //const [address, setAddress] = useState("");
    const [floor, setFloor] = useState("");
    //const [locality, setLocality] = useState("");
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState([]);
    //const [backyard, setBackyard] = useState("");
    //const [garage, setGarage] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [rooms, setRooms] = useState("");
    //const [numberRooms, setNumberRooms] = useState("");
    const [price, setPrice] = useState("");

    const { auth } = useAuthContext();

    const formValid = /*address && locality && numberRooms &&*/ bathrooms && rooms && price;


    const [photoUrl, setPhotoUrl] = useState(""); // Para guardar la URL ingresada por el usuario

    const addPhotoUrl = (url) => {
        // Asegurarse de que la URL sea válida (opcional, dependiendo de tus necesidades)
        if (isValidUrl(url)) {
            setPhotos([...photos, url]);
            setPhotoUrl(""); // Limpiar el campo de URL después de agregarla
        } else {
            alert("URL no válida");
        }
    };

    // Función para validar si la URL es válida
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
            key: Id,  // Asegúrate de tener un ID único
            buildingId: buildingId,
            //ubication: locality,  // Asumiendo que 'locality' es lo que quieres usar para 'ubication'
            //address: address,
            bathrooms: parseInt(bathrooms, 10),
            rooms: parseInt(rooms, 10),
            ///garage: garage, // Convierte "si" o "no" a booleano
            //backyard: backyard,
            pictures: Array.from(photos), // Convierte el FileList en un array
            description: description,
            price: parseFloat(price),
            isAuthorized: true, // O la lógica correspondiente para esta propiedad
        };
        console.log(appartmentData)

        onAppartmentDataSaved(appartmentData);

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

        //setAddress("");
        setFloor("");
        //setLocality("");
        setDescription("");
        setPhotos([]);
        //setBackyard("");
        //setGarage("");
        setBathrooms("");
        setRooms("");
        //setNumberRooms("");
        setPrice("");
    };

    return (
        <>
            <NavbarDefault />
            <Card className="w-80 mx-auto" style={{ maxWidth: "800px", marginTop: "20px", marginBottom: "20px" }}>
                <Card.Header>
                    <Card.Title>Crear Propiedad</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={submitAppartmentHandler}>
                        {/*               
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
*/}
                        <Form.Group controlId="floor" className="mb-3">
                            <Form.Label>Número de Piso</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese el número de piso"
                                value={floor}
                                onChange={(e) => setFloor(e.target.value)}
                            />
                        </Form.Group>
                        {/*
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
 */}
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
                            <Form.Label>Fotos (Ingrese URLs)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese URL de la imagen"
                                onChange={(e) => setPhotoUrl(e.target.value)} // Guarda la URL ingresada
                            />
                            <Button
                                variant="primary"
                                onClick={() => addPhotoUrl(photoUrl)} // Agrega la URL al arreglo
                            >
                                Agregar Foto
                            </Button>
                        </Form.Group>

                        <ul>
                            {photos.map((photo, index) => (
                                <li key={index}>
                                    <img src={photo} alt={`Foto ${index + 1}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                </li>
                            ))}
                        </ul>

                        {/*
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
                <option>¿La propiedad tiene garage?</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
                </Form.Select>
            </Form.Group>
*/}
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
                        {/*
            <Form.Group controlId="numberRooms" className="mb-3">
                <Form.Label>Cantidad de Ambientes</Form.Label>
                <Form.Control
                type="number"
                min="0"
                placeholder="Ingrese la cantidad de ambientes"
                value={numberRooms}
                onChange={(e) => setNumberRooms(e.target.value)}
                required
                />
            </Form.Group>
*/}
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
            <Footer />
        </>
    );
};


export default CreateAppartment;