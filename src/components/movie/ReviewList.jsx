import { useState, useEffect } from 'react';
import { getReviews, deleteReview, updateReview } from "../../services/reviewService";
import { getCurrentUser } from '../../services/authService';



export default function ReviewList({ movieId }) {
    const [reviews, setReviews] = useState([])
    const [editedReview, setEditedReview] = useState(null);
    const [editType, setEditType] = useState("")
    const [editComment, setEditComment] = useState("")
    const currentUser = getCurrentUser();

    useEffect(() => {
        const loadedReviews = getReviews(movieId)

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
            comment: editComment
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
                                <select className='w-full bg-slate-800 p-3 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none mb-3'
                                    value={editType}
                                    onChange={(e) => setEditType(e.target.value)}
                                >
                                    <option value="Skip">Skip</option>
                                    <option value="Time Pass">Time Pass</option>
                                    <option value="Go For It">Go For It</option>
                                </select>

                                <textarea className='w-full bg-slate-800 border rounded-lg p-4 border-slate-700 focus:border-blue-500 focus:outline-none h-24 mb-3 resize-none'
                                    value={editComment}
                                    onChange={(e) => setEditComment(e.target.value)}
                                >
                                </textarea>

                                <button className='bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold mr-2'
                                    onClick={handleSave}
                                >
                                    Save
                                </button>

                                <button className='bg-slate-700 px-6 py-2 rounded-lg font-semibold hover:bg-slate-600'
                                    onClick={() => setEditedReview(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div>
                                { }

                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(review.type)}`}>
                                    {review.type}
                                </span>

                                <p className='mt-2 text-sm font-semibold text-slate-400'>
                                    {review.userName || "Anonymous"}
                                </p>

                                <p className='text-slate-500 text-xs mt-1'>
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                                <p className='text-slate-300 mt-3'>{review.comment}</p>
                            </div>
                        )
                        }


                        {currentUser && currentUser.id === review.userId && (

                            <div className='flex gap-3 mt-4 pt-3 border-t border-slate-700'>
                                <button className='text-blue-400 hover:text-blue-300 text-sm font-semibold'
                                    onClick={() => {
                                        setEditedReview(review)
                                        setEditType(review.type)
                                        setEditComment(review.comment)
                                    }
                                    }
                                >
                                    ✏️ Edit
                                </button>
                                <button className='text-red-400 hover:text-red-300 text-sm font-semibold'
                                    onClick={() => handleDelete(review.id)}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
};
