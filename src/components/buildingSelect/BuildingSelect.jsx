import { useState } from "react";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import BuildingCard from "../BuildingCard/BuildingCard";
import useFilterProperties from "../../hooks/useFilterProperties";
import { useAuthContext } from "../../context/AuthContext";
import { useBuildingContext } from "../../context/BuildingContext";
import { useEffect } from "react";
import "./BuildingSelect.css"


const BuildingSelect = () => {

    const { getAllBuildings } = useBuildingContext();
    const { auth } = useAuthContext();
    const [ownerBuildings, setOwnerBuildings] = useState([]);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const buildings = await getAllBuildings(); // Espera a que la promesa se resuelva
                const filteredBuildings = buildings.filter(b => b.ownerId === auth.userId);
                setOwnerBuildings(filteredBuildings);
            } catch (error) {
                console.error("Error al obtener edificios:", error);
            }
        };

        fetchBuildings(); // Llama a la función asíncrona para obtener los edificios
    }, [auth.userId, getAllBuildings]);

    return (
        <>
            <Navbar />
            <main className="all-buildings-grid">
                {ownerBuildings.map(build => (
                    <BuildingCard
                        key={build.id}
                        ubication={build.ubication}
                        address={build.address}
                        garage={build.garage}
                        backyard={build.backyard}
                        description={build.description}
                        isAuthorized={build.isAuthorized}
                    />
                ))}

            </main>
            <Footer />
        </>
    );
}
export default BuildingSelect;