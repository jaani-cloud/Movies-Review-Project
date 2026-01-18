import { useState } from "react";
import { movies } from "../../data/Movies";
import { Search } from "lucide-react";

export default function ManageMovies() {
    const [movieList, setMovieList] = useState(movies)
    const [isAdding, setIsAdding] = useState(false)
    const [adminSearch, setAdminSearch] = useState("")

    const [editingMovie, setEditingMovie] = useState(null)


    const filteredMovies = movieList.filter(movie =>
        movie.name.toLowerCase().includes(adminSearch.toLowerCase().trim())
    );

    const handleDelete = (movieId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
        if (!confirmDelete) return;

        const updatedList = movieList.filter(m => m.id !== movieId);
        setMovieList(updatedList);
        alert("Movie deleted successfully!");
    };

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Movies</h2>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    + Add New Movie
                </button>
            </div>

            <div className="relative w-full mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/70 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all hover:border-slate-500"
                />
            </div>
            <div className="space-y-4">
                {filteredMovies.map(movie => (
                    <div key={movie.id} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center">

                        {editingMovie && editingMovie.id === movie.id ? ("trueh") : ("false h")}
                        <div className="flex gap-4 items-center">
                            <img src={movie.poster} alt={movie.name} className="w-16 h-24 object-cover rounded" />
                            <div>
                                <h3 className="text-lg font-bold">{movie.name}</h3>
                                <p className="text-slate-400 text-sm">{movie.releaseYear}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditingMovie(movie)}
                                className="text-blue-400 hover:text-blue-300 px-3 py-1">
                                Edit
                            </button>
                            <button className="text-red-400 hover:text-red-300 px-3 py-1" onClick={() => handleDelete(movie.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}