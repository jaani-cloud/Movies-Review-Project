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

// -----------------------------------------------API

// import axios from 'axios';
// const API_URL = 'https://your-api.com/api/reviews';

// export const getReviews = async (movieId) => {
//     const response = await axios.get(`${API_URL}?movieId=${movieId}`);
//     return response.data;
// };

// export const addReview = async (movieId, review) => {
//     const response = await axios.post(API_URL, { movieId, ...review });
//     return response.data;
// };

// export const deleteReview = async (movieId, reviewId) => {
//     await axios.delete(`${API_URL}/${reviewId}`);
// };