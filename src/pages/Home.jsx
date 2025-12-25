import { Film } from "lucide-react"
import { movies } from "../data/Movies";

export default function Home() {
    // console.log(`Movies: ${JSON.stringify(movies)}`)
    return (
        <div className="min-h-screen bg-black">

            {/* nav area */}

            <nav className="fixed top-0 left-0 right-0 p-4 text-white bg-slate-900">
                <h1>🎬 ReviewHub</h1>
            </nav>

            {/* main area */}

            <main className="pt-20">

                {/* home btn area */}

                <div className="flex gap-3 p-4">
                    <button className="home-btn">All</button>
                    <button className="home-btn">MCU</button>
                    <button className="home-btn">Harry Potter</button>
                    <button className="home-btn">Indian Movies</button>
                    <button className="home-btn">Web Series</button>
                    <button className="home-btn">Movies</button>
                    <button className="home-btn">Saw</button>
                    <button className="home-btn">Stranger Things</button>
                    <button className="home-btn">Another</button>
                </div>

                {/* home explore area */}

                <div className="p-4">
                    <h2 className="home-h1"><Film /> Explore</h2>

                    {/* movie grid area */}

                    <div className="grid grid-cols-5 gap-4">

                        {movies.map((movie) => (
                            <div className="rounded-lg bg-slate-800 " key={movie.id}>
                                <img className="object-cover w-full rounded-t-lg h-[400px]"

                                    src={movie.poster} alt="" />
                                <h3 className="p-2 text-white">{movie.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>


            </main>
        </div>
    );
}