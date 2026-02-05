import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from "../constants/apiConfig";

export const createReviewWithAPI = async (reviewData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}${API_ENDPOINTS.REVIEW.CREATE}`,
            reviewData
        );

        return {
            success: response.data.success,
            message: response.data.message,
            review: response.data.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to create review"
        };
    }
};

export const getReviewsByMovieWithAPI = async (movieId) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}${API_ENDPOINTS.REVIEW.GET_BY_MOVIE.replace(':movieId', movieId)}`
        );

        return {
            success: response.data.success,
            reviews: response.data.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to fetch reviews"
        };
    }
};

export const updateReviewWithAPI = async (reviewId, reviewData) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}${API_ENDPOINTS.REVIEW.UPDATE.replace(':id', reviewId)}`,
            reviewData
        );

        return {
            success: response.data.success,
            message: response.data.message,
            review: response.data.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to update review"
        };
    }
};

export const deleteReviewWithAPI = async (reviewId) => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}${API_ENDPOINTS.REVIEW.DELETE.replace(':id', reviewId)}`
        );

        return {
            success: true,
            message: "Review deleted successfully"
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to delete review"
        };
    }
};

//-----------------------------

export const getReviews = (movieId) => {
    const reviews = localStorage.getItem(`reviews_${movieId}`);
    return reviews ? JSON.parse(reviews) : [];
};

export const addReview = (movieId, review) => {
    const reviews = getReviews(movieId);
    const newReview = {
        id: Date.now(),
        movieId,
        ...review,
        createdAt: new Date().toISOString()
    };
    reviews.push(newReview);
    localStorage.setItem(`reviews_${movieId}`, JSON.stringify(reviews));
    return newReview;
};

export const deleteReview = (movieId, reviewId) => {
    const reviews = getReviews(movieId);
    const filtered = reviews.filter(r => r.id !== reviewId);
    localStorage.setItem(`reviews_${movieId}`, JSON.stringify(filtered));
};

export const updateReview = (movieId, reviewId, updatedData) => {
    const reviews = getReviews(movieId);
    const updated = reviews.map(r =>
        r.id === reviewId ? { ...r, ...updatedData, updatedAt: new Date().toISOString() } : r
    );
    localStorage.setItem(`reviews_${movieId}`, JSON.stringify(updated));
};

export const getUserReviewsWithAPI = async (userId) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}${API_ENDPOINTS.REVIEW.GET_BY_USER.replace(':userId', userId)}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching user reviews:", error);
        return {
            success: false,
            error: error.response?.data?.message || "Failed to fetch user reviews",
        };
    }
};
