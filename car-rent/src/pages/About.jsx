
// import bgImg from "../assets/images/about-hero.png"
import { Link } from "react-router-dom"

export default function About() {
    return (
        <div className="about-page-container">
            {<img src="https://autoua.net/media/uploads2/raznoe_2/34264589678-(1).jpg" className="about-hero-image" /> }
            <div className="about-page-content">
                <h1>Short and long term car rental. </h1>
                <p>We give you the ability to rent a car that you want, whenever you want. Our new shiny premmium cars will 
                    fit your needs.</p>
                <p>Experience the freedom of the open road with our premium car rental services. Whether you're embarking 
                    on a weekend getaway or navigating city streets, our diverse fleet of vehicles ensures you find the 
                    perfect ride for any adventure. Drive in style, comfort, and confidence with our hassle-free car 
                    rental solutions – your journey starts with us. Rent a car, jump in and give it a drive.</p>
            </div>
            <div className="about-page-cta">
                <h2>Just rent a car.<br />Your car is ready.</h2>
                <Link className="link-button" to="/cars">Explore cars</Link>
            </div>
        </div>
    );
}