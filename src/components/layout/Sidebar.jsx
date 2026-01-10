import { Flame } from "lucide-react";

export default function Sidebar({ movies }) {
    const topRatedMovies = movies.slice(0, 10);

    return (
        <aside className="w-80 bg-slate-900 p-4 rounded-lg fixed right-4 top-24 h-[calc(100vh-6rem)] flex flex-col">

            <h2 className="Home-h1 mb-4">
                <Flame /> Most Interested
            </h2>

            <div className="overflow-y-auto flex-1 Sidebar-scroll flex flex-col gap-3">
                {topRatedMovies.map((movie) => (
                    <div key={movie.id} className="Sidebar">
                        <img
                            src={movie.poster}
                            alt={movie.name}
                            className="w-20 h-28 object-cover rounded-lg"
                        />
                        <div className="flex flex-col justify-center gap-1">
                            <p className="text-white font-semibold text-base">{movie.name}</p>
                            <p className="text-slate-400 text-sm">{movie.releaseYear}</p>
                            <p className="text-slate-500 text-xs capitalize">{movie.genre.join(", ")}</p>
                        </div>
                    </div>
                ))}
            </div>

        </aside>
    )
}