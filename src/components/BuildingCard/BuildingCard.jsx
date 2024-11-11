import './BuildingCard.css'
import { useNavigate } from 'react-router-dom';


const BuildingCard = ({buildingId, ubication, address, garage, backYard, navigateTo}) => {

    const navigate = useNavigate();
    const haveGarage = (garage) => {
        if (garage) {
            return "con Garage"
        } else {
            return "sin Garage"
        }
    }

    const haveBackYard = (backYard) => {
        if (backYard) {
            return "y con Patio"
        } else {
            return "y sin Patio"
        }
    }

    return (
        <div className="building-card" onClick={() => navigate(`${navigateTo}/${buildingId}`)}>
            <img className="building-card-image" src='https://i.pinimg.com/564x/5b/c4/89/5bc4895fb25f006e1c159fbd81172112.jpg' alt="Imagen del inmueble" />
            <div className="building-card-info">
                <p>Edificio de {ubication} en {address}</p>
                <p>{haveGarage(garage)} {haveBackYard(backYard)}</p>
            </div>
        </div>
    )
}

export default BuildingCard;