import { checkData } from "../data/Users";

import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from "../constants/apiConfig";


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

    localStorage.removeItem("authToken")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
};

export const getCurrentUser = () => {
    // const user = localStorage.getItem('currentUser');
    // return user ? JSON.parse(user) : null;
    const token = localStorage.getItem("authToken")
    const role = localStorage.getItem("userRole")
    const email = localStorage.getItem("userEmail")

    if (!token) return null

    return {
        email: email,
        role: role
    }
};


export const isAuthenticated = () => {
    return getCurrentUser() !== null;
};

// -------------------------------------API----------------


export const loginWithAPI = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
            { email, password }
        )
        if (response.data.token) {
            localStorage.setItem("authToken", response.data.token)
            localStorage.setItem("userRole", response.data.role)
            localStorage.setItem("userEmail", email)

            return {
                success: true,
                token: response.data.token,
                role: response.data.role
            }
        }
        return {
            success: false,
            error: "No token received...."
        }
    }
    catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Invalid email or password....."
        }
    }
}
