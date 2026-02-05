import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getUserReviewsWithAPI, deleteReviewWithAPI } from "../../services/reviewService"
import { getAllMoviesWithAPI } from "../../services/movieService"
import { Link } from "react-router-dom"
import { MessageCircle, Edit2, Trash2, Calendar } from "lucide-react"
import { formatDate } from "../../utils/formatters"
import ConfirmDialog from "../common/ConfirmDialog"
import { showAlert } from "../common/CustomAlert"

export default function UserReviews({ userId }) {
    const [userReviews, setUserReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, reviewId: null })

    const { data: allMovies } = useQuery({
        queryKey: ['movies'],
        queryFn: async () => {
            const result = await getAllMoviesWithAPI();
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.movies;
        },
    })

    const getTypeColor = (type) => {
        switch (type) {
            case "Skip": return "bg-red-600 border-red-500"
            case "TimePass": return "bg-yellow-600 border-yellow-500"
            case "GoForIt": return "bg-green-600 border-green-500"
            default: return "bg-slate-600 border-slate-500"
        }
    }

    const fetchUserReviews = async () => {
        setLoading(true)
        const result = await getUserReviewsWithAPI(userId)

        if (result.success) {
            const reviewsWithPosters = result.data.map(review => {
                const movie = allMovies?.find(m => m.id === review.movieId)
                return {
                    ...review,
                    moviePoster: movie?.poster || null
                }
            })
            setUserReviews(reviewsWithPosters)
        } else {
            console.error("Failed to fetch user reviews:", result.error)
            setUserReviews([])
        }
        setLoading(false)
    }

    useEffect(() => {
        if (userId && allMovies) {
            fetchUserReviews()
        }
    }, [userId, allMovies])

    const handleDelete = (reviewId) => {
        setDeleteDialog({ isOpen: true, reviewId })
    }

    const confirmDelete = async () => {
        const reviewId = deleteDialog.reviewId
        setDeleteDialog({ isOpen: false, reviewId: null })

        const result = await deleteReviewWithAPI(reviewId)

        if (result.success) {
            showAlert("Review deleted successfully!", "warning")
            fetchUserReviews()
        } else {
            showAlert(result.error || "Failed to delete review", "error")
        }
    }

    if (loading || !allMovies) {
        return (
            <div className="mt-8">
                <div className="flex items-center gap-2 mb-6">
                    <MessageCircle className="w-6 h-6 text-red-500" />
                    <h2 className="text-2xl font-bold text-white">My Reviews</h2>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 animate-pulse">
                            <div className="flex gap-4 p-4">
                                <div className="w-20 sm:w-24 h-28 sm:h-36 bg-slate-800 rounded-lg flex-shrink-0" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-6 bg-slate-800 rounded w-3/4" />
                                    <div className="h-4 bg-slate-800 rounded w-1/2" />
                                    <div className="h-16 bg-slate-800 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="mt-8">
            <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-white">
                    My Reviews {userReviews.length > 0 && `(${userReviews.length})`}
                </h2>
            </div>

            {userReviews.length === 0 ? (
                <div className="text-center py-12 px-4 bg-slate-900/50 rounded-xl border border-slate-800">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-gray-600" />
                    </div>
                    <p className="text-gray-400 text-lg">You haven't reviewed any movies yet</p>
                    <p className="text-gray-500 text-sm mt-2">Start exploring and share your thoughts!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {userReviews.map((review) => (
                        <Link
                            key={review.id}
                            to={`/movie/${review.movieId}`}
                            className="block bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all group cursor-pointer"
                        >
                            <div className="flex flex-col sm:flex-row gap-4 p-4">
                                {/* Movie Poster */}
                                <div className="flex-shrink-0 mx-auto sm:mx-0">
                                    <img
                                        src={review.moviePoster || `https://via.placeholder.com/150x225?text=${encodeURIComponent(review.movieName)}`}
                                        alt={review.movieName}
                                        className="w-32 sm:w-24 h-44 sm:h-36 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                                    />
                                </div>

                                {/* Review Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-1">
                                        {review.movieName}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getTypeColor(review.type)}`}>
                                            {review.type === "Skip" ? "Skip" :
                                                review.type === "TimePass" ? "Time Pass" :
                                                    review.type === "GoForIt" ? "Go For It" :
                                                        review.type}
                                        </span>

                                        <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(review.createdAt)}
                                        </div>
                                    </div>

                                    {review.comment && (
                                        <p className="text-slate-300 text-sm leading-relaxed bg-slate-800/50 p-3 rounded-lg line-clamp-3">
                                            {review.comment}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, reviewId: null })}
                onConfirm={confirmDelete}
                title="Delete Review"
                message={
                    <>
                        Are you sure you want to delete this review?
                        <br />
                        This action cannot be undone.
                    </>
                }
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div>
    )
}