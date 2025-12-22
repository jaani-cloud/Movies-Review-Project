import { useEffect, useState } from "react";
import { movies } from "../data/Movies";

export default function Login() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const [currentIndex, setCurrentIndex] = useState(() => {
        let index = Math.trunc(Math.random() * (movies.length - 1) + 1);
        return index;
    });
    const [previousIndex, setPreviousIndex] = useState(null);

    const [currentForm, setCurrentForm] = useState("login");

    const [emailSent, setEmailSent] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const passLogin = () => {
        // console.log(`Login Data: ${loginData}`)
        setErrors({});
        let newErrors = {};

        if (!loginData.email) {
            newErrors.email = "Email is required";
        }

        if (loginData.email && !isValidEmail(loginData.email)) {
            newErrors.email = "Wrong Email Format"
        }

        if (!loginData.password) {
            newErrors.password = "password is required"
        }

        if (loginData.password && (loginData.password).length < 6) {
            newErrors.password = "password must be at least 6 characters"
        }
        setErrors(newErrors);
        if (newErrors.email || newErrors.password) {
            return false;
        } else return true;
    };

    //! #1 Not working...
    // const [randomBgImageStart, setRandomBgImageStart] = useState(0);

    //! #1 Working...
    const [randomBgImageStart] = useState(() => {
        let index = Math.trunc(Math.random() * (movies.length - 1) + 1);
        return index + 15 > movies.length ? index - 15 : index;
    });


    // chat gpt used
    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email.trim());
    }



    useEffect(() => {
        const timer = setInterval(() => {
            setPreviousIndex(currentIndex);

            let randomIndex;
            do {
                randomIndex = Math.trunc(Math.random() * (movies.length - 1) + 1);
            } while (randomIndex === currentIndex && movies.length > 1);

            setCurrentIndex(randomIndex);
        }, 3000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    //! #1 Not working...
    // useEffect(() => {
    //     let randomBgImageStart = Math.trunc(Math.random() * (movies.length -1) + 1);
    //     randomBgImageStart + 15 > movies.length ? randomBgImageStart -= 15: randomBgImageStart += 0;
    //     setRandomBgImageStart(randomBgImageStart);
    // },[]);

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
                            {movies.slice(randomBgImageStart, randomBgImageStart + 15).map((movie, index) => (
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
                                name="email"
                                type="email" placeholder="Enter your email here..."
                                value={loginData.email}
                                onChange={handleChange}
                            // onChange={(e) => setEmail(e.target.value)}
                            // value={email}
                            />
                            {errors.email && <p className="form-p2">{errors.email}</p>}

                            <input className="form-input"
                                name="password"
                                type="password" placeholder="Enter your password here...."
                                value={loginData.password}
                                onChange={handleChange}
                            // onChange={(e) => setPassword(e.target.value)}
                            // value={password}
                            />

                            {errors.password && <p className="form-p2">{errors.password}</p>}

                            <div className="flex justify-end mb-4">

                                <a href="#" onClick={() => setCurrentForm("forgot")}
                                    className="form-a">
                                    Forget Password?</a>
                            </div>

                            <button className="form-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if(passLogin()){
                                        console.log(`Login Success...\n ${loginData}`)
                                    }
                                }}
                            >Login</button>

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

                            {emailSent && (
                                <div className="p-4 mb-4 text-green-400 bg-green-900 rounded-lg">
                                    Email sent successfully...
                                </div>
                            )}
                            {emailSent || (
                                <>
                                    <p className="form-p1">Enter your email to reset password</p>

                                    <input className="form-input" type="email" placeholder="Enter your email here..."
                                        onChange={(e) => setForgotEmail(e.target.value)} value={forgotEmail} />

                                    <button className="form-btn disabled:cursor-not-allowed hover:disabled:bg-red-600 hover:disabled:scale-100" onClick={() => setEmailSent(true)}
                                        disabled={!isValidEmail(forgotEmail)}>Reset password</button>

                                </>
                            )}
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