import { Flame } from "lucide-react";
import { Link } from "react-router-dom"
import { getMovieAverageRating } from "../../utils/calculateRating"

export default function Sidebar({ movies }) {
    // const topRatedMovies = movies.slice(0, 10);

    const topRatedMovies = [...movies].map(movie => ({
        ...movie, avgRating: getMovieAverageRating(movie.id)
    })).sort((a, b) => b.avgRating - a.avgRating).slice(0, 10);

    return (
        <aside className="hidden w-80 bg-slate-900 p-4 rounded-lg fixed right-4 top-24 h-[calc(100vh-6rem)] lg:flex flex-col">

            <h2 className="mb-4 Home-h1">
                <Flame /> Most Interested
            </h2>

            <div className="flex flex-col flex-1 gap-3 overflow-y-auto Sidebar-scroll">
                {topRatedMovies.map((movie) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id} className="Sidebar">
                        <img
                            src={movie.poster}
                            alt={movie.name}
                            className="object-cover w-20 rounded-lg h-28"
                        />
                        <div className="flex flex-col justify-center gap-1">
                            <p className="text-base font-semibold text-white">{movie.name}</p>
                            <p className="text-sm text-slate-400">{movie.releaseYear}</p>
                            <p className="text-xs capitalize text-slate-500">{movie.genre.join(", ")}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </aside>
    )
}