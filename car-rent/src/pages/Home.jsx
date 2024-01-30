
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="home-container">
            <h1>You have the travel destination, we got the cars for transportation.</h1>
            <p>Rent the perfect car to reach your destination with ease. Choose between small city, sporty or luxury cars in our offer below.</p>
            <Link to="cars">Find your car</Link>
        </div>
    )
}