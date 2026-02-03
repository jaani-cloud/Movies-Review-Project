import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMovieByIdWithAPI } from "../services/movieService";

import ReviewGauge from "../components/movie/ReviewGauge";
import { formatGenres } from "../utils/formatters";
import ReviewForm from "../components/movie/ReviewForm";
import ReviewList from "../components/movie/ReviewList";
import { getReviews } from "../services/reviewService";
import { useEffect, useState } from 'react';

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [reviews, setReviews] = useState([]);

    // React Query se movie fetch
    const { data: movie, isLoading, error } = useQuery({
        queryKey: ['movie', id],
        queryFn: async () => {
            // Pehle cache check karo
            const cachedMovies = queryClient.getQueryData(['movies']);

            if (cachedMovies) {
                const foundMovie = cachedMovies.find(m => m.id === parseInt(id));
                if (foundMovie) {
                    return foundMovie; // Cache se return
                }
            }

            // Cache me nahi mili, API call
            const result = await getMovieByIdWithAPI(id);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.movie;
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    useEffect(() => {
        if (movie) {
            const movieReviews = getReviews(parseInt(id));
            setReviews(movieReviews);
        }
    }, [id, refreshTrigger, movie]);

    const handleReviewAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-xl">Loading movie details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !movie) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-xl mb-4">
                        ⚠️ {error?.message || "Movie not found"}
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    // Review counts
    const reviewCounts = {
        skip: reviews.filter(r => r.type === "Skip").length,
        timePass: reviews.filter(r => r.type === "Time Pass").length,
        goForIt: reviews.filter(r => r.type === "Go For It").length,
    };

    const reviewData = [
        { label: "Skip", value: reviewCounts.skip, color: "red" },
        { label: "Timepass", value: reviewCounts.timePass, color: "yellow" },
        { label: "Go for it", value: reviewCounts.goForIt, color: "green" }
    ];

    return (
        <div className="min-h-screen p-8 text-white bg-black">
            <div className="flex gap-8">
                <div className="w-[800px] sticky top-8 self-start">
                    <img
                        src={movie.poster}
                        alt={movie.name}
                        className="w-full rounded-lg shadow-2xl"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="mb-4 text-5xl font-bold">{movie.name}</h1>
                    <p className="mb-2 text-lg text-slate-400">{movie.releaseYear}</p>
                    <p className="mb-4 capitalize text-slate-500">
                        {formatGenres(movie.genre)}
                    </p>
                    <p className="text-lg leading-relaxed text-slate-300">
                        {movie.description}
                    </p>

                    <ReviewGauge reviewData={reviewData} />
                    <ReviewForm
                        movieId={movie.id}
                        onReviewAdded={handleReviewAdded}
                    />
                    <ReviewList
                        movieId={movie.id}
                        key={refreshTrigger}
                    />
                </div>
            </div>
        </div>
    );
}