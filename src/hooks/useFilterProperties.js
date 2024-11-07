import { useState, useMemo } from "react";
import Buildings from "../components/buildings/Buildings";

const useFilterProperties = () => {
  const [bathrooms, setBathrooms] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState("");
  const [backyard, setBackyard] = useState("");
  const [garage, setGarage] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    bathrooms: "",
    rooms: "",
    type: "",
    backyard: "",
    garage: "",
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
    return Buildings.filter((build) => {
      const matchBathrooms = bathrooms ? build.bathrooms === Number(bathrooms) : true;
      const matchRooms = rooms ? build.rooms === Number(rooms) : true;
      const matchType = type ? build.type.toLowerCase() === type.toLowerCase() : true;
      const matchBackyard = backyard ? build.backyard === (backyard === "true") : true;
      const matchGarage = garage ? build.garage === (garage === "true") : true;

      return matchBathrooms && matchRooms && matchType && matchBackyard && matchGarage;
    });
  }, [Buildings, bathrooms, type, rooms, backyard, garage]);

  return {
    bathrooms,
    setBathrooms,
    type,
    setType,
    rooms,
    setRooms,
    backyard,
    setBackyard,
    garage,
    setGarage,
    appliedFilters,
    handleSubmit,
    filteredProperties,
  };
};

export default useFilterProperties;
