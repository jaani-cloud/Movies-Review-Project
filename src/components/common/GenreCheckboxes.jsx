import { GENRES } from "../../constants/genre";

export default function GenreCheckboxes({ selectedGenres, onChange }) {
    return (
        <div>
            <p>Genre:</p>
            <div className="grid grid-cols-3 gap-2">
                {GENRES.map(genre => (
                    <label key={genre} className="ctm-genre-label">
                        <input
                            type="checkbox"
                            className="ctm-genre-input"
                            value={genre}
                            checked={selectedGenres.includes(genre)}
                            onChange={(e) => {
                                const newGenres = e.target.checked
                                ? [...selectedGenres, genre]
                                : selectedGenres.filter(g => g !== genre)
                                onChange(newGenres)
                            }}
                        />
                        {genre}

                    </label>

                ))}
            </div>
        </div>
    )
}
