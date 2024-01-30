import React from "react"
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom"
import { getCar } from "../../api"

export function loader({ params }) {
    return getCar(params.id)
}

export default function CarDetail() {
    const location = useLocation()
    const car = useLoaderData()

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} cars</span></Link>

            <div className="van-detail">
                <img src={car.imgURL} />
                <i className={`van-type ${car.type} selected`}>
                    {car.type}
                </i>
                <h2>{car.name}</h2>
                <p className="van-price"><span>${car.price}</span>/day</p>
                <p>{car.year}</p>
                <button className="link-button">Rent this car</button>
            </div>

        </div>
    )
}