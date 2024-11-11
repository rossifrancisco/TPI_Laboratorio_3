import { useState, useMemo, useEffect } from "react";
import { useBuildingContext } from "../context/BuildingContext";

const useFilterProperties = () => {
  const { getAllAppartments, getAllBuildings } = useBuildingContext();
  const [allAppartments, setAllAppartments] = useState([]);
  const [allBuildings, setAllBuildings] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchAppartments = async () => {
      try {
        const appartments = await getAllAppartments();
        console.log(appartments)
        setAllAppartments(appartments);
      } catch (error) {
        console.error("Error fetching appartments:", error);
      }
    };

    const fetchBuildings = async () => {
      try {
        const buildings = await getAllBuildings();
        console.log(buildings)
        setAllBuildings(buildings);
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    fetchBuildings();
    fetchAppartments();
  }, [getAllAppartments, getAllBuildings]);

  useEffect(() => {
    if (allAppartments.length > 0 && allBuildings.length > 0) {
      const combined = allAppartments.map(appartment => {
        const building = allBuildings.find(b => b.id === appartment.buildingId);
        return { ...appartment, garage: building.garage, backYard: building.backYard, address: building.address, ubication: building.ubication, ownerId: building.ownerId};
      });
      setCombinedData(combined);
      console.log(combined);
    }
  }, [allAppartments, allBuildings]);

  const [bathrooms, setBathrooms] = useState("");
  const [rooms, setRooms] = useState("");
  const [floor, setFloor] = useState("");
  const [getBackyard, setBackyard] = useState(false); 
  const [getGarage, setGarage] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    bathrooms: "",
    rooms: "",
    floor: "",
    backyard: getBackyard,
    garage: getGarage,  
  }); 

  
  const handleSubmit = () => {
    setAppliedFilters({
      bathrooms,
      rooms,
      floor,
      backyard,
      garage,
    });
  };

  const filteredProperties = useMemo(() => {
    return combinedData.filter((build) => {
      const matchBathrooms = bathrooms ? build.bathrooms === Number(bathrooms) : true;
      const matchRooms = rooms ? build.rooms === Number(rooms) : true;
      const matchFloor = floor ? build.floor === Number(floor) : true;
      const matchBackyard = getBackyard ? build.backyard === true : true;  
      const matchGarage = getGarage ? build.garage === true : true; 
      
      return matchBathrooms && matchRooms && matchFloor && matchBackyard && matchGarage;
    });
  }, [allAppartments, bathrooms, floor, rooms, getBackyard, getGarage]);

  return {
    bathrooms,
    setBathrooms,
    rooms,
    setRooms,
    floor,
    setFloor,
    getBackyard,
    setBackyard,
    getGarage,
    setGarage,
    appliedFilters,
    handleSubmit,
    filteredProperties,
    combinedData
  };
};

export default useFilterProperties;
