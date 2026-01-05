// Local storage...
export const getAllMovies = () => {
    const movies = localStorage.getItem('movies');
    return movies ? JSON.parse(movies) : [];
};

export const getMovieById = (id) => {
    const movies = getAllMovies();
    return movies.find(movie => movie.id === parseInt(id));
};

export const saveMovies = (movies) => {
    localStorage.setItem('movies', JSON.stringify(movies));
};

// API

//----------------------------------------------- npm install axios
// import axios from 'axios';
// const API_URL = "";

// export const getAllMovies = async () => {
//     const response = await axios.get(API_URL);
//     return response.data;
// };

// export const getMovieById = async (id) => {
//     const response = await axios.get(`${API_URL}/${id}`);
//     return response.data;
// };