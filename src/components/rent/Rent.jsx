import Buildings from "../buildings/Buildings";
import RentCard from "../rentCard/RentCard";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer'
import './Rent.css'

const Rent = ({ propertys }) => {

    return (
        <>
            <Navbar />
            <h1 style={{textAlign: "center", margin: "50px"}}>Todos los inmuebles</h1>
            <main className="all-rents-grid">
                {propertys.map(build => (
                    <RentCard 
                        key={build.id}
                        ubication={build.ubication}
                        type={build.type}
                        address={build.address}
                        bathrooms={build.bathrooms}
                        rooms={build.rooms}
                        garage={build.garage}
                        backyard={build.backyard}
                        pictures={build.pictures}
                        description={build.description}
                        rating={build.rating}
                        price={build.price}
                        isAuthorized={build.isAuthorized}
                        userId={build.userId}
                    />
                ))}
            </main>
            <Footer />
        </>
    )
}

export default Rent;