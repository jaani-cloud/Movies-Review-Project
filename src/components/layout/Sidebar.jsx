import { Flame, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getMovieAverageRating } from "../../utils/calculateRating";
import { formatGenres } from "../../utils/formatters";

export default function Sidebar({ movies }) {
    const topRatedMovies = [...movies]
        .map(movie => ({
            ...movie,
            avgRating: getMovieAverageRating(movie.id)
        }))
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 10);

    return (
        <aside className="hidden w-80 bg-gradient-to-b from-slate-900 to-slate-800 p-4 rounded-2xl fixed right-4 top-24 h-[calc(100vh-6rem)] lg:flex flex-col border border-slate-700 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
                <div className="p-2 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg">
                    <Flame className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Most Interested</h2>
            </div>

            <div className="flex flex-col flex-1 gap-3 overflow-y-auto Sidebar-scroll pr-2">
                {topRatedMovies.map((movie, index) => (
                    <Link
                        to={`/movie/${movie.id}`}
                        key={movie.id}
                        className="group flex gap-3 p-2 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-transparent hover:border-slate-600"
                    >
                        <div className="relative flex-shrink-0">
                            <img
                                src={movie.poster}
                                alt={movie.name}
                                className="object-cover w-16 h-24 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                            />
                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                {index + 1}
                            </div>
                        </div>

                        <div className="flex flex-col justify-center gap-1 flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white line-clamp-2 group-hover:text-red-400 transition-colors">
                                {movie.name}
                            </p>
                            <p className="text-xs text-slate-400">{movie.releaseYear}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">
                                {formatGenres(movie.genre)}
                            </p>
                            {movie.avgRating > 0 && (
                                <div className="flex items-center gap-1 mt-0.5">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    <span className="text-xs font-medium text-yellow-500">
                                        {movie.avgRating.toFixed(1)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </aside>
    );
}