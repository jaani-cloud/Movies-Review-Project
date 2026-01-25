import { useState } from "react";
import { movies } from "../../data/Movies";
import { DessertIcon, Search } from "lucide-react";
import AddMovieForm from "./AddMovieForm";
import GenreCheckboxes from "../common/GenreCheckboxes";
import CategoryCheckboxes from "../common/CategoryCheckboxes";

export default function ManageMovies() {
    const [movieList, setMovieList] = useState(() => {
        const saved = localStorage.getItem("movies");
        return saved ? JSON.parse(saved) : movies;
    })
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

    const handleSave = () => {
        const updatedList = movieList.map(m => m.id === editingMovie.id ? editingMovie : m)

        setMovieList(updatedList)
        localStorage.setItem("movies", JSON.stringify(updatedList))
        setEditingMovie(null)
        alert("Movie updated successfully")
    }

    const handleAddMovie = (newMovie) => {
        const movieWithId = { ...newMovie, id: Date.now }

        const updatedList = [...movieList, movieWithId]
        setMovieList(updatedList)
        localStorage.setItem("movies", JSON.stringify(updatedList))
        setIsAdding(false)
        alert("Movie added successfully")
    }



    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Manage Movies</h2>
                <button
                    onClick={() => setIsAdding(true)}
                    className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                >
                    + Add New Movie
                </button>
            </div>

            {isAdding && <AddMovieForm onClose={() => setIsAdding(false)} onAdd={handleAddMovie} />}

            <div className="relative w-full mb-6">
                <Search className="absolute w-5 h-5 -translate-y-1/2 pointer-events-none left-3 top-1/2 text-slate-400" />
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
                    <div key={movie.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800">

                        {editingMovie && editingMovie.id === movie.id ? (
                            <div className="flex flex-col gap-2">
                                <input type="text" placeholder="Movie Name"
                                    value={editingMovie.name}
                                    onChange={(e) => setEditingMovie({ ...editingMovie, name: e.target.value })}
                                    className="pl-2" />

                                <input type="text" placeholder="Poster URL" value={editingMovie.poster} onChange={(e) => setEditingMovie({ ...editingMovie, poster: e.target.value })} />
                                <div className="space-x-4">
                                    <label htmlFor="movie" className="font-bold hover:cursor-pointer hover:text-blue-600">
                                        <input id="movie" type="radio" name="type" value="movie" className="w-4 h-4 mr-1 border-2 rounded-full appearance-none border-slate-500 bg-slate-800 checked:bg-red-600 checked:border-3"
                                            checked={editingMovie.type === "movie"}
                                            onChange={(e) => setEditingMovie({ ...editingMovie, type: e.target.value })} />
                                        Movie
                                    </label>
                                    <label htmlFor="webseries" className="font-bold hover:cursor-pointer hover:text-blue-600">
                                        <input id="webseries" type="radio" name="type" value="webseries" className="w-4 h-4 mr-1 border-2 rounded-full appearance-none border-slate-500 bg-slate-800 checked:bg-red-600 checked:border-3"
                                            checked={editingMovie.type === "webseries"}
                                            onChange={(e) => setEditingMovie({ ...editingMovie, type: e.target.value })} />
                                        Web Series
                                    </label>
                                </div>
                                <textarea name="" id="" placeholder="Description" value={editingMovie.description} onChange={(e) => setEditingMovie({ ...editingMovie, description: e.target.value })}></textarea>

                                <div className="mt-4">
                                    <GenreCheckboxes selectedGenres={editingMovie.genre}
                                        onChange={(newGenres) => setEditingMovie({ ...editingMovie, genre: newGenres })}
                                    />
                                </div>

                                <div className="mt-4">
                                    <CategoryCheckboxes selectedCategories={editingMovie.category}
                                        onChange={(newCategories) => setEditingMovie({ ...editingMovie, category: newCategories })} />
                                </div>

                                <p className="mt-4">Release Year</p>
                                <input type="number" placeholder="Release Year"
                                    value={editingMovie.releaseYear}
                                    onChange={(e) => setEditingMovie({ ...editingMovie, releaseYear: +(e.target.value) })}
                                    className="pl-2" />

                                <div className="space-x-4">
                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={() => setEditingMovie(null)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <img src={movie.poster} alt={movie.name} className="object-cover w-16 h-24 rounded" />
                                <div className="flex flex-col self-start">
                                    <h3 className="text-lg font-bold">{movie.name}</h3>
                                    <p className="text-sm text-slate-400">{movie.releaseYear}</p>
                                    <div>
                                        <button
                                            onClick={() => setEditingMovie(movie)}
                                            className="py-1 text-blue-400 hover:text-blue-300">
                                            Edit
                                        </button>
                                        <button
                                            className="px-3 py-1 text-red-400 hover:text-red-300"
                                            onClick={() => handleDelete(movie.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}