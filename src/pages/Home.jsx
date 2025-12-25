import { Film } from "lucide-react"

export default function Home() {
    return (
        <div className="min-h-screen bg-black">

            {/* nav area */}

            <nav className="fixed top-0 left-0 right-0 p-4 text-white bg-slate-900">
                <h1>🎬 MovieHub</h1>
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
                        
                        <div className="rounded-lg bg-slate-800">
                            <img className="w-full rounded-t-lg"
                            src="https://i.pinimg.com/1200x/1c/39/1a/1c391a10d6cc573da460758d31821602.jpg" alt="" />
                            <h3 className="p-2 text-white">Inception</h3>
                        </div>

                        <div className="rounded-lg bg-slate-800">
                            <img className="w-full rounded-t-lg"
                            src="https://i.pinimg.com/736x/3e/1f/66/3e1f66f76ffe17e6cb6f30a2c08a6c3d.jpg" alt="" />
                            <h3 className="p-2 text-white">Interstellar</h3>
                        </div>
                    </div>
                </div>


            </main>
        </div>
    );
}