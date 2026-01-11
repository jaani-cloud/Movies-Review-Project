import { useParams } from "react-router-dom";
import { movies } from "../data/Movies";

import ReviewGauge from "../components/movie/ReviewGauge"
import { formatGenres } from "../utils/formatters";
import ReviewForm from "../components/movie/ReviewForm"

import ReviewList from "../components/movie/ReviewList";

import { getReviews } from "../services/reviewService";

import { useEffect, useState } from 'react'

export default function MovieDetail() {
    const { id } = useParams();
    const movie = movies.find((m) => m.id === parseInt(id));

    const [refreshTrigger, setRefreshTrigger] = useState(0)

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const movieReviews = getReviews(parseInt(id))
        setReviews(movieReviews)
    }, [id, refreshTrigger])

    const reviewCounts = {
        skip: reviews.filter(r => r.type === "Skip").length,
        timePass: reviews.filter(r => r.type === "Time Pass").length,
        goForIt: reviews.filter(r => r.type === "Go For It").length,
    }

    const reviewData = [
        { label: "Skip", value: reviewCounts.skip, color: "red" },
        { label: "Timepass", value: reviewCounts.timePass, color: "yellow" },
        { label: "Go for it", value: reviewCounts.goForIt, color: "green" }
    ];

    const handleReviewAdded = () => {
        setRefreshTrigger(prev => prev + 1)
    }

    // const reviewData = [
    //     { label: "Skip", value: 16, color: "red" },
    //     { label: "Timepass", value: 46, color: "yellow" },
    //     { label: "Go for it", value: 88, color: "green" }
    // ];

    return (
        <div className="min-h-screen p-8 text-white bg-black">
            <div className="flex gap-8">

                <div className="w-[800px] sticky top-8 self-start">
                    <img src={movie.poster} alt=""
                        className="w-full rounded-lg shadow-2xl"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="mb-4 text-5xl font-bold">{movie.name}</h1>
                    <p className="mb-2 text-lg text-slate-400">{movie.releaseYear}</p>
                    <p className="mb-4 capitalize text-slate-500">{formatGenres(movie.genre)}</p>
                    <p className="text-lg leading-relaxed text-slate-300">{movie.description}</p>

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