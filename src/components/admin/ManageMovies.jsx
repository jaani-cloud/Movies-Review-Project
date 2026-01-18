import { useState } from "react";
import { movies } from "../../data/Movies";
import { DessertIcon, Search } from "lucide-react";

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
        alert("Moive updated successfully")
    }
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

                        {editingMovie && editingMovie.id === movie.id ? (
                            <div className="flex flex-col gap-2">
                                <input type="text" placeholder="Movie Name"
                                    value={editingMovie.name}
                                    onChange={(e) => setEditingMovie({ ...editingMovie, name: e.target.value })}
                                    className="pl-2" />

                                <input type="text" placeholder="Poster URL" value={editingMovie.poster} onChange={(e) => setEditingMovie({ ...editingMovie, poster: e.target.value })} />
                                <div className="space-x-4">
                                    <label htmlFor="movie" className="hover:cursor-pointer hover:text-blue-600 font-bold">
                                        <input id="movie" type="radio" name="type" value="movie" className="appearance-none h-4 w-4 border-2 rounded-full border-slate-500 bg-slate-800 checked:bg-red-600 checked:border-3 mr-1"
                                            checked={editingMovie.type === "movie"}
                                            onChange={(e) => setEditingMovie({ ...editingMovie, type: e.target.value })} />
                                        Movie
                                    </label>
                                    <label htmlFor="webseries" className=" hover:cursor-pointer hover:text-blue-600 font-bold">
                                        <input id="webseries" type="radio" name="type" value="webseries" className="appearance-none h-4 w-4 border-2 rounded-full border-slate-500 bg-slate-800 checked:bg-red-600 checked:border-3 mr-1"
                                            checked={editingMovie.type === "webseries"}
                                            onChange={(e) => setEditingMovie({ ...editingMovie, type: e.target.value })} />
                                        Web Series
                                    </label>
                                </div>
                                <textarea name="" id="" placeholder="Description" value={editingMovie.description} onChange={(e) => setEditingMovie({ ...editingMovie, description: e.target.value })}></textarea>
                                <p>Genre:</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="MCU"
                                            checked={editingMovie.genre.includes("MCU")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "MCU"]
                                                    : editingMovie.genre.filter(g => g !== "MCU");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        MCU
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Harry Potter"
                                            checked={editingMovie.genre.includes("Harry Potter")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Harry Potter"]
                                                    : editingMovie.genre.filter(g => g !== "Harry Potter");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Harry Potter</label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Indian Movie"
                                            checked={editingMovie.genre.includes("Indian Movie")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Indian Movie"]
                                                    : editingMovie.genre.filter(g => g !== "Indian Movie");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Indian Movie</label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Action"
                                            checked={editingMovie.genre.includes("Action")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Action"]
                                                    : editingMovie.genre.filter(g => g !== "Action");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Action
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Comedy"
                                            checked={editingMovie.genre.includes("Comedy")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Comedy"]
                                                    : editingMovie.genre.filter(g => g !== "Comedy");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Comedy
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Drama"
                                            checked={editingMovie.genre.includes("Drama")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Drama"]
                                                    : editingMovie.genre.filter(g => g !== "Drama");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Drama
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Sci-Fi"
                                            checked={editingMovie.genre.includes("Sci-Fi")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Sci-Fi"]
                                                    : editingMovie.genre.filter(g => g !== "Sci-Fi");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Sci-Fi</label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Thriller"
                                            checked={editingMovie.genre.includes("Thriller")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Thriller"]
                                                    : editingMovie.genre.filter(g => g !== "Thriller");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Thriller
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Horror"
                                            checked={editingMovie.genre.includes("Horror")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Horror"]
                                                    : editingMovie.genre.filter(g => g !== "Horror");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Horror
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Romance"
                                            checked={editingMovie.genre.includes("Romance")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Romance"]
                                                    : editingMovie.genre.filter(g => g !== "Romance");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Romance
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Crime"
                                            checked={editingMovie.genre.includes("Crime")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Crime"]
                                                    : editingMovie.genre.filter(g => g !== "Crime");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Crime
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Animation"
                                            checked={editingMovie.genre.includes("Animation")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Animation"]
                                                    : editingMovie.genre.filter(g => g !== "Animation");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Animation
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Documentary"
                                            checked={editingMovie.genre.includes("Documentary")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Documentary"]
                                                    : editingMovie.genre.filter(g => g !== "Documentary");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Documentary
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="War"
                                            checked={editingMovie.genre.includes("War")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "War"]
                                                    : editingMovie.genre.filter(g => g !== "War");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        War
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Biography"
                                            checked={editingMovie.genre.includes("Biography")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Biography"]
                                                    : editingMovie.genre.filter(g => g !== "Biography");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Biography
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="History"
                                            checked={editingMovie.genre.includes("History")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "History"]
                                                    : editingMovie.genre.filter(g => g !== "History");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        History
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Sport"
                                            checked={editingMovie.genre.includes("Sport")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Sport"]
                                                    : editingMovie.genre.filter(g => g !== "Sport");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Sport
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Family"
                                            checked={editingMovie.genre.includes("Family")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Family"]
                                                    : editingMovie.genre.filter(g => g !== "Family");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Family
                                    </label>
                                    <label className="ctm-genre-label">
                                        <input
                                            className="ctm-genre-input" type="checkbox" value="Another"
                                            checked={editingMovie.genre.includes("Another")}
                                            onChange={(e) => {
                                                const newGenres = e.target.checked
                                                    ? [...editingMovie.genre, "Another"]
                                                    : editingMovie.genre.filter(g => g !== "Another");
                                                setEditingMovie({ ...editingMovie, genre: newGenres })
                                            }} />
                                        Another
                                    </label>
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
                            <div className="flex gap-4 items-center">
                                <img src={movie.poster} alt={movie.name} className="w-16 h-24 object-cover rounded" />
                                <div className="flex flex-col self-start">
                                    <h3 className="text-lg font-bold">{movie.name}</h3>
                                    <p className="text-slate-400 text-sm">{movie.releaseYear}</p>
                                    <div>
                                        <button
                                            onClick={() => setEditingMovie(movie)}
                                            className="text-blue-400 hover:text-blue-300 py-1">
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-400 hover:text-red-300 px-3 py-1"
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