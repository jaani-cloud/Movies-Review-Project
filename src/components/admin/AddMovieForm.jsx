import { useState } from 'react'
import GenreCheckboxes from '../common/GenreCheckboxes';
import CategoryCheckboxes from '../common/CategoryCheckboxes';

export default function AddMovieForm({ onClose, onAdd }) {
    const [newMovie, setNewMovie] = useState({
        name: '',
        poster: '',
        description: '',
        releaseYear: '',
        type: '',
        category: [],
        genre: []
    });


    return (
        <div className="ctm-add-form-container">
            <div className="ctm-add-form-body">
                <div className="ctm-input-group">
                    <label className="ctm-input-label">
                        <span className="ctm-label-icon">🎬</span>
                        Movie Title
                    </label>
                    <input
                        value={newMovie.name}
                        onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
                        type="text"
                        placeholder="Enter movie title"
                        className="ctm-text-input"
                    />
                </div>

                <div className="ctm-input-group">
                    <label className="ctm-input-label">
                        <span className="ctm-label-icon">🖼️</span>
                        Poster URL
                    </label>
                    <input
                        value={newMovie.poster}
                        onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })}
                        type="text"
                        placeholder="https//link"
                        className="ctm-text-input"
                    />
                </div>

                {/* Description */}
                <div className="ctm-input-group">
                    <label className="ctm-input-label">
                        <span className="ctm-label-icon">📝</span>
                        Description
                    </label>
                    <textarea
                        value={newMovie.description}
                        onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                        placeholder="Enter movie description..."
                        className="ctm-textarea-input"
                        rows="4"
                    ></textarea>
                </div>

                {/* Release Year */}
                <div className="ctm-input-group">
                    <label className="ctm-input-label">
                        <span className="ctm-label-icon">📅</span>
                        Release Year
                    </label>
                    <input
                        value={newMovie.releaseYear || ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || (value.length <= 4)) {
                                setNewMovie({ ...newMovie, releaseYear: value === "" ? "" : +(value) })
                            }
                        }}
                        type="number"
                        placeholder="2024"
                        className="ctm-text-input"
                    />
                </div>

                {/* Type Selection */}
                <div className="ctm-input-group">
                    <label className="ctm-input-label">
                        <span className="ctm-label-icon">🎭</span>
                        Type
                    </label>
                    <div className="ctm-type-radio-group">
                        <label className="ctm-type-radio-label">
                            <input
                                type="radio"
                                name='type'
                                value="movie"
                                id='movie'
                                checked={newMovie.type === "movie"}
                                onChange={(e) => setNewMovie({ ...newMovie, type: e.target.value })}
                                className="ctm-type-radio-input"
                            />
                            <span className="ctm-type-radio-text">🎬 Movie</span>
                        </label>

                        <label className="ctm-type-radio-label">
                            <input
                                type="radio"
                                name='type'
                                value="webseries"
                                id='webseries'
                                checked={newMovie.type === "webseries"}
                                onChange={(e) => setNewMovie({ ...newMovie, type: e.target.value })}
                                className="ctm-type-radio-input"
                            />
                            <span className="ctm-type-radio-text">📺 Web Series</span>
                        </label>
                    </div>
                </div>

                {/* Genres */}
                <div className="ctm-input-group">
                    <label className="ctm-input-label">
                        <span className="ctm-label-icon">🎪</span>
                        Genres
                    </label>
                    <GenreCheckboxes
                        selectedGenres={newMovie.genre}
                        onChange={(newGenres) => setNewMovie({ ...newMovie, genre: newGenres })}
                    />
                </div>

                {/* Categories */}
                <div className="ctm-input-group">
                    <label className="ctm-input-label">
                        <span className="ctm-label-icon">📂</span>
                        Categories
                    </label>
                    <CategoryCheckboxes
                        selectedCategories={newMovie.category}
                        onChange={(newCategories) => setNewMovie({ ...newMovie, category: newCategories })}
                    />
                </div>

                {/* Action Buttons */}
                <div className="ctm-add-form-actions">
                    <button
                        onClick={() => {
                            if (!newMovie.name || !newMovie.poster) {
                                alert("Please fill Movie Title and Poster URL")
                                return
                            }
                            onAdd(newMovie)
                        }}
                        className="ctm-submit-btn"
                    >
                        <span className="ctm-submit-icon">✨</span>
                        <span>Add Movie</span>
                    </button>
                    <button onClick={onClose} className="ctm-cancel-form-btn">
                        <span>✖</span>
                        <span>Cancel</span>
                    </button>
                </div>
            </div>
        </div>
    )
}