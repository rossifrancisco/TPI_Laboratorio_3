import { useState } from "react";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer'
import { useBuildingContext } from "../../context/BuildingContext";
import { useEffect } from "react";
import RentCard from "../rentCard/RentCard";


const AppartmentSelect = ({buildingId}) => {

    const { getAllAppartments } = useBuildingContext();
    const [buildingAppartments, setBuildingsAppartments] = useState([]);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const appartments = await getAllAppartments();
                const filteredAppartments = appartments.filter(a => a.buildingId === buildingId);
                setBuildingsAppartments(filteredAppartments);
            } catch (error) {
                console.error("Error al obtener edificios:", error);
            }
        };

        fetchBuildings(); 
    }, [buildingId, getAllAppartments]);

    return (
        <>
            <Navbar />
            <main className="all-buildings-grid">
                {buildingAppartments.filter(appartment => appartment.isAuthorized).map(appartment => (
                    <RentCard
                        key={build.id}
                        id={build.id}
                        ubication={build.ubication}
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
    );
}
export default AppartmentSelect;