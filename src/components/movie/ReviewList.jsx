import { useState, useEffect } from 'react';
import { getReviews } from '../../services/reviewService'

export default function ReviewList({ movieId }) {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const loadedReviews = getReviews(movieId)
        // console.log("Loaded reviews: ", loadedReviews)
        setReviews(loadedReviews)
    }, [movieId])

    const getTypeColor = (type) => {
        switch (type) {
            case "Skip": return "bg-red-600"
            case "Time Pass": return "bg-yellow-600"
            case "Go For It": return "bg-green-600"
        }
    }

    return (
        <div className='mt-8 bg-slate-900 p-6 rounded-lg'>
            <h3
                className='text-2xl font-bold mb-6'
            >
                {reviews.length === 0 ? "No review Found" : reviews.length === 1 ? "User Review" : "User Reviews"}
            </h3>

            <div>
                {reviews.map((review) => (
                    <div key={review.id} className='bg-slate-800 p-4 rounded-lg mb-4 border border-slate-700'>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(review.type)}`}>
                            {review.type}
                        </span>
                        <p className='text-slate-500 text-xs mt-2'>
                            {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                        <p className='text-slate-300 mt-3'>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};
