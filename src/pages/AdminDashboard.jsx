import { getCurrentUser } from "../services/authService";
import { Link } from "react-router-dom";
import ManageMovies  from "../components/admin/ManageMovies";
import { useState } from "react";

export default function AdminDashboard() {
    const currentUser = getCurrentUser();
    const [activeSection, setActiveSection] = useState(null)

    if (!currentUser || currentUser.role !== "User") {
        return (
            <div className="min-h-screen p-8 pt-24">
                <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
                <p className="mt-4 text-slate-400">Only admins can access this page.</p>
                <Link to="/home" className="inline-block mt-2 text-blue-400 hover:text-blue-300">
                    Go to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 pt-24">
            <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>

            <div className="grid max-w-4xl grid-cols-2 gap-6">

                {/* Movie Manage */}

                <div className="p-6 border rounded-lg bg-slate-900 border-slate-800">
                    <h2 className="mb-4 text-2xl font-bold">🎬 Movies</h2>
                    <p className="mb-4 text-slate-400">Manage all movies in the database</p>
                    <button
                        className="w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                        onClick={() => setActiveSection("movies")}>
                        Manage Movies
                    </button>
                </div>

                {/* User Manage */}

                <div className="p-6 border rounded-lg bg-slate-900 border-slate-800">
                    <h2 className="mb-4 text-2xl font-bold">👥 Users</h2>
                    <p className="mb-4 text-slate-400">View and manage user accounts</p>
                    <button className="w-full px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
                        Manage Users
                    </button>
                </div>

                {/* Reviews Manage */}

                <div className="p-6 border rounded-lg bg-slate-900 border-slate-800">
                    <h2 className="mb-4 text-2xl font-bold">📝 Reviews</h2>
                    <p className="mb-4 text-slate-400">Monitor and moderate reviews</p>
                    <button className="w-full px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700">
                        View All Reviews
                    </button>
                </div>

                {/* Data */}
                <div className="p-6 border rounded-lg bg-slate-900 border-slate-800">
                    <h2 className="mb-4 text-2xl font-bold">📊 Statistics</h2>
                    <div className="space-y-2">
                        <p className="text-slate-300">Total Movies: <span className="font-bold">88</span></p>
                        <p className="text-slate-300">Total Users: <span className="font-bold">2</span></p>
                        <p className="text-slate-300">Total Reviews: <span className="font-bold">--</span></p>
                    </div>

                    {activeSection === "movies" && <ManageMovies/>}
                </div>
            </div>
        </div>
    );
}