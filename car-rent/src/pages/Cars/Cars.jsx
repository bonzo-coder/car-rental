import React from "react"
import {
    Link,
    useSearchParams,
    useLoaderData,
    defer,
    Await
} from "react-router-dom"
import { getCars } from "../../api"

export function loader() {
    return defer({ cars: getCars() })
}

export default function Cars() {
    const [searchParams, setSearchParams] = useSearchParams()
    const dataPromise = useLoaderData()

    const typeFilter = searchParams.get("type")

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    function renderCarElements(cars) {
        
        const displayedCars = typeFilter
            ? cars.filter(car => car.type === typeFilter)
            : cars
    
        const carElements = displayedCars.map(car => (
            <div key={car.id} className="car-tile">
                <Link
                    to={car.id}
                    state={{
                        search: `?${searchParams.toString()}`,
                        type: typeFilter
                    }}
                >
                    <div className="img-container">
                        <img src={car.imgURL} />
                    </div>
                    <div className="car-info">
                        <h3>{car.name}</h3>
                        <p>${car.price}<span>/day</span></p>
                    </div>
                    <i className={`car-type ${car.type} selected`}>{car.type}</i>
                </Link>
            </div>
        ))
        return (
            <>
                <div className="car-list-filter-buttons">
                    <button
                        onClick={() => handleFilterChange("type", "sport")}
                        className={
                            `car-type sport
                        ${typeFilter === "sport" ? "selected" : ""}`
                        }
                    >Sport</button>
                    <button
                        onClick={() => handleFilterChange("type", "luxury")}
                        className={
                            `car-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`
                        }
                    >Luxury</button>
                    <button
                        onClick={() => handleFilterChange("type", "city")}
                        className={
                            `car-type city 
                        ${typeFilter === "city" ? "selected" : ""}`
                        }
                    >City</button>

                    {typeFilter ? (
                        <button
                            onClick={() => handleFilterChange("type", null)}
                            className="car-type clear-filters"
                        >Clear filter</button>
                    ) : null}

                </div>
                <div className="car-list">
                    {carElements}
                </div>
            </>
        )
    }

    return (
        <div className="car-list-container">
            <h1>Explore our car options</h1>
            <React.Suspense fallback={<h2>Loading cars...</h2>}>
                <Await resolve={dataPromise.cars}>
                    {renderCarElements}
                </Await>
            </React.Suspense>
        </div>
    )
}