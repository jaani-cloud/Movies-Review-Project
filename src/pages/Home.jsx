import { Film, Sparkles, TrendingUp } from "lucide-react";
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
import HomePageSkeleton from "../components/Skeleton/HomePageSkeleton";

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

    // Show combined skeleton with loading spinner overlay
    if (isLoading) {
        return <HomePageSkeleton />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="mb-6">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-900/20 flex items-center justify-center">
                            <Film className="w-10 h-10 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
                        <p className="text-red-400 text-lg mb-6">{error.message}</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all font-medium shadow-lg shadow-red-500/20"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black">
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <main className="pt-16 sm:pt-20">
                <div className="sm:flex sm:gap-6 lg:gap-8">
                    <div className="sm:flex-1 lg:mr-[21rem]">

                        <div className="sticky top-16 sm:top-20 z-10 bg-gradient-to-b from-black via-black/95 to-transparent pb-4 backdrop-blur-sm">
                            <div className="flex flex-wrap gap-2 sm:gap-3 p-3 sm:p-4">
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
                        </div>

                        <div className="px-3 sm:px-4 pb-8">
                            <div className="mb-6 sm:mb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2">
                                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                        {selectedCategory === "All" ? "Explore" : selectedCategory}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <TrendingUp className="w-4 h-4" />
                                    <p>{filteredItems.length} {filteredItems.length === 1 ? 'match' : 'matches'} found</p>
                                </div>
                            </div>

                            {filteredItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 px-4">
                                    <div className="w-24 h-24 mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
                                        <Film className="w-12 h-12 text-gray-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">No match found</h3>
                                    <p className="text-gray-400 text-center max-w-md">
                                        {searchQuery
                                            ? `No results for "${searchQuery}". Try different keywords.`
                                            : "Try selecting a different category or check back later."}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6">
                                    {filteredItems.map((movie, index) => (
                                        <Link
                                            to={`/movie/${movie.id}`}
                                            key={movie.id}
                                            className="group"
                                            style={{
                                                animationDelay: `${index * 50}ms`,
                                                animation: 'fadeInUp 0.5s ease-out forwards',
                                                opacity: 0
                                            }}
                                        >
                                            <MovieCard movie={movie} />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <Sidebar movies={movies} />
                </div>
            </main>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}