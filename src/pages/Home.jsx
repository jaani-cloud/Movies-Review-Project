import { Film, Search } from "lucide-react"
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

                {/* home btn area */}

                <div className="flex gap-3 p-4">
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

                    <div className="grid grid-cols-5 gap-4">

                        {filteredMovies.map((movie) => (
                            <div className="rounded-lg bg-slate-800 poster-animate" key={movie.id}>
                                <img className="object-cover w-full rounded-t-lg h-[400px]"

                                    src={movie.poster} alt="" />
                                <h3 className="p-2 text-white transition-all duration-300">{movie.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}