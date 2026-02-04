import { getCurrentUser } from "../services/authService";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getAllMoviesWithAPI } from "../services/movieService";
import ManageMovies from "../components/admin/ManageMovies";
import { useState } from "react";

export default function AdminDashboard() {
    const currentUser = getCurrentUser();
    const [activeSection, setActiveSection] = useState(null);

    const { data: movies = [] } = useQuery({
        queryKey: ['movies'],
        queryFn: async () => {
            const result = await getAllMoviesWithAPI();
            if (!result.success) {
                throw new Error(result.error || "Failed to load movies");
            }
            return result.movies;
        },
        staleTime: 5 * 60 * 1000,
    });

    if (!currentUser || currentUser.role !== "Admin") {
        return (
            <div className="ctm-access-denied">
                <div className="ctm-denied-content">
                    <h1 className="ctm-denied-title">⛔ Access Denied</h1>
                    <p className="ctm-denied-text">Only admins can access this page.</p>
                    <Link to="/home" className="ctm-denied-link">
                        ← Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="ctm-admin-container">
            <div className="ctm-admin-header">
                <div className="ctm-crown-icon">👑</div>
                <h1 className="ctm-admin-title">Admin Dashboard</h1>
                <p className="ctm-admin-subtitle">Master Control Center</p>
            </div>

            {activeSection === "movies" ? (
                <ManageMovies />
            ) : (

                <div className="ctm-admin-grid">

                    <div className="ctm-admin-card ctm-card-blue">
                        <div className="ctm-card-glow"></div>
                        <div className="ctm-card-content">
                            <div className="ctm-card-icon">🎬</div>
                            <h2 className="ctm-card-title">Movies</h2>
                            <p className="ctm-card-desc">Manage all movies in the database</p>
                            <button
                                className="ctm-card-btn ctm-btn-blue"
                                onClick={() => setActiveSection("movies")}>
                                <span>Manage Movies</span>
                                <span className="ctm-btn-arrow">→</span>
                            </button>
                        </div>
                    </div>

                    <div className="ctm-admin-card ctm-card-purple">
                        <div className="ctm-card-glow"></div>
                        <div className="ctm-card-content">
                            <div className="ctm-card-icon">👥</div>
                            <h2 className="ctm-card-title">Users</h2>
                            <p className="ctm-card-desc">View and manage user accounts</p>
                            <button className="ctm-card-btn ctm-btn-purple">
                                <span>Manage Users</span>
                                <span className="ctm-btn-arrow">→</span>
                            </button>
                        </div>
                    </div>

                    <div className="ctm-admin-card ctm-card-green">
                        <div className="ctm-card-glow"></div>
                        <div className="ctm-card-content">
                            <div className="ctm-card-icon">📝</div>
                            <h2 className="ctm-card-title">Reviews</h2>
                            <p className="ctm-card-desc">Monitor and moderate reviews</p>
                            <button className="ctm-card-btn ctm-btn-green">
                                <span>View All Reviews</span>
                                <span className="ctm-btn-arrow">→</span>
                            </button>
                        </div>
                    </div>

                    <div className="ctm-admin-card ctm-card-gold">
                        <div className="ctm-card-glow"></div>
                        <div className="ctm-card-content">
                            <div className="ctm-card-icon">📊</div>
                            <h2 className="ctm-card-title">Statistics</h2>
                            <div className="ctm-stats-container">
                                <div className="ctm-stat-item">
                                    <span className="ctm-stat-label">Total Movies</span>
                                    <span className="ctm-stat-value">{movies.length}</span>
                                </div>
                                <div className="ctm-stat-item">
                                    <span className="ctm-stat-label">Total Users</span>
                                    <span className="ctm-stat-value">2</span>
                                </div>
                                <div className="ctm-stat-item">
                                    <span className="ctm-stat-label">Total Reviews</span>
                                    <span className="ctm-stat-value">--</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}