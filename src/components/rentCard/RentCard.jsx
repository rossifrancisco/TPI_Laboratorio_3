import './RentCard.css'
import { useNavigate } from 'react-router-dom';

const RentCard = ({ ubication, id, address, bathrooms, rooms, garage, backYard, pictures, description, rating, price, navigateTo }) =>
    
    {
        
    const navigate = useNavigate();
    const MAX_LENGTH = 100;

    const truncateText = (text) => {
        if (text.length > MAX_LENGTH) {
            return text.slice(0, MAX_LENGTH) + "...";
        }
        return text;
    };

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
        <div className="rent-card" onClick={() => navigate(`${navigateTo}/${id}`)}>
            <img className="rent-card-image" src={pictures[0]} alt="Imagen del inmueble" />
            <div className="rent-card-info">
                <p>Departamento de {ubication} en {address}</p>
                <p>{bathrooms} Baños y {rooms} Habitaciones</p>
                <p>{haveGarage(garage)} {haveBackyard(backYard)}</p>
                <p>${price}/mes</p>
                <p>{truncateText(description)}</p>
                <p>{rating == 0 ? 'Sin calificaciones' : `Calificacion: ${rating}`}</p>
            </div>
        </div>
    )
}

export default RentCard;
