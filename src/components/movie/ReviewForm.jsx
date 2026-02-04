import { useState } from "react";
import { ThumbsDown, Meh, ThumbsUp, MessageSquare } from "lucide-react";
import { getCurrentUser } from "../../services/authService";
import { showAlert } from "../common/CustomAlert";
import { createReviewWithAPI } from "../../services/reviewService"
import LoadingButton from "../common/LoadingButton"

export default function ReviewForm({ movieId, onReviewAdded }) {
    const [selectedType, setSelectedType] = useState(null);
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const reviewTypes = [
        {
            type: "Skip",
            Icon: ThumbsDown,
            color: "red",
            bgColor: "bg-red-600",
            borderColor: "border-red-500",
            hoverColor: "hover:bg-red-700"
        },
        {
            type: "TimePass",
            Icon: Meh,
            color: "yellow",
            bgColor: "bg-yellow-600",
            borderColor: "border-yellow-500",
            hoverColor: "hover:bg-yellow-700"
        },
        {
            type: "GoForIt",
            Icon: ThumbsUp,
            color: "green",
            bgColor: "bg-green-600",
            borderColor: "border-green-500",
            hoverColor: "hover:bg-green-700"
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedType) {
            showAlert("Please select a review type", "error")
            return;
        }

        const currentUser = getCurrentUser()

        if (!currentUser) {
            showAlert("Please login to submit a review", "warning")
            return
        }

        setIsLoading(true);

        const result = await createReviewWithAPI({
            movieId: movieId,
            type: selectedType,
            comment: comment
        })

        setIsLoading(false);

        if (result.success) {
            showAlert("Review submitted successfully!", "success")
            setSelectedType(null)
            setComment("")

            if (onReviewAdded) {
                onReviewAdded()
            }
        } else {
            if (result.error.includes("already reviewed")) {
                showAlert("You have already reviewed this movie", "info")
            } else {
                showAlert(result.error || "Failed to submit review", "error")
            }
        };
    };
    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">Write Your Review</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                        How would you rate this movie?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {reviewTypes.map(({ type, Icon, bgColor, borderColor, hoverColor }) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setSelectedType(type)}
                                className={`
                                    flex flex-col items-center gap-2 p-4 rounded-xl
                                    border-2 transition-all duration-200
                                    ${selectedType === type
                                        ? `${borderColor} ${bgColor} shadow-lg scale-105`
                                        : `border-slate-700 bg-slate-800 ${hoverColor} hover:border-slate-600`
                                    }
                                `}
                            >
                                <Icon className="w-6 h-6" />
                                <span className="font-semibold text-sm">
                                    {
                                        type === "Skip" ? "Skip" :
                                        type === "TimePass" ? "Time Pass" :
                                        type === "GoForIt" ? "Go For It" : ""
                                    }
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                        Share your thoughts (optional)
                    </label>
                    <textarea
                        placeholder="What did you think about this movie?"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-slate-800 text-white p-4 rounded-xl border-2 border-slate-700 focus:border-blue-500 focus:outline-none resize-none h-28 placeholder-gray-500 transition-colors"
                    />
                </div>

                <button type="submit" className="w-full">
                    <LoadingButton isLoading={isLoading}>
                        Submit Review
                    </LoadingButton>
                </button>
            </form>
        </div>
    );
}