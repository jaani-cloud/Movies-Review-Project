import { useState } from "react";
import { Film } from "lucide-react";
import { Link } from "react-router-dom";
import { movies } from "../data/Movies";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import MovieCard from "../components/movie/MovieCard";
import Button from "../components/common/Button";
import { CATEGORIES } from "../constants/categories";
import { useMovieFilter } from "../hooks/useMovieFilter";
import { useSearch } from "../hooks/useSearch";

export default function Home() {
    const { selectedCategory, setSelectedCategory, filteredMovies: categoryFiltered } = useMovieFilter(movies);
    const { searchQuery, setSearchQuery, filteredItems } = useSearch(categoryFiltered);





    return (
        <div className="min-h-screen bg-black">

            {/* nav area */}

            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* main area */}

            <main className="pt-20">

                <div className="flex gap-4">

                    {/* home btn area */}

                    <div className="flex-1 mr-[21rem]">


                        <div className="flex gap-3 p-4 flex-wrap">
                            {CATEGORIES.map((category) => (
                                <Button
                                    key={category}
                                    isActive={selectedCategory === category}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>

                        {/* home explore area */}

                        <div className="p-4">
                            <h2 className="home-h1"><Film /> Explore</h2>

                            {/* movie grid area */}

                            <div className="grid grid-cols-6 gap-4">

                                {filteredItems.map((movie) => (
                                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                                        <MovieCard movie={movie} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Sidebar movies={movies} />
                </div>
            </main>
        </div>
    );
}