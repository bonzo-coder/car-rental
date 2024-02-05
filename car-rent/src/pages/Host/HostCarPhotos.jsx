
import { useOutletContext } from "react-router-dom"

export default function HostCarPhotos() {
    const { currentCar } = useOutletContext()
    return (
        <img src={currentCar.imgURL} className="host-car-detail-image" />
    )
}