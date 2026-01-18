import { Search } from "lucide-react"

import { getCurrentUser, logout } from "../../services/authService"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

export default function Navbar({ searchQuery, setSearchQuery }) {
    const currentUser = getCurrentUser();
    const navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        // navbar start

        <nav className="fixed top-0 left-0 right-0 z-50 p-4 text-white bg-slate-900 flex items-center gap-4 ">

            {/* logo */}

            <h1>🎬 ReviewHub</h1>

            {/* search icon and search input */}

            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search here..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="Search w-full pl-10"
                />
            </div>

            {/* user info and logout button */}

            {currentUser && (
                <div className="relative">
                    <button className="font-semibold hover:text-blue-400 transition-colors"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        {currentUser.profilePhoto ? (
                            <img src={currentUser.profilePhoto} className='w-8 h-8 rounded-full object-cover inline-block mr-2' />
                        ) : (
                            <span className="inline-block mr-2">👤</span>
                        )}
                        {currentUser.firstName} {currentUser.lastName}
                        <span>{showDropdown ? "🔺" : "🔻"}</span>

                    </button>

                    {/* user dropdown */}



                    {showDropdown && (
                        <div className="absolute right-0 top-12 bg-slate-800 rounded-lg border w-48 py-2 z-50 border-slate-700 shadow-lg">

                            <Link
                                to={"/profile"}
                                onClick={() => setShowDropdown(false)}
                                className="block px-4 py-2 hover:bg-slate-700">
                                My Profile
                            </Link>

                            <Link to={"/settings"} className="block px-4 py-2 text-red-400 hover:bg-slate-700">
                                Settings
                            </Link>

                            <button className="block w-full px-4 py-2 text-red-400 hover:bg-slate-700"
                                onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>

            )}
            {currentUser.role === "admin" ? (
                <Link
                    to="/admin"
                    className="block px-4 py-2 text-yellow-400 hover:bg-slate-700 font-semibold rounded-lg text-xl"
                >
                    👑 Admin Dashboard
                </Link>) : (
                <a
                    className="block px-4 py-2 text-slate-400  font-semibold rounded-lg text-xl cursor-not-allowed Admin-error relative"
                >

                </a>
            )}
        </nav>
    )
};
