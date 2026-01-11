import { getCurrentUser } from "../services/authService";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
    const currentUser = getCurrentUser();

    if (!currentUser || currentUser.role !== "admin") {
        return (
            <div className="min-h-screen p-8 pt-24">
                <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
                <p className="text-slate-400 mt-4">Only admins can access this page.</p>
                <Link to="/home" className="text-blue-400 hover:text-blue-300 mt-2 inline-block">
                    Go to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 pt-24">
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-2 gap-6 max-w-4xl">

                {/* Movie Manage */}

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h2 className="text-2xl font-bold mb-4">🎬 Movies</h2>
                    <p className="text-slate-400 mb-4">Manage all movies in the database</p>
                    <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 w-full">
                        Manage Movies
                    </button>
                </div>

                {/* User Manage */}

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h2 className="text-2xl font-bold mb-4">👥 Users</h2>
                    <p className="text-slate-400 mb-4">View and manage user accounts</p>
                    <button className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 w-full">
                        Manage Users
                    </button>
                </div>

                {/* Reviews Manage */}

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h2 className="text-2xl font-bold mb-4">📝 Reviews</h2>
                    <p className="text-slate-400 mb-4">Monitor and moderate reviews</p>
                    <button className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 w-full">
                        View All Reviews
                    </button>
                </div>

                {/* Data */}
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h2 className="text-2xl font-bold mb-4">📊 Statistics</h2>
                    <div className="space-y-2">
                        <p className="text-slate-300">Total Movies: <span className="font-bold">88</span></p>
                        <p className="text-slate-300">Total Users: <span className="font-bold">2</span></p>
                        <p className="text-slate-300">Total Reviews: <span className="font-bold">--</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}