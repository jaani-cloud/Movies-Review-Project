import { checkData } from "../data/Users";

export const login = (email, password) => {
    const user = checkData(email, password);
    if (user) {

        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
    }
    return { success: false, error: "Invalid email or password" };
};

export const logout = () => {
    localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
    return getCurrentUser() !== null;
};

// -------------------------------------API----------------


// import axios from 'axios';
// const API_URL = '';

// export const login = async (email, password) => {
//     const response = await axios.post(`${API_URL}/login`, { email, password });
//     if (response.data.success) {
//         localStorage.setItem('currentUser', JSON.stringify(response.data.user));
//     }
//     return response.data;
// };

// export const logout = async () => {
//     await axios.post(`${API_URL}/logout`);
//     localStorage.removeItem('currentUser');
// };