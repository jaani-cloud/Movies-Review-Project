import { useEffect, useState } from "react";
import { movies } from "../data/Movies";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(null);

    const [currentForm, setCurrentForm] = useState("signup");

    useEffect(() => {
        const timer = setInterval(() => {
            setPreviousIndex(currentIndex);

            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * movies.length);
            } while (randomIndex === currentIndex && movies.length > 1);

            setCurrentIndex(randomIndex);
        }, 3000);
        return () => clearInterval(timer);
    }, [currentIndex]);
    return (
        // full div screen...

        <div className="flex w-full h-screen overflow-hidden">

            {/* left side of screen... */}

            <div className="w-[50%] bg-white bg-gradient-to-br from-slate-900 to-slate-800 relative">

                <div className="w-[50%] bg-gradient-to-br from-slate-900 to-slate-800">

                    {/* Logo div */}

                    <div className="absolute left-4 top-4">
                        <h2 className="text-3xl font-bold text-white">🎬 ReviewHub</h2>
                    </div>

                    {/*  */}

                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
                        <div className="grid grid-cols-3 gap-4 p-4">
                            {movies.slice(20, 35).map((movie, index) => (
                                <img src={movie.poster} key={index}
                                    className="object-cover w-full h-32 rounded-lg"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* In left side movie box */}

                <div className="relative flex items-center justify-center h-full">

                    {/* movie animation box */}

                    <div className="relative w-full max-w-md h-[600px]">
                        {movies.map((movie, index) => (
                            <div key={movie.id} className={`absolute inset-0 transition-all duration-1000 ${index === currentIndex ?
                                "opacity-100 translate-y-0" :
                                index === previousIndex ?
                                    "opacity-0 -translate-y-full" :
                                    "opacity-0 translate-y-full"
                                }`}>
                                <img src={movie.poster} alt=""
                                    className="object-cover w-full h-full rounded-2xl" />
                                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 rounded-b-2xl bg-gradient-to-t from-black to-transparent">
                                    <h3 className="text-2xl font-bold text-white">{movie.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* right side of screen... */}

            <div className="w-[50%] bg-black flex items-center justify-center">

                {/* right login box */}
                <div className="w-full max-w-md">
                    {currentForm === "login" && (
                        <>
                            {/* Login page */}

                            <h1 className="mb-2 text-4xl font-bold text-white">Welcome Back!</h1>
                            <p className="mb-8 text-sm text-slate-400">Login to continue to review movies</p>
                            <input className="w-full p-3 mb-4 text-white border rounded-lg bg-slate-900 border-slate-700"
                                type="email" placeholder="Enter your email here..."
                                onChange={(e) => setEmail(e.target.value)} value={email} />
                            <input className="w-full p-3 mb-4 text-white border rounded-lg bg-slate-900 border-slate-700"
                                type="password" placeholder="Enter your password here...."
                                onChange={(e) => setPassword(e.target.value)} value={password} />
                            <div className="flex justify-end mb-4">
                                <a href="" className="text-sm text-blue-400 transition-colors hover:text-blue-300">Forget Password?</a>
                            </div>

                            <button
                                className="w-full py-3 mb-6 font-semibold text-white transition-all duration-200 transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105">
                                Login
                            </button>
                            <p className="text-sm text-center text-slate-400">Don't have an account?{" "}
                                <a href="" className="font-semibold text-blue-400 transition-colors hover:text-blue-300">Signup for free</a>
                            </p>
                        </>
                    )}

                    {currentForm === "signup" && (
                        <>
                            <h1 className="mb-4 text-4xl font-bold text-white">Create Account</h1>
                            <p className="mb-8 text-sm text-slate-400">Signing up to start reviewing movies</p>

                            <input className="w-full p-3 mb-4 border rounded-lg border-slate-700 bg-slate-900"
                                type="text" placeholder="Enter your name here..." />

                            <input className="w-full p-3 mb-4 border rounded-lg border-slate-700 bg-slate-900"
                                type="email" placeholder="Enter your email here..." />

                            <input className="w-full p-3 mb-4 border rounded-lg border-slate-700 bg-slate-900"
                                type="password" placeholder="Create password..." />

                            <button className="w-full py-3 mb-6 font-semibold text-white transition-all duration-200 transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105">Sign Up</button>
                            <p className="text-sm text-center text-slate-400">Already have an account?{" "}
                                <a href="" className="font-semibold text-blue-400 transition-colors hover:text-blue-300">Login</a>
                            </p>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}