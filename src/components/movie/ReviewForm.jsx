import { useState } from "react";

import { addReview, getReviews } from "../../services/reviewService"
import { getCurrentUser } from "../../services/authService"



export default function ReviewForm({ movieId, onReviewAdded }) {
    const [selectedType, setSelectedType] = useState(null)
    const [comment, setComment] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedType) {
            alert("Please select a review type...")
            return;
        }

        const currentUser = getCurrentUser();

        if (!currentUser) {
            alert("Please login to submit a review...")
        }

        const existingReviews = getReviews(movieId)
        const userReview = existingReviews.find((review) => review.userId === currentUser.id)

        if (userReview) {
            alert("You have already reviewed this movie. You can update your existing review...")
            return;
        }

        const newReview = addReview(movieId, {
            type: selectedType,
            comment: comment,
            userId: currentUser.id,
            userName: `${currentUser.firstName} ${currentUser.lastName}`
        })



        setSelectedType(null)
        setComment("")

        if (onReviewAdded) {
            onReviewAdded()
        }
    }

    return (
        <div className="mt-8 bg-slate-900 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 ">Write a Review</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="" className="font-semibold mb-2">Review Type</label>
                    <div className="flex gap-3 mb-4">
                        <button
                            type="button"
                            onClick={() => setSelectedType("Skip")}
                            className={`ReviewBtn ${selectedType === "Skip" ? "border-red-500 bg-red-600" : ""}`}
                        >
                            Skip
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedType("Time Pass")}
                            className={`ReviewBtn ${selectedType === "Time Pass" ? "border-yellow-500 bg-yellow-600" : ""}`}
                        >
                            Time Pass
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedType("Go For It")}
                            className={`ReviewBtn ${selectedType === "Go For It" ? "border-green-500 bg-green-600" : ""}`}
                        >
                            Go For It
                        </button>

                    </div>
                </div>

                <div>
                    <textarea
                        name="" id=""
                        placeholder="Write your review..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-slate-800 p-4 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none resize-none h-32 [scrollbar-width:none]"
                    ></textarea>
                </div>

                <button type="submit"
                    className="w-full bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 mt-2"
                >
                    Submit Review
                </button>
            </form>
        </div>
    )
};
