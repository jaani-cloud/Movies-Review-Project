import { useEffect, useState } from "react"
import { getReviews } from "../../services/reviewService"
import { movies } from "../../data/Movies"
import { Link } from "react-router-dom";


export default function UserReviews({ userId }) {
    const [userReviews, setUserReviews] = useState([])


    const getTypeColor = (type) => {
        switch (type) {
            case "Skip": return "bg-red-600";
            case "Time Pass": return "bg-yellow-600";
            case "Go For It": return "bg-green-600";
            default: return "bg-slate-600";
        }
    };

    useEffect(() => {
        const allReviews = [];
        movies.forEach(movie => {
            const movieReviews = getReviews(movie.id)
            movieReviews.forEach(review => {
                if (review.userId === userId) {
                    allReviews.push({
                        ...review,
                        movieName: movie.name,
                        movieId: movie.id
                    })
                }
            })
        })
        setUserReviews(allReviews)
    }, [userId])

    return (
        <div className="flex flex-col gap-4 mt-8">
            {userReviews.map(review => {
                const movie = movies.find(m => m.id === review.movieId);
                return (
                    <Link to={`/movie/${review.movieId}`} key={review.id}>
                        <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-slate-700 transition-all">
                            <div className="flex gap-4 p-4">
                                {/* Movie Poster */}
                                <img
                                    src={movie.poster}
                                    alt=""
                                    className="w-24 h-36 object-cover rounded-lg"
                                />

                                {/* Review Content */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {review.movieName}
                                    </h3>

                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getTypeColor(review.type)}`}>
                                            {review.type}
                                        </span>
                                        <span className="text-slate-500 text-sm">
                                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    {review.comment && (
                                        <p className="text-slate-300 leading-relaxed">
                                            {review.comment}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    )
};
