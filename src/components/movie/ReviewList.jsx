import { useState, useEffect } from 'react';
import { MessageCircle, Edit2, Trash2, User } from 'lucide-react';
import { getReviewsByMovieWithAPI, deleteReviewWithAPI, updateReviewWithAPI } from "../../services/reviewService";
import { getCurrentUser } from '../../services/authService';
import { formatDate } from '../../utils/formatters';
import ReviewEditForm from './ReviewEditForm';
import ReviewListSkeleton from '../Skeleton/ReviewListSkeleton';
import ConfirmDialog from '../common/ConfirmDialog';
import { showAlert } from '../common/CustomAlert';


export default function ReviewList({ movieId, movieType }) {
    const [reviews, setReviews] = useState([]);
    const [editedReview, setEditedReview] = useState(null);
    const currentUser = getCurrentUser();
    const [loading, setLoading] = useState(true);
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, reviewId: null });

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true)
            const result = await getReviewsByMovieWithAPI(movieId);

            if (result.success) {
                setReviews(result.reviews);
            } else {
                console.error("Failed to fetch reviews:", result.error);
                setReviews([]);
            }
            setLoading(false)
        };

        fetchReviews();
    }, [movieId]);

    const getTypeColor = (type) => {
        switch (type) {
            case "Skip": return "bg-red-600 border-red-500";
            case "TimePass": return "bg-yellow-600 border-yellow-500";
            case "GoForIt": return "bg-green-600 border-green-500";
            default: return "bg-slate-600 border-slate-500";
        }
    };

    const refreshReviews = async () => {
        const result = await getReviewsByMovieWithAPI(movieId);

        if (result.success) {
            setReviews(result.reviews);
        }
    };

    const handleDelete = async (reviewId) => {
        setDeleteDialog({ isOpen: true, reviewId })
    };

    const confirmDelete = async () => {
        const reviewId = deleteDialog.reviewId
        setDeleteDialog({ isOpen: false, reviewId: null })

        const result = await deleteReviewWithAPI(reviewId);

        if (result.success) {
            showAlert("Review deleted successfully!", "warning");
            refreshReviews();
        } else {
            showAlert(result.error || "Failed to delete review", "error");
        }
    };

    const handleSave = async (reviewId, updatedData) => {
        const result = await updateReviewWithAPI(reviewId, updatedData);

        if (result.success) {
            setEditedReview(null)
            refreshReviews()
        } else {
            alert(result.error || "Failed to update review");
        }
    };

    return (
        <div className='w-full'>
            <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-6 h-6 text-red-500" />
                <h3 className='text-xl sm:text-2xl font-bold text-white'>
                    {reviews.length === 0 ? "No Reviews Yet" : `User Reviews (${reviews.length})`}
                </h3>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <ReviewListSkeleton />
                ) : reviews.length === 0 ? (
                    <div className="text-center py-12 px-4">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                            <MessageCircle className="w-8 h-8 text-gray-600" />
                        </div>
                        <p className="text-gray-400">
                            Be the first to review this {movieType.toLowerCase() === 'webseries' ? 'web series' : 'movie'}!
                        </p>
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className='bg-slate-800/50 rounded-xl p-4 sm:p-5 border border-slate-700 hover:border-slate-600 transition-colors'>
                            {editedReview && editedReview.id === review.id ? (
                                <ReviewEditForm
                                    review={review}
                                    onSave={handleSave}
                                    onCancel={() => setEditedReview(null)}
                                />
                            ) : (
                                <div>
                                    <div className='flex items-start gap-3 mb-3'>
                                        <div className='flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden'>
                                            {review.userPhoto ? (
                                                <img src={review.userPhoto} className='w-full h-full object-cover' alt="User" />
                                            ) : (
                                                <User className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>

                                        <div className='flex-1 min-w-0'>
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <p className='text-sm font-semibold text-white'>
                                                    {review.userName || "Anonymous"}
                                                </p>
                                                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${getTypeColor(review.type)}`}>
                                                    {
                                                        review.type === "Skip" ? "Skip" :
                                                            review.type === "TimePass" ? "Time Pass" :
                                                                review.type === "GoForIt" ? "Go For It" :
                                                                    review.type
                                                    }
                                                </span>
                                            </div>

                                            <p className='text-slate-500 text-xs mb-3'>
                                                {formatDate(review.createdAt)}
                                            </p>

                                            {review.comment && (
                                                <p className='text-slate-300 text-sm leading-relaxed bg-slate-900/50 p-3 rounded-lg'>
                                                    {review.comment}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {currentUser && currentUser.id === review.userId && (
                                        <div className='flex gap-3 pt-3 border-t border-slate-700'>
                                            <button
                                                className='flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors'
                                                onClick={() => setEditedReview(review)}
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                                Edit
                                            </button>
                                            <button
                                                className='flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm font-medium transition-colors'
                                                onClick={() => handleDelete(review.id)}
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, reviewId: null })}
                onConfirm={confirmDelete}
                title="Delete Review"
                message={
                    <>
                        Are you sure you want to delete this review?
                        <br />
                        The action cannot be undone.
                    </>
                }
                confirmText="Delete"
                cancelText="Cancel"
            />

        </div>
    );
}