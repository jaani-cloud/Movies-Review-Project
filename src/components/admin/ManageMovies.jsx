import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AddMovieForm from "./AddMovieForm";
import GenreCheckboxes from "../common/GenreCheckboxes";
import CategoryCheckboxes from "../common/CategoryCheckboxes";
import { getAllMoviesWithAPI, updateMovieWithAPI, deleteMovieWithAPI, createMovieWithAPI } from "../../services/movieService";
// import LoadingSpinner from "../common/LoadingSpinner";
import { toTitleCase } from "../../utils/formatters";
import { showAlert } from "../common/CustomAlert";

export default function ManageMovies() {
    const queryClient = useQueryClient();
    const [isAdding, setIsAdding] = useState(false);
    const [adminSearch, setAdminSearch] = useState("");
    const [editingMovie, setEditingMovie] = useState(null);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const { data: movieList = [], isLoading } = useQuery({
        queryKey: ['movies'],
        queryFn: async () => {
            const result = await getAllMoviesWithAPI();
            if (!result.success) {
                throw new Error(result.error || "Failed to load movies");
            }
            return result.movies;
        },
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (adminSearch.trim() === "") {
            setFilteredMovies(movieList);
            return;
        }

        const searchLower = adminSearch.toLowerCase().trim();

        const filtered = movieList.filter(movie =>
            movie.name.toLowerCase().includes(searchLower)
        );

        setFilteredMovies(filtered);
    }, [adminSearch, movieList]);

    useEffect(() => {
        setFilteredMovies(movieList);
    }, [movieList]);

    const handleDelete = async (movieId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
        if (!confirmDelete) return;

        const result = await deleteMovieWithAPI(movieId);

        if (result.success) {
            queryClient.invalidateQueries(['movies']);
            queryClient.invalidateQueries(['movie', movieId]);
            showAlert("Movie deleted successfully...", "warning");
        } else {
            alert(result.error || "Failed to delete movie...");
        }
    };

    const handleSave = async () => {
        const result = await updateMovieWithAPI(editingMovie.id, editingMovie);

        if (result.success) {
            queryClient.invalidateQueries(['movies']);
            queryClient.invalidateQueries(['movie', editingMovie.id]);
            setEditingMovie(null);
            showAlert("Movie updated successfully...", "info");
        } else {
            showAlert(result.error || "Failed to update movie...", "error");
        }
    };

    const handleAddMovie = async (newMovie) => {
        const result = await createMovieWithAPI(newMovie);

        if (result.success) {
            queryClient.invalidateQueries(['movies']);
            setIsAdding(false);
            showAlert("Movie added successfully!", "success");
        } else {
            alert(result.error || "Failed to add movie");
        }
    };
    // if (isLoading) {
    //     return <LoadingSpinner />;
    // }

    return (
        <div className="ctm-manage-movies">
            <div className="ctm-manage-header">
                <h2 className="ctm-manage-title">
                    <span className="ctm-title-icon">🎬</span>
                    Manage Movies
                </h2>
                <button
                    onClick={() => setIsAdding(true)}
                    className="ctm-add-movie-btn"
                >
                    <span className="ctm-btn-icon">+</span>
                    <span>Add New Movie / Web Series</span>
                </button>
            </div>

            {isAdding && (
                <div className="ctm-form-overlay">
                    <AddMovieForm onClose={() => setIsAdding(false)} onAdd={handleAddMovie} />
                </div>
            )}

            <div className="ctm-search-container">
                <Search className="ctm-search-icon" />
                <input
                    type="text"
                    placeholder="Search movies by name..."
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    className="ctm-search-input"
                />
            </div>

            <div className="ctm-movies-list">
                {filteredMovies.length === 0 ? (
                    <div className="ctm-empty-state">
                        <p className="ctm-empty-icon">🎭</p>
                        <p className="ctm-empty-text">No movies found</p>
                    </div>
                ) : (
                    filteredMovies.map((movie, index) => (
                        <div
                            key={movie.id}
                            className="ctm-movie-item"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {editingMovie && editingMovie.id === movie.id ? (
                                <div className="ctm-edit-form">
                                    <div className="ctm-form-group">
                                        <label className="ctm-form-label">Movie Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter movie name"
                                            value={editingMovie.name}
                                            onChange={(e) => setEditingMovie({ ...editingMovie, name: e.target.value })}
                                            className="ctm-form-input"
                                        />
                                    </div>

                                    <div className="ctm-form-group">
                                        <label className="ctm-form-label">Poster URL</label>
                                        <input
                                            type="text"
                                            placeholder="Enter poster URL"
                                            value={editingMovie.poster}
                                            onChange={(e) => setEditingMovie({ ...editingMovie, poster: e.target.value })}
                                            className="ctm-form-input"
                                        />
                                    </div>

                                    <div className="ctm-form-group">
                                        <label className="ctm-form-label">Type</label>
                                        <div className="ctm-radio-group">
                                            <label className="ctm-radio-label">
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="movie"
                                                    className="ctm-radio-input"
                                                    checked={editingMovie.type === "movie"}
                                                    onChange={(e) => setEditingMovie({ ...editingMovie, type: e.target.value })}
                                                />
                                                <span className="ctm-radio-text">🎬 Movie</span>
                                            </label>
                                            <label className="ctm-radio-label">
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="webseries"
                                                    className="ctm-radio-input"
                                                    checked={editingMovie.type === "webseries"}
                                                    onChange={(e) => setEditingMovie({ ...editingMovie, type: e.target.value })}
                                                />
                                                <span className="ctm-radio-text">📺 Web Series</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="ctm-form-group">
                                        <label className="ctm-form-label">Description</label>
                                        <textarea
                                            placeholder="Enter movie description"
                                            value={editingMovie.description}
                                            onChange={(e) => setEditingMovie({ ...editingMovie, description: e.target.value })}
                                            className="ctm-form-textarea"
                                            rows="4"
                                        ></textarea>
                                    </div>

                                    <div className="ctm-form-group">
                                        <label className="ctm-form-label">Genres</label>
                                        <GenreCheckboxes
                                            selectedGenres={editingMovie.genre}
                                            onChange={(newGenres) => setEditingMovie({ ...editingMovie, genre: newGenres })}
                                        />
                                    </div>

                                    <div className="ctm-form-group">
                                        <label className="ctm-form-label">Categories</label>
                                        <CategoryCheckboxes
                                            selectedCategories={editingMovie.category}
                                            onChange={(newCategories) => setEditingMovie({ ...editingMovie, category: newCategories })}
                                        />
                                    </div>

                                    <div className="ctm-form-group">
                                        <label className="ctm-form-label">Release Year</label>
                                        <input
                                            type="number"
                                            placeholder="2024"
                                            value={editingMovie.releaseYear}
                                            onChange={(e) => setEditingMovie({ ...editingMovie, releaseYear: +(e.target.value) })}
                                            className="ctm-form-input"
                                        />
                                    </div>

                                    <div className="ctm-form-actions">
                                        <button onClick={handleSave} className="ctm-save-btn">
                                            <span>💾</span> Save Changes
                                        </button>
                                        <button onClick={() => setEditingMovie(null)} className="ctm-cancel-btn">
                                            <span>✖</span> Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="ctm-movie-view">
                                    <div className="ctm-movie-poster-wrapper">
                                        <img
                                            src={movie.poster}
                                            alt={movie.name}
                                            className="ctm-movie-poster"
                                        />
                                        <div className="ctm-poster-overlay"></div>
                                    </div>
                                    <div className="ctm-movie-info">
                                        <h3 className="ctm-movie-name">{movie.name}</h3>
                                        <div className="ctm-movie-meta">
                                            <span className="ctm-meta-badge ctm-badge-year">📅 {movie.releaseYear}</span>
                                            <span className="ctm-meta-badge ctm-badge-type">
                                                {(movie.type).toLowerCase() === 'movie' ? '🎬 Movie' : '📺 Series'}
                                            </span>
                                        </div>
                                        <span className="ctm-meta-badge mb-4">
                                            {movie.genre.map(g => toTitleCase(g)).join(" 💠 ")}
                                        </span>
                                        <div className="ctm-movie-actions">
                                            <button
                                                onClick={() => setEditingMovie(movie)}
                                                className="ctm-edit-btn">
                                                <span>✏️</span> Edit
                                            </button>
                                            <button
                                                className="ctm-delete-btn"
                                                onClick={() => handleDelete(movie.id)}>
                                                <span>🗑️</span> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}