
import { BsStarFill } from "react-icons/bs"

export default function Reviews() {
    const reviewsData = [
        {
            rating: 5,
            name: "Barbara",
            date: "January 6, 2024",
            text: "The BMW 3 is a super car! Such a sporty, good handling car. Great condition of the car. Super clean. Feels like new. Highly recommend!",
            id: "1",
        },
        {
            rating: 5,
            name: "Sam",
            date: "December 18, 2023",
            text: "This is our second time using this car rental.Now I can just say - perfect as always.",
            id: "2",
        },
    ]
    
    return (
        <section className="host-reviews">
            <div className="top-text">
                <h2>Your reviews</h2>
                <p>
                    Last <span>30 days</span>
                </p>
            </div>
            
            <h3>Reviews (2)</h3>
            {reviewsData.map((review) => (
                <div key={review.id}>
                    <div className="review">
                        {[...Array(review.rating)].map((_, i) => (
                            <BsStarFill className="review-star" key={i} />
                        ))}
                        <div className="info">
                            <p className="name">{review.name}</p>
                            <p className="date">{review.date}</p>
                        </div>
                        <p>{review.text}</p>
                    </div>
                    <hr />
                </div>
            ))}
        </section>
    )
}
