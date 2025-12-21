import { useEffect, useState } from "react";
import { movies } from "../data/Movies";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(null);

    const [currentForm, setCurrentForm] = useState("login");

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
                <div className="relative w-full max-w-md overflow-hidden min-h-[500px]">

                    <div className={`form-animate ${currentForm === "login" ? "form-animate-in" : "form-animate-out"}`}>

                        {/* Login page */}

                        <div className="w-full max-w-md p-8">
                            <h1 className="form-h1">Welcome Back!</h1>
                            <p className="form-p1">Login to continue to review movies</p>

                            <input className="form-input"
                                type="email" placeholder="Enter your email here..."
                                onChange={(e) => setEmail(e.target.value)} value={email} />

                            <input className="form-input"
                                type="password" placeholder="Enter your password here...."
                                onChange={(e) => setPassword(e.target.value)} value={password} />
                            <div className="flex justify-end mb-4">

                                <a href="#" onClick={() => setCurrentForm("forgot")}
                                    className="form-a">
                                    Forget Password?</a>
                            </div>

                            <button className="form-btn">Login</button>

                            <p className="form-p2">Don't have an account?{" "}
                                <a href="#" onClick={() => setCurrentForm("signup")}
                                    className="form-a">
                                    Signup for free</a>
                            </p>
                        </div>
                    </div>

                    {/* Signup form */}

                    <div className={`form-animate ${currentForm === "signup" ? "form-animate-in" : "form-animate-out"}`}>

                        <div className="w-full max-w-md p-8">
                            <h1 className="form-h1">Create Account</h1>
                            <p className="form-p1">Signing up to start reviewing movies</p>

                            <input className="form-input"
                                type="text" placeholder="Enter your name here..." />

                            <input className="form-input"
                                type="email" placeholder="Enter your email here..." />

                            <input className="form-input"
                                type="password" placeholder="Create password..." />

                            <button className="form-btn">Sign Up</button>

                            <p className="form-p2">Already have an account?{" "}
                                <a href="#" onClickCapture={() => setCurrentForm("login")}
                                    className="form-a">
                                    Login</a>
                            </p>
                        </div>
                    </div>

                    {/* forgot form */}

                    <div className={`form-animate ${currentForm === "forgot" ? "form-animate-in" : "form-animate-out"}`}>

                        <div className="w-full max-w-md p-8">
                            <h1 className="form-h1">Forgot Password?</h1>
                            <p className="form-p1">Enter your email to reset password</p>

                            <input className="form-input"
                                type="email" placeholder="Enter your email here..." />

                            <button className="form-btn">Reset password</button>

                            <p className="form-p2">Remember Password?{" "}
                                <a href="#" onClick={() => setCurrentForm("login")}
                                    className="form-a">Back to Login</a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}