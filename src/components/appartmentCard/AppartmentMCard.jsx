import './AppartmentMCard.css'

const AppartmentMCard = ({ floor, number, bathrooms, rooms, pictures, description, price, buildingId }) => {
    ///creo que tiene que mostrarlo nd mas

    return (
        <div className="apartment-card">    
            <div className="apartment-card-info">
                <p>Departamento en el {floor}° piso, N° {number}</p>
                <p>Edificio: {buildingId}</p>
                <p>{rooms} habitaciones, {bathrooms} baños</p>
                <p><strong>Precio:</strong> ${price}</p>
                <p><strong>Descripción:</strong> {description}</p>
            </div>
        </div>
    );
}
export default AppartmentMCard;