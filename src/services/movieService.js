import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from "../constants/apiConfig";

export const getAllMoviesWithAPI = async () => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}${API_ENDPOINTS.MOVIE.GET_ALL}`
        );

        return {
            success: response.data.success,
            movies: response.data.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to fetch movies"
        };
    }
};

export const getMovieByIdWithAPI = async (id) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}${API_ENDPOINTS.MOVIE.GET_BY_ID.replace(':id', id)}`
        );

        return {
            success: response.data.success,
            movie: response.data.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to fetch movie"
        };
    }
};

export const createMovieWithAPI = async (movieData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}${API_ENDPOINTS.MOVIE.CREATE}`,
            movieData
        );

        return {
            success: response.data.success,
            message: response.data.message,
            movie: response.data.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to create movie"
        };
    }
};

export const updateMovieWithAPI = async (id, movieData) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}${API_ENDPOINTS.MOVIE.UPDATE.replace(':id', id)}`,
            movieData
        );

        return {
            success: response.data.success,
            message: response.data.message,
            movie: response.data.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to update movie"
        };
    }
};

export const deleteMovieWithAPI = async (id) => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}${API_ENDPOINTS.MOVIE.DELETE.replace(':id', id)}`
        );
        console.log('response: ', response);


        return {
            success: true,
            message: "Movie deleted successfully"
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to delete movie"
        };
    }
};

export const searchMoviesWithAPI = async (query) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}${API_ENDPOINTS.MOVIE.SEARCH}?query=${query}`
        );

        return {
            success: response.data.success,
            movies: response.data.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to search movies"
        };
    }
};