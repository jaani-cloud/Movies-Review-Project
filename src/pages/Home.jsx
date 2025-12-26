import { Film, Search,Flame  } from "lucide-react"
import { movies } from "../data/Movies"
import { useState } from "react"

export default function Home() {

    const [selectedCat, setSelectedCat] = useState("All");
    const [userSearch, setUserSearch] = useState("");


    const filteredMovies = movies.filter((movie) => {
        const catGot = selectedCat === "All" || movie.category.includes(selectedCat)
        const searchGot = movie.name.toLowerCase().includes(userSearch.toLowerCase().trim())
        return catGot && searchGot;
    })

    const topRatedMovies = movies.slice(0, 10);


    return (
        <div className="min-h-screen bg-black">

            {/* nav area */}

            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center gap-4 p-4 text-white bg-slate-900">
                <h1>🎬 ReviewHub</h1>
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute -translate-y-1/2 left-3 top-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search here..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="pl-10 search w-80"
                    />
                </div>
            </nav>

            {/* main area */}

            <main className="pt-20">

                <div className="flex gap-4">

                    {/* home btn area */}

                    <div className="flex-1 mr-[21rem]">


                        <div className="flex gap-3 p-4 flex-wrap">
                            <button
                                className={`${selectedCat === "All" ? "home-btn-active" : "home-btn"}`}
                                onClick={() => setSelectedCat("All")}>All</button>
                            <button
                                className={`${selectedCat === "MCU" ? "home-btn-active" : "home-btn"}`}
                                onClick={() => setSelectedCat("MCU")}>MCU</button>
                            <button
                                className={`${selectedCat === "Harry Potter" ? "home-btn-active" : "home-btn"}`}
                                onClick={() => setSelectedCat("Harry Potter")}>Harry Potter</button>
                            <button
                                className={`${selectedCat === "Indian Movie" ? "home-btn-active" : "home-btn"}`}
                                onClick={() => setSelectedCat("Indian Movie")}>Indian Movies</button>
                            <button
                                className={`${selectedCat === "Web Series" ? "home-btn-active" : "home-btn"}`}
                                onClick={() => setSelectedCat("Web Series")}>Web Series</button>
                            <button
                                className={`${selectedCat === "Movie" ? "home-btn-active" : "home-btn"}`}
                                onClick={() => setSelectedCat("Movie")}>Movies</button>
                            <button
                                className={`${selectedCat === "Saw" ? "home-btn-active" : "home-btn"}`}
                                onClick={() => setSelectedCat("Saw")}>Saw</button>
                            <button
                                className={`${selectedCat === "Stranger Things" ? "home-btn-active" : "home-btn"}`}
                                onClick={() => setSelectedCat("Stranger Things")}>Stranger Things</button>
                            <button
                                className={`${selectedCat === "X-Men" ? "home-btn-active" : "home-btn"}`}
                                onClick={() => setSelectedCat("X-Men")}>X-Men</button>
                            <button
                                className={`${selectedCat === "Animated" ? "home-btn-active" : "home-btn"}`}
                                onClick={() => setSelectedCat("Animated")}>Animated</button>
                            <button
                                className={`${selectedCat === "Another" ? "home-btn-active" : "home-btn"}`}
                                onClick={() => setSelectedCat("Another")}>Another</button>
                        </div>

                        {/* home explore area */}

                        <div className="p-4">
                            <h2 className="home-h1"><Film /> Explore</h2>

                            {/* movie grid area */}

                            <div className="grid grid-cols-6 gap-4">

                                {filteredMovies.map((movie) => (
                                    <div className="rounded-lg bg-slate-800 poster-animate" key={movie.id}>
                                        <img className="object-cover w-full rounded-t-lg h-60"

                                            src={movie.poster} alt="" />
                                        <h3 className="p-2 text-white transition-all duration-300">{movie.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <aside className="w-80 bg-slate-900 p-4 rounded-lg fixed right-4 top-24 self-start h-[calc(100vh-6rem)] flex flex-col">
                        <h2 className="home-h1 mb-4"><Flame/> Most Interested</h2>
                        <div className="overflow-y-auto flex-1 sidebar-scroll">
                            {topRatedMovies.map((movie) => (
                                <div key={movie.id} className="sidebar">
                                    <img
                                        src={movie.poster} alt=""
                                        className="w-20 h-28 object-cover rounded"
                                    />

                                    <div className="flex flex-col justify-center">
                                        <p className="text-white font-semibold">{movie.name}</p>
                                        <p className="text-slate-400 text-sm">{movie.releaseYear}</p>
                                        <p className="text-slate-500 text-xs capitalize">{movie.genre.join(", ")}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}