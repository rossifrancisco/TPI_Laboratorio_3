import BuildingCard from "../BuildingCard/BuildingCard";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer';
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useBuildingContext } from "../../context/BuildingContext";
import RentCard from "../rentCard/RentCard";

const OwnProperties = () => {
    const { auth } = useAuthContext();
    const { getAllAppartments, getAllBuildings } = useBuildingContext();
    const [buildings, setBuildings] = useState([]);
    const [appartments, setAppartments] = useState([]);
    useEffect(() => {
        const allYourBuildings = async () => {
            const allMyBuildings = await getAllBuildings();
            const filteredBuildings = allMyBuildings.filter(build => build.ownerId == auth.userId);

            setBuildings(filteredBuildings);
            allYourAppartments(filteredBuildings); 
        }
        const allYourAppartments = async (filteredBuildings) => {
            const allAppartments = await getAllAppartments();
            const filteredAppartments = allAppartments
            .filter(appartment => filteredBuildings.some(build => build.id === appartment.buildingId))
            .map(appartment => {
                // Encontrar el edificio correspondiente para cada apartamento
                const building = filteredBuildings.find(b => b.id === appartment.buildingId);
                return {
                    ...appartment,
                    garage: building.garage,
                    backYard: building.backYard,
                    address: building.address,
                    ubication: building.ubication,
                    ownerId: building.ownerId
                };
            });
            setAppartments(filteredAppartments);
        }
        allYourBuildings();
    }, []);
    return (
        <>
            <Navbar />
            <main className="all-rents-grid">
                {buildings.map(building => (
                    <BuildingCard
                        key={building.id}
                        buildingId={building.id}
                        ubication={building.ubication}
                        address={building.address}
                        garage={building.garage}
                        backYard={building.backYard}
                        ownerId={building.ownerId}
                        navigateTo={`/UpdateBuilding`}
                    />
                ))}
                {appartments.map(appartment => (
                    <RentCard
                        key={appartment.id}
                        id={appartment.id}
                        floor={appartment.floor}
                        number={appartment.number}
                        bathrooms={appartment.bathrooms}
                        rooms={appartment.rooms}
                        pictures={appartment.pictures}
                        description={appartment.description}
                        price={appartment.price}
                        rating={appartment.rating}
                        buildingId={appartment.buildingId}
                        navigateTo={`/UpdateAppartment`}
                    />
                ))}
            </main>
            <Footer />
        </>
    )
}
export default OwnProperties;