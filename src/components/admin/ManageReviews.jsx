import { useState } from 'react';
import { Search, Trash2, User, Film } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getReviewsByMovieWithAPI, getUserReviewsWithAPI, deleteReviewWithAPI } from '../../services/reviewService';
import { formatDate } from '../../utils/formatters';
import { showAlert } from '../common/CustomAlert';
import ConfirmDialog from '../common/ConfirmDialog';
import LoadingSpinner from '../Skeleton/LoadingSpinner';

export default function ManageReviews({ movies }) {
    const [searchType, setSearchType] = useState('movie');
    const [searchValue, setSearchValue] = useState('');
    const [searchQuery, setSearchQuery] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, reviewId: null });
    const queryClient = useQueryClient();

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['admin-reviews', searchType, searchQuery],
        queryFn: async () => {
            if (!searchQuery) return [];

            let result;
            if (searchType === 'movie') {
                result = await getReviewsByMovieWithAPI(searchQuery);
            } else {
                result = await getUserReviewsWithAPI(searchQuery);
            }

            if (!result.success) {
                throw new Error(result.error);
            }
            return result.reviews || result.data || [];
        },
        enabled: !!searchQuery,
        staleTime: 2 * 60 * 1000,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue.trim()) {
            showAlert("Please enter a search value", "error");
            return;
        }
        setSearchQuery(searchValue.trim());
    };

    const handleDelete = (reviewId) => {
        setDeleteDialog({ isOpen: true, reviewId });
    };

    const confirmDelete = async () => {
        const reviewId = deleteDialog.reviewId;
        setDeleteDialog({ isOpen: false, reviewId: null });

        const result = await deleteReviewWithAPI(reviewId);

        if (result.success) {
            showAlert("Review deleted successfully!", "success");
            queryClient.invalidateQueries(['admin-reviews']);
        } else {
            showAlert(result.error || "Failed to delete review", "error");
        }
    };

    const getMoviePoster = (movieId) => {
        const movie = movies.find(m => m.id === movieId);
        return movie?.poster || null;
    };

    const getTypeColor = (type) => {
        switch (type) {
            case "Skip": return "bg-red-600 border-red-500";
            case "TimePass": return "bg-yellow-600 border-yellow-500";
            case "GoForIt": return "bg-green-600 border-green-500";
            default: return "bg-slate-600 border-slate-500";
        }
    };

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Manage Reviews</h2>
            </div>

            <div className="p-6 mb-6 rounded-lg bg-slate-900">
                <div className="flex gap-4 mb-4">
                    <button
                        onClick={() => setSearchType('movie')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${searchType === 'movie'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                            }`}
                    >
                        <Film className="inline w-4 h-4 mr-2" />
                        Search by Movie ID
                    </button>
                    <button
                        onClick={() => setSearchType('user')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${searchType === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                            }`}
                    >
                        <User className="inline w-4 h-4 mr-2" />
                        Search by User ID
                    </button>
                </div>

                <form onSubmit={handleSearch} className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute w-5 h-5 -translate-y-1/2 pointer-events-none left-3 top-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder={`Enter ${searchType === 'movie' ? 'Movie' : 'User'} ID...`}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full py-3 pl-10 pr-4 text-white border rounded-lg bg-slate-800 border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Search
                    </button>
                </form>
            </div>

            {isLoading ? (
                <LoadingSpinner fullScreen={false} />
            ) : !searchQuery ? (
                <div className="py-12 text-center">
                    <Search className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400">Enter a {searchType === 'movie' ? 'Movie' : 'User'} ID to search reviews</p>
                </div>
            ) : reviews.length === 0 ? (
                <div className="py-12 text-center">
                    <p className="text-gray-400">No reviews found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="flex gap-4 p-4 transition-colors border rounded-lg bg-slate-800 border-slate-700 hover:border-slate-600"
                        >
                            {getMoviePoster(review.movieId) && (
                                <img
                                    src={getMoviePoster(review.movieId)}
                                    alt={review.movieName}
                                    className="object-cover w-16 h-24 rounded"
                                />
                            )}

                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-white">{review.movieName}</h3>
                                        <p className="text-sm text-gray-400">by {review.userName}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getTypeColor(review.type)}`}>
                                        {
                                            review.type === "Skip" ? "Skip" :
                                                review.type === "TimePass" ? "Time Pass" :
                                                    review.type === "GoForIt" ? "Go For It" :
                                                        review.type
                                        }
                                    </span>
                                </div>

                                <p className="mb-2 text-xs text-slate-500">{formatDate(review.createdAt)}</p>

                                {review.comment && (
                                    <p className="p-3 mb-3 text-sm leading-relaxed rounded-lg text-slate-300 bg-slate-900/50">
                                        {review.comment}
                                    </p>
                                )}

                                <button
                                    onClick={() => handleDelete(review.id)}
                                    className="flex items-center gap-2 text-sm font-medium text-red-400 transition-colors hover:text-red-300"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Review
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, reviewId: null })}
                onConfirm={confirmDelete}
                title="Delete Review"
                message="Are you sure you want to delete this review? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div>
    );
}