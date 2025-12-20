import { useEffect, useState} from "react";
import {movies} from "../data/Movies";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(null);

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

            <div className="w-[50%] bg-white bg-gradient-to-br from-slate-900 to-slate-800">

                {/* In left side movie box */}

                <div className="relative flex items-center justify-center h-full">

                    {/* movie animation box */}

                    <div className="relative w-full max-w-md h-[600px]">
                        {movies.map((movie, index) => (
                            <div key={movie.id} className={`absolute inset-0 transition-all duration-1000 ${
                                index === currentIndex ?
                                "opacity-100 translate-y-0" :
                                index === previousIndex ?
                                "opacity-0 -translate-y-full":
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
                <div className="">
                    <h1 className="mb-2 text-4xl font-bold text-white">Welcome Back!</h1>
                    <p className="mb-8 text-sm text-slate-400">Login to continue to review movies</p>
                    <input className="w-full p-3 mb-4 text-white border rounded-lg bg-slate-900 border-slate-700"
                     type="email" placeholder="Enter your email here..."
                     onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <input className="w-full p-3 mb-4 text-white border rounded-lg bg-slate-900 border-slate-700"
                    type="password" placeholder="Enter your password here...."
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                    <button className="w-full py-3 mb-6 font-semibold text-white bg-blue-600 rounded-lg">Login</button>
                    <p className="text-sm text-center text-slate-400">Don't have an account? Signup</p>
                </div>
            </div>
        </div>
    );
}