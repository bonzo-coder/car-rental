import React from "react"
import { Link, useLoaderData, defer, Await } from "react-router-dom"
import { getHostCars } from "../../api"
import { requireAuth } from "../../utils"

export async function loader({ request }) {
    await requireAuth(request)
    return defer({ cars: getHostCars() })
}

export default function HostCars() {
    const dataPromise = useLoaderData()

    function renderCarElements(cars) {
        const hostCarsEls = cars.map(car => (
            <Link
                to={car.id}
                key={car.id}
                className="host-car-link-wrapper"
            >
                <div className="host-car-single" key={car.id}>
                    <img src={car.imgURL} alt={`Photo of ${car.name}`} />
                    <div className="host-car-info">
                        <h3>{car.name}</h3>
                        <p>${car.price}/day</p>
                    </div>
                </div>
            </Link>
        ))

        return (
            <div className="host-cars-list">
                <section>
                    {hostCarsEls}
                </section>
            </div>
        )
    }


    return (
        <section>
            <h1 className="host-cars-title">Your listed cars</h1>
            <React.Suspense fallback={<h2>Loading cars...</h2>}>
                <Await resolve={dataPromise.cars}>
                    {renderCarElements}
                </Await>
            </React.Suspense>
        </section>
    )
}