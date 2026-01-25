import { checkData } from "../data/Users";
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from "../constants/apiConfig";
import {jwtDecode} from "jwt-decode"


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
    const token = localStorage.getItem("authToken")
    const currentUser = localStorage.getItem("currentUser")

    if (!token || !currentUser) return null

    return JSON.parse(currentUser)
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
            const token = response.data.token
            const decoded = jwtDecode(token)
            const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]

            const userResponse = await axios.get(`${API_BASE_URL}/User/${userId}`)
            const userData = {...userResponse.data, role: response.data.role}

            localStorage.setItem("authToken", token)
            localStorage.setItem("userRole", response.data.role)
            localStorage.setItem("currentUser", JSON.stringify(userData))

            return {
                success: true,
                token: token,
                role: response.data.role,
                user: userData
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
