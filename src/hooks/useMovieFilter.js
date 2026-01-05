import { useState, useMemo } from "react";

export function useMovieFilter(movies, initialCategory = "All") {
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const filteredMovies = useMemo(() => {
        if (selectedCategory === "All") {
            return movies;
        }
        return movies.filter((movie) =>
            movie.category.includes(selectedCategory)
        );
    }, [movies, selectedCategory]);

    return {
        selectedCategory,
        setSelectedCategory,
        filteredMovies
    }
}