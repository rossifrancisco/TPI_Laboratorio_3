import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Swal from 'sweetalert2';
import Footer from "../footer/Footer";
import NavbarDefault from "../navbarDefault/NavbarDefault";
import { useBuildingContext } from "../../context/BuildingContext";
import { useParams } from "react-router-dom";

const UpdateAppartment = () => {
    const { appartmentId } = useParams();
    const { UpdateAppartment, getAppartmentById, deleteAppartment } = useBuildingContext();
    const [appartment, setAppartment] = useState(null);

    const [floor, setFloor] = useState(0);
    const [number, setNumber] = useState(0)
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState([]);
    const [bathrooms, setBathrooms] = useState(0);
    const [rooms, setRooms] = useState(0);
    const [price, setPrice] = useState(0);
    const [buildingId, setBuildingId] = useState("");

    useEffect(() => {
        const fetchAppartment = async () => {
            const appartmentFetched = await getAppartmentById(appartmentId);
            setAppartment(appartmentFetched);
            console.log(appartmentFetched);
            if (appartmentFetched) {
                setFloor(appartmentFetched.floor || "");
                setDescription(appartmentFetched.description || "");
                setPhotos(appartmentFetched.pictures || []); // Use `pictures` directly
                setBathrooms(appartmentFetched.bathrooms || "");
                setRooms(appartmentFetched.rooms || "");
                setPrice(appartmentFetched.price || "");
                setBuildingId(appartmentFetched.buildingId || "");
                setNumber(appartmentFetched.number || "");
            }
        };
        fetchAppartment();
    }, [appartmentId, getAppartmentById]);

    const formValid = floor && description && photos.length > 0 && bathrooms && rooms && price && number;

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

    const deletePhoto = (url) => {
        const updatedPhotos = photos.filter(photo => photo !== url);
        setPhotos(updatedPhotos);
    };

    const submitAppartmentHandler = (event) => {
        event.preventDefault();

        const appartmentData = {
            floor: floor,
            number: number,
            buildingId: buildingId, 
            bathrooms: bathrooms,
            rooms: rooms,
            pictures: photos,
            description: description,
            price: price,
        };

        const response = UpdateAppartment(appartmentId, appartmentData);
        if (response) {
            Swal.fire({
                title: 'Propiedad actualizada',
                text: 'La propiedad ha sido actualizada exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'La propiedad no ha sido actualizada exitosamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const DeleteHandler =() => {
        deleteAppartment(appartmentId);
    }

    if (!appartment) {
        return <h1>Cargando...</h1>;
    }

    return (
        <>
            <NavbarDefault />
            <Card className="w-80 mx-auto" style={{ maxWidth: "800px", marginTop: "20px", marginBottom: "20px" }}>
                <Card.Header>
                    <Card.Title>Actualizar Propiedad</Card.Title>
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
                            <Form.Label>Número de depto</Form.Label>
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
                            <Form.Label>Fotos (Ingrese URLs)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese URL de la imagen"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                            <Button variant="primary" onClick={() => addPhotoUrl(photoUrl)}>
                                Agregar Foto
                            </Button>
                        </Form.Group>

                        <ul>
                            {photos.map((photo, index) => (
                                <li key={index}>
                                    <img src={photo} alt={`Foto ${index + 1}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                    <Button variant="danger" onClick={() => deletePhoto(photo)}>
                                        Eliminar
                                    </Button>
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

export default UpdateAppartment;
