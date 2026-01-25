export const API_BASE_URL = 'https://apistudent2.codedonor.in/api';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/Auth/login',
        REGISTER: '/Auth/register',
        PROFILE: '/Auth/profile'
    },
    MOVIES: {
        GET_ALL: '/Movies',
        GET_BY_ID: '/Movies/:id',
        CREATE: '/Movies',
        UPDATE: '/Movies/:id',
        DELETE: '/Movies/:id'
    },
    REVIEWS: {
        GET_BY_MOVIE: '/Reviews/movie/:id',
        CREATE: '/Reviews',
        UPDATE: '/Reviews/:id',
        DELETE: '/Reviews/:id'
    }
};