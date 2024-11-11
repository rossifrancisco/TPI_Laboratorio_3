import './BuildingCard.css'
import { useNavigate } from 'react-router-dom';


const BuildingCard = ({id, ubication, address, garage, backYard}) => {

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
        <div className="building-card" onClick={() => navigate(`/CreateAppartment/${id}`)}>
            <div className="building-card-info">
                <p>Edificio de {ubication} en {address}</p>
                <p>{haveGarage(garage)} {haveBackyard(backYard)}</p>
            </div>
        </div>
    )
}

export default BuildingCard;
