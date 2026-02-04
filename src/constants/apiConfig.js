export const API_BASE_URL = 'https://localhost:7065/api';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        VERIFY_EMAIL: '/auth/verify-email',
        RESEND_CODE: '/auth/resend-code',
        FORGOT_PASSWORD: '/auth/forgot-password',
        VERIFY_RESET_CODE: '/auth/verify-reset-code',
        RESET_PASSWORD: '/auth/reset-password'
    },
    USER: {
        PROFILE: '/user/profile',
        CHANGE_PASSWORD: '/user/change-password'
    },
    MOVIE: {
        GET_ALL: '/movie',
        GET_BY_ID: '/movie/:id',
        CREATE: '/movie',
        UPDATE: '/movie/:id',
        DELETE: '/movie/:id',
        SEARCH: '/movie/search'
    },
    REVIEW: {
        CREATE: '/review',
        GET_BY_MOVIE: '/review/movie/:movieId',
        GET_BY_USER: '/review/user/:userId',
        GET_ALL: '/review',
        UPDATE: '/review/:id',
        DELETE: '/review/:id'
    }
};

export const IMAGES = {
    EMAIL_VERIFIED: "https://qsmlfrkyexsywvfizqli.supabase.co/storage/v1/object/sign/Email%20Verified%20Popup%20Image/register-otp-verifying1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NWNkMjE3Ny1mNDYzLTRjMWMtOGMzYi1lNTlkZTcyNjljNGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJFbWFpbCBWZXJpZmllZCBQb3B1cCBJbWFnZS9yZWdpc3Rlci1vdHAtdmVyaWZ5aW5nMS5wbmciLCJpYXQiOjE3Njk2MzE4NjAsImV4cCI6NDkyMzIzMTg2MH0.aJlNZak_jJluMuUvFSy7mMyu6umJyke7bFVLbNQN8yY"
};