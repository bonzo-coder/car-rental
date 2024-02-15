import React from "react"
import { Link, defer, Await, useLoaderData } from "react-router-dom"
import { getHostCars } from "../../api"
import { requireAuth } from "../../utils"
import { BsStarFill } from "react-icons/bs"

export async function loader({ request }) {
    await requireAuth(request)
    return defer({ cars: getHostCars() })
}



export default function Dashboard() {
    const loaderData = useLoaderData()

    function renderCarElements(cars) {
        const hostCarsEls = cars.map((car) => (
            <div className="host-car-single" key={car.id}>
                <img src={car.imgURL} alt={`Photo of ${car.name}`} />
                <div className="host-car-info">
                    <h3>{car.name}</h3>
                    <p>${car.price}/day</p>
                </div>
                <Link to={`cars/${car.id}`}>View</Link>
            </div>
        ))
        
        return (
            <div className="host-cars-list">
                <section>{hostCarsEls}</section>
            </div>
        )
    }

        const loggedUser = localStorage.getItem("loggedId")
        // income for both user different hardCoded
        let userIncome = 0;

        loggedUser == 123 ? userIncome+=2410 : userIncome+=1050 ; 
        // so it just looks nice on page...
        
    return (
        <>
            <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Welcome user {loggedUser}!</h1>
                    <p>Income last <span>30 days</span></p>
                    <h2>$ {userIncome}</h2>
                </div>
                <Link to="income">Details</Link>
            </section>
            <section className="host-dashboard-reviews">
                <h2>Review score</h2>
                <BsStarFill className="star" />
                <p>
                    <span>5.0</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
            <section className="host-dashboard-cars">
                <div className="top">
                    <h2>Your listed cars</h2>
                    <Link to="cars">View all</Link>
                </div>
                <React.Suspense fallback={<h3>Loading...</h3>}>
                    <Await resolve={loaderData.cars}>{renderCarElements}</Await>
                </React.Suspense>
            </section>
        </>
    )
}
