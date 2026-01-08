import { useState } from "react";

import { addReview } from "../../services/reviewService"

export default function ReviewForm({movieId}) {
    const [selectedType, setSelectedType] = useState(null)
    const [comment, setComment] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedType) {
            alert("Please select a review typ")
            return;
        }
        // console.log("Submitting review for movie: ", movieId)
        const newReview = addReview(movieId, {
            type: selectedType,
            comment: comment
        })

        console.log("Review saved:", newReview)

        setSelectedType(null)
        setComment("")
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
                            className={`reviewBtn ${selectedType === "Skip" ? "border-red-500 bg-red-600" : ""}`}
                        >
                            Skip
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedType("Time Pass")}
                            className={`reviewBtn ${selectedType === "Time Pass" ? "border-yellow-500 bg-yellow-600" : ""}`}
                        >
                            Time Pass
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedType("Go For It")}
                            className={`reviewBtn ${selectedType === "Go For It" ? "border-green-500 bg-green-600" : ""}`}
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
