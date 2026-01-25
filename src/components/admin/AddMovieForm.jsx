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
        <div>
            <h2>Add New Movie</h2>

            <input value={newMovie.name} onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })} type="text" placeholder="Movie Title" />
            <input value={newMovie.poster} onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })} type="text" placeholder="Poster URL" />
            <textarea value={newMovie.description} onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })} placeholder="Description"></textarea>
            <input value={newMovie.releaseYear} onChange={(e) => {
                const value = e.target.value;
                if (value === "" || (value.length <= 4)) {
                    setNewMovie({ ...newMovie, releaseYear: +(value) })
                }
            }} type="number" placeholder="Release Year" />

            <div>
                <label htmlFor="movie">
                    <input type="radio" name='type' value="movie" id='movie' checked={newMovie.type === "movie"}
                        onChange={(e) => {
                            // console.log(e.target.value)
                            setNewMovie({ ...newMovie, type: e.target.value })
                        }
                        } />
                    Movie
                </label>

                <label htmlFor="webseries">
                    <input type="radio" name='type' value="webseries" id='webseries' checked={newMovie.type === "webseries"}
                        onChange={(e) => {
                            // console.log(e.target.value)
                            setNewMovie({ ...newMovie, type: e.target.value })
                        }
                        } />
                    Web Series
                </label>
            </div>

            <div
                className="mt-4 "
            >
                <GenreCheckboxes selectedGenres={newMovie.genre}
                    onChange={(newGenres) => setNewMovie({ ...newMovie, genre: newGenres })}
                />
            </div>

            <div className='mt-4'>
                <CategoryCheckboxes
                    selectedCategories={newMovie.category}
                    onChange={(newCategories) => setNewMovie({ ...newMovie, category: newCategories })}
                />
            </div>

            <div className='mt-4'>
                <button onClick={()=>{
                    if (!newMovie.name || !newMovie.poster) {
                        alert("Please fill Movie and Poster URL")
                        return
                    }
                    onAdd(newMovie)
                }}>
                    Add Movie</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
}
