import './RentCard.css'

const RentCard = ({ubication, type, id, address, bathrooms, rooms, garage, backyard, pictures, description, rating, price, isAuthorized, userId}) => {

    const haveGarage = (garage) => {
        if (garage) {
            return "con Garage"
        } else {
            return "sin Garage"
        }
    }

    const haveBackyard = (backyard) => {
        if (backyard) {
            return "y con Patio"
        } else {
            return "y sin Patio"
        }
    }

    return (
        <div className="rent-card">
            <img className="rent-card-image" src={pictures[0]} alt="Imagen del inmueble" />
            <div className="rent-card-info">
                <p>{type} de {ubication} en {address}</p>
                <p>{bathrooms} Baños y {rooms} Habitaciones</p>
                <p>{haveGarage(garage)} {haveBackyard(backyard)}</p>
                <p>${price}/mes</p>
                <p>{description}</p>
                <p>{rating}</p>

                {/* esto se le deberia mostrar solo al admin y no se deberian mostrar las no disponibles al comprador???
                
                <p>{isAuthorized ? 'Autorizado' : 'No autorizado'}</p>
                <p>ID Usuario: {userId}</p>
                */}
                
            </div>
        </div>
    )
}

export default RentCard;
