import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMovieByIdWithAPI } from "../services/movieService";
import { ArrowLeft, Calendar, Film } from "lucide-react";
import ReviewGauge from "../components/movie/ReviewGauge";
import { formatGenres } from "../utils/formatters";
import ReviewForm from "../components/movie/ReviewForm";
import ReviewList from "../components/movie/ReviewList";
import { useState, useCallback } from 'react';
import MovieDetailSkeleton from "../components/Skeleton/MovieDetailSkeleton";

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [reviews, setReviews] = useState([]);

    const { data: movie, isLoading, error } = useQuery({
        queryKey: ['movie', id],
        queryFn: async () => {
            const cachedMovies = queryClient.getQueryData(['movies']);

            if (cachedMovies) {
                const foundMovie = cachedMovies.find(m => m.id === parseInt(id));
                if (foundMovie) {
                    return foundMovie;
                }
            }

            const result = await getMovieByIdWithAPI(id);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.movie;
        },
        staleTime: 10 * 60 * 1000,
    });

    const handleReviewAdded = () => {
        queryClient.invalidateQueries(['reviews', parseInt(id)]);
    };

    const handleReviewsLoad = useCallback((loadedReviews) => {
        setReviews(loadedReviews);
    }, []);

    if (isLoading) {
        return <MovieDetailSkeleton />;
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-900/20 flex items-center justify-center">
                        <Film className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Movie Not Found</h2>
                    <p className="text-red-400 mb-6">{error?.message || "The movie you're looking for doesn't exist"}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all font-medium inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const reviewCounts = {
        skip: reviews.filter(r => r.type === "Skip").length,
        timePass: reviews.filter(r => r.type === "TimePass").length,
        goForIt: reviews.filter(r => r.type === "GoForIt").length,
    };

    const reviewData = [
        { label: "Skip", value: reviewCounts.skip, color: "red" },
        { label: "Timepass", value: reviewCounts.timePass, color: "yellow" },
        { label: "Go for it", value: reviewCounts.goForIt, color: "green" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <button
                    onClick={() => navigate('/')}
                    className="mb-6 inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">Back to Home</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[500px_1fr] gap-6 lg:gap-8 xl:gap-12">
                    <div className="lg:sticky lg:top-12 lg:self-start">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={movie.poster}
                                alt={movie.name}
                                className="w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="space-y-4">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                                {movie.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-300">{movie.releaseYear}</span>
                                </div>
                                <div className="px-3 py-1.5 bg-slate-800 rounded-lg">
                                    <span className="text-gray-300 capitalize">{formatGenres(movie.genre)}</span>
                                </div>
                            </div>

                            <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                                {movie.description}
                            </p>
                        </div>

                        <div className="bg-slate-900/50 rounded-2xl p-4 sm:p-6 border border-slate-800">
                            <ReviewGauge reviewData={reviewData} />
                        </div>

                        <div className="bg-slate-900/50 rounded-2xl p-4 sm:p-6 border border-slate-800">
                            <ReviewForm
                                movieId={movie.id}
                                onReviewAdded={handleReviewAdded}
                            />
                        </div>

                        <div className="bg-slate-900/50 rounded-2xl p-4 sm:p-6 border border-slate-800">
                            <ReviewList
                                movieId={movie.id}
                                movieType={movie.type}
                                onReviewsLoad={handleReviewsLoad}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}