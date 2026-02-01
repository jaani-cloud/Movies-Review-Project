import { Search, Menu, X } from "lucide-react"
import { getCurrentUser, logout } from "../../services/authService"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

export default function Navbar({ searchQuery, setSearchQuery }) {
    const currentUser = getCurrentUser();
    const navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        // navbar start
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between gap-4 p-4 text-white bg-slate-900 lg:pr-24">

                {/* logo */}

                <h1 className="text-xl lg:text-2xl font-bold">🎬 ReviewHub</h1>

                {/* search icon and search input */}

                <div className="relative flex-1 max-w-md hidden lg:flex">
                    <Search className="absolute -translate-y-1/2 left-3 top-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search here..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 Search"
                    />
                </div>

                {/* mobile search icon */}

                {showMobileSearch ? (
                    <div className="flex items-center flex-1 gap-2 lg:hidden">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                            className="flex-1 Search"
                        />
                    </div>
                ) : (
                    <button
                        onClick={() => setShowMobileSearch(true)}
                        className="lg:hidden"
                    >
                        <Search size={24} />
                    </button>
                )}

                {/* user info and logout button */}

                {currentUser && (
                    <div className="relative hidden lg:block">
                        <button className="font-semibold transition-colors hover:text-blue-400"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            {currentUser.profilePhoto ? (
                                <img src={currentUser.profilePhoto} className='inline-block object-cover w-8 h-8 mr-2 rounded-full' />
                            ) : (
                                <span className="inline-block mr-2">👤</span>
                            )}
                            {currentUser.firstName} {currentUser.lastName}
                            <span>{showDropdown ? "🔺" : "🔻"}</span>

                        </button>

                        {/* user dropdown */}



                        {showDropdown && (
                            <div className="absolute right-0 z-50 w-48 py-2 border rounded-lg shadow-lg top-12 bg-slate-800 border-slate-700">

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
                {currentUser.role === "User" ? (
                    <Link
                        to="/admin"
                        className="hidden lg:block  px-4 py-2 text-xl font-semibold text-yellow-400 rounded-lg hover:bg-slate-700"
                    >
                        👑 Admin Dashboard
                    </Link>) : (
                    <a
                        className="hidden lg:block relative px-4 py-2 text-xl font-semibold rounded-lg cursor-not-allowed text-slate-400 Admin-error"
                    >

                    </a>
                )}
                <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden block">
                    {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {showMobileMenu && (
                <div className="bg-slate-900 fixed inset-0 z-40 lg:hidden pt-20">
                    <div className="flex flex-col p-6 gap-4">

                        <Link to="/profile"
                            onClick={() => setShowMobileMenu(false)}
                            className="block px-4 py-3 text-lg hover:bg-slate-800 rounded-lg"
                        >
                            My Profile
                        </Link>

                        <Link to="/settings"
                            onClick={() => setShowMobileMenu(false)}
                            className="block px-4 py-3 text-lg hover:bg-slate-800 rounded-lg"
                        >
                            Settings
                        </Link>

                        {currentUser?.role === "User" && (
                            <Link to="/admin"
                                onClick={() => setShowMobileMenu(false)}
                                className="block px-4 py-3 text-lg hover:bg-slate-800 rounded-lg"
                            >
                                Admin Dashboard
                            </Link>
                        )}
                        <button onClick={handleLogout}
                            className="text-red-400 hover:bg-slate-800 block px-4 py-3 text-lg rounded-lg text-left"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </>
    )
};
