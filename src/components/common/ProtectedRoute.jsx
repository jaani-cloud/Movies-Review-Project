import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";

export default function ProtectedRoute({ children }) {
    const [user, setUser] = useState(getCurrentUser());

    useEffect(() => {
        const checkAuth = () => setUser(getCurrentUser());
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}