import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from "../constants/apiConfig";
import {jwtDecode} from "jwt-decode"
import { toTitleCase } from "../utils/formatters";



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

        if (response.data.success && response.data.token) {
            const token = response.data.token;
            const decoded = jwtDecode(token);

            const userId = decoded.userId;
            const userEmail = decoded.email;
            const userRole = decoded.role;

            const userData = {
                userId: userId,
                email: userEmail,
                role: userRole
            }

            localStorage.setItem("authToken", token);
            localStorage.setItem("userRole", userRole);
            localStorage.setItem("currentUser", JSON.stringify(userData));

            return {
                success: true,
                token: token,
                role: userRole,
                user: userData
            }
        }

        return {
            success: false,
            error: "Login failed"
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Invalid email or password"
        }
    }
}


export const registerWithAPI = async (userData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`,
            {
                firstName: toTitleCase(userData.firstName),
                lastName: toTitleCase(userData.lastName),
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                password: userData.password
            }
        )

        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Registration failed"
        }
    }
}

export const verifyEmailWithAPI = async (email, code) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}${API_ENDPOINTS.AUTH.VERIFY_EMAIL}`,
            { email, code }
        );

        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Verification failed"
        }
    }
};

export const resendCodeWithAPI = async (email) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}${API_ENDPOINTS.AUTH.RESEND_CODE}`,
            { email }
        )

        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Resend failed"
        }
    }
}

export const forgotPasswordWithAPI = async (email) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`,
            { email }
        );

        return {
            success: response.data.success,
            message: response.data.message
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to send reset code"
        };
    }
};

export const verifyResetCodeWithAPI = async (email, code) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}${API_ENDPOINTS.AUTH.VERIFY_RESET_CODE}`,
            { email, code }
        );

        return {
            success: response.data.success,
            message: response.data.message,
            resetToken: response.data.token
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Invalid verification code"
        };
    }
};

export const resetPasswordWithAPI = async (resetToken, newPassword) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}${API_ENDPOINTS.AUTH.RESET_PASSWORD}`,
            { resetToken, newPassword }
        );

        return {
            success: response.data.success,
            message: response.data.message
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to reset password"
        };
    }
};
