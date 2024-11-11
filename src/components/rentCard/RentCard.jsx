import './RentCard.css'
import { useNavigate } from 'react-router-dom';

const RentCard = ({ubication, id, address, bathrooms, rooms, garage, backYard, pictures, description, rating, price}) => {
    const navigate = useNavigate();
    
    const haveGarage = (garage) => {
        if (garage) {
            return "con Garage"
        } else {
            return "sin Garage"
        }
    }

    const haveBackyard = (backYard) => {
        if (backYard) {
            return "y con Patio"
        } else {
            return "y sin Patio"
        }
    }

    return (
        <div className="rent-card" onClick={() => navigate(`/AppartmentCard/${id}`)}>
            <img className="rent-card-image" src={pictures[0]} alt="Imagen del inmueble" />
            <div className="rent-card-info">
                <p>Departamento de {ubication} en {address}</p>
                <p>{bathrooms} Baños y {rooms} Habitaciones</p>
                <p>{haveGarage(garage)} {haveBackyard(backYard)}</p>
                <p>${price}/mes</p>
                <p>{description}</p>
                <p>{rating}</p>
            </div>
        </div>
    )
}

export default RentCard;
