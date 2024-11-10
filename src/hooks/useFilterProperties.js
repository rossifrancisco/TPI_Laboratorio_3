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
        setAllAppartments(appartments);
      } catch (error) {
        console.error("Error fetching appartments:", error);
      }
    };

    const fetchBuildings = async () => {
      try {
        const buildings = await getAllBuildings();
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
      const combined = appartments.map(appartment => {
        const building = buildings.find(b => b.id === appartment.buildingId);
        return { ...appartment, building };
      });
      setCombinedData(combined);
    }
  }, [allAppartments, allBuildings]);

  console.log(combinedData)

  const [bathrooms, setBathrooms] = useState("");
  const [rooms, setRooms] = useState("");
  const [floors, setFloor] = useState("");
  const [getBackyard, setBackyard] = useState(false);       // ????????
  const [getGarage, setGarage] = useState(false);       // ????????
  const [appliedFilters, setAppliedFilters] = useState({
    bathrooms: "",
    rooms: "",
    floors: "",
    backyard: getBackyard,    // ????????
    garage: getGarage,  
  }); 

  const handleSubmit = () => {
    setAppliedFilters({
      bathrooms,
      rooms,
      type,
      backyard,
      garage,
    });
  };

  const filteredProperties = useMemo(() => {
    return combinedData.filter((build) => {
      const matchBathrooms = bathrooms ? build.bathrooms === Number(bathrooms) : true;
      const matchRooms = rooms ? build.rooms === Number(rooms) : true;
      const matchFloor = floors ? build.floor === Number(floor) : true;
      const matchBackyard = getBackyard ? build.backyard === true : true;        // ????????
      const matchGarage = getGarage ? build.garage === true : true; //poniendolos como booleanos?          // ????????
      
      return matchBathrooms && matchRooms && matchType && matchBackyard && matchGarage;
    });
  }, [allAppartments, bathrooms, floors, rooms, getBackyard, getGarage]);

  return {
    bathrooms,
    setBathrooms,
    rooms,
    setRooms,
    floors,
    setFloor,
    getBackyard,
    setBackyard,
    getGarage,
    setGarage,
    appliedFilters,
    handleSubmit,
    filteredProperties,
  };
};

export default useFilterProperties;
