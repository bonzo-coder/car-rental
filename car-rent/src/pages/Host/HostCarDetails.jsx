
import { useParams, Link, NavLink, Outlet, useLoaderData } from "react-router-dom"
import { getCar } from "../../api"
import { requireAuth } from "../../utils"

export async function loader({ params, request }) {
    await requireAuth(request)
    return getCar(params.id)
}

export default function HostCarDetail() {
    const currentCar = useLoaderData()

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all cars</span></Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentCar.imgURL} />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${currentCar.type}`}
                        >
                            {currentCar.type}
                        </i>
                        <h3>{currentCar.name}</h3>
                        <h4>${currentCar.price}/day</h4>
                    </div>
                </div>

                <nav className="host-van-detail-nav">
                    <NavLink
                        to="."
                        end
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Details
                    </NavLink>
                    <NavLink
                        to="pricing"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Pricing
                    </NavLink>
                    <NavLink
                        to="photos"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Photos
                    </NavLink>
                </nav>
                <Outlet context={{ currentCar }} />
            </div>
        </section>
    )
}
