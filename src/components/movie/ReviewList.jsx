import { useState, useEffect } from 'react';
import { getReviews, deleteReview, updateReview } from "../../services/reviewService";
import { getCurrentUser } from '../../services/authService';



export default function ReviewList({ movieId }) {
    const [reviews, setReviews] = useState([])
    const [editedReview, setEditedReview] = useState(null);
    const [editType, setEditType] = useState("")
    const [editCommment, setEditComment] = useState("")
    const currentUser = getCurrentUser();

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

    const refreshReviews = () => {
        const loadedReviews = getReviews(movieId)
        setReviews(loadedReviews)
    }

    const handleDelete = (reviewId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?")
        if (!confirmDelete) return;
        deleteReview(movieId, reviewId)
        refreshReviews()
    }
    const handleSave = () => {
        updateReview(movieId, editedReview.id, {
            type: editType,
            comment: editCommment
        })
        setEditedReview(null);
        refreshReviews();
    }

    useEffect(() => {
        refreshReviews()
    }, [movieId])

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
                        {editedReview && editedReview.id === review.id ? (
                            <div>
                                <select
                                    value={editType}
                                    onChange={(e) => setEditType(e.target.value)}
                                >
                                    <option value="Skip">Skip</option>
                                    <option value="Time Pass">Time Pass</option>
                                    <option value="Go For It">Go For It</option>
                                </select>

                                <textarea
                                    value={editCommment}
                                    onChange={(e) => setEditComment(e.target.value)}
                                >
                                </textarea>

                                <button
                                    onClick={handleSave}
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() => setEditedReview(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div>
                                {console.log("Current user:", currentUser?.id, "Review user:", review.userId)}

                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(review.type)}`}>
                                    {review.type}
                                </span>
                                <p className='text-slate-500 text-xs mt-2'>
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                                <p className='text-slate-300 mt-3'>{review.comment}</p>
                            </div>
                        )
                        }


                        {currentUser && currentUser.id === review.userId && (
                            <div>
                                <button
                                    onClick={() => {
                                        setEditedReview(review)
                                        setEditType(review.type)
                                        setEditComment(review.comment)
                                    }
                                    }
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(review.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
};
