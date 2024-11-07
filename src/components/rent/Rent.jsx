import { Button } from "react-bootstrap";
import RentCard from "../rentCard/RentCard";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer'
import './Rent.css'
import { useState, useMemo } from "react";
import Form from 'react-bootstrap/Form';
import useFilterProperties from "../../hooks/useFilterProperties";

const Rent = ({ propertys }) => {
   const { bathrooms, setBathrooms, type, setType, rooms, setRooms, backyard, setBackyard, garage, 
    setGarage, appliedFilters, handleSubmit, filteredProperties } = useFilterProperties();


    return (
        <>
            <Navbar />
            <h1 style={{textAlign: "center", margin: "50px"}}>Todos los inmuebles</h1>

            <div className="bg-white shadow-md rounded-lg p-4 mb-1 mx-auto">
                <div className="filters d-flex justify-content-between">
                    <Form.Group controlId="bathrooms" className="w-30">
                        <Form.Label>Baños</Form.Label>
                        <Form.Select 
                            value={bathrooms} 
                            onChange={(e) => setBathrooms(e.target.value)}
                            className="w-100"
                        >
                            <option value="">Todos</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="rooms" className="w-30" style={{ m: 5}}>
                        <Form.Label>Habitaciones</Form.Label>
                        <Form.Select 
                            value={rooms} 
                            onChange={(e) => setRooms(e.target.value)}
                            className="w-100"
                            style={{ m: 5}}
                        >
                            <option value="">Todos</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="type" className="w-30" style={{ ml: 5}}>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select 
                            value={type} 
                            onChange={(e) => setType(e.target.value)}
                            className="w-100"
                        >
                            <option value="">Todos</option>
                            <option value="casa">Casa</option>
                            <option value="depto">Departamento</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="backyard" className="w-30">
                        <Form.Label>Patio</Form.Label>
                        <Form.Select
                            value={backyard}
                            onChange={(e) => setBackyard(e.target.value)}
                            className="w-100"
                        >
                            <option value="">Todos</option>
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="garage" className="w-30">
                        <Form.Label>Garaje</Form.Label>
                        <Form.Select
                            value={garage}
                            onChange={(e) => setGarage(e.target.value)}
                            className="w-100"
                        >
                            <option value="">Todos</option>
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </Form.Select>
                    </Form.Group>
           
                    <Button
                        variant="dark"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Filtrar
                    </Button>
                </div>
                <div className="text-end mt-3">
                    
                </div>
            </div>
          

            <main className="all-rents-grid">
                {filteredProperties.map(build => (
                    <RentCard 
                        key={build.id}
                        id={build.id}  
                        ubication={build.ubication}
                        type={build.type}
                        address={build.address}
                        bathrooms={build.bathrooms}
                        rooms={build.rooms}
                        garage={build.garage}
                        backyard={build.backyard}
                        pictures={build.pictures}
                        description={build.description}
                        rating={build.rating}
                        price={build.price}
                        isAuthorized={build.isAuthorized}
                        userId={build.userId}
                    />
                ))}
            </main>
            <Footer />
        </>
    )
}

export default Rent;