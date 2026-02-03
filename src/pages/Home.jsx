import { Film } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getAllMoviesWithAPI } from "../services/movieService";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import MovieCard from "../components/movie/MovieCard";
import Button from "../components/common/Button";
import { CATEGORIES } from "../constants/categories";
import { useMovieFilter } from "../hooks/useMovieFilter";
import { useSearch } from "../hooks/useSearch";

export default function Home() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['movies'],
        queryFn: async () => {
            const result = await getAllMoviesWithAPI();
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.movies;
        },
    });

    const movies = data || [];

    const { selectedCategory, setSelectedCategory, filteredMovies: categoryFiltered } = useMovieFilter(movies);
    const { searchQuery, setSearchQuery, filteredItems } = useSearch(categoryFiltered);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Film className="w-16 h-16 text-red-600 animate-pulse mx-auto mb-4" />
                    <p className="text-white text-xl">Loading movies...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-xl mb-4">⚠️ {error.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">

            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <main className="pt-16 sm:pt-20">
                <div className="sm:flex sm:gap-4">

                    <div className="sm:flex-1 lg:mr-[21rem]">

                        <div className="flex flex-wrap sm:gap-3 sm:p-4 gap-2 p-2">
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

                        <div className="p-2 sm:p-4">
                            <h2 className="Home-h1"><Film /> Explore</h2>

                            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6">
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