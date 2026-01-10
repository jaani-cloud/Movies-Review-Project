import { useEffect, useState } from "react";
import { movies } from "../data/Movies";
import { useForm } from "react-hook-form";
import { Result } from "postcss";
import { passwordValidator } from "../validators/passwordValidator";
import {Link} from "react-router-dom"

import { login } from "../services/authService"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors }
    } = useForm();

    const {
        register: registerSignup,
        handleSubmit: handleSignupSubmit,
        watch: watchSignup,
        formState: { errors: signupErrors }
    } = useForm();

    const passwordValue = watchSignup('password');
    const validEmail = /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const {
        register: registerForgot,
        handleSubmit: handleForgotSubmit,
        formState: { errors: forgotErrors }
    } = useForm();



    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const [loginData, setLoginData] = useState({
    //     email: "",
    //     password: ""
    // });

    // const [signupData, setSignupData] = useState({
    //     name: "",
    //     email: "",
    //     password: ""
    // });

    // const [loginErrors, setLoginErrors] = useState({});
    // const [signupErrors, setSignupErrors] = useState({});
    // const [forgotErrors, setForgotErrors] = useState({});

    const [currentIndex, setCurrentIndex] = useState(() => {
        let index = Math.trunc(Math.random() * (movies.length - 1) + 1);
        return index;
    });

    const [previousIndex, setPreviousIndex] = useState(null);

    const [currentForm, setCurrentForm] = useState("login");

    const [emailSent, setEmailSent] = useState(false);

    // const [forgotEmail, setForgotEmail] = useState("");

    // const handleLoginChange = (e) => {
    //     setLoginData({ ...loginData, [e.target.name]: e.target.value });
    // };

    // const passLogin = () => {
    //     // console.log(`Login Data: ${loginData}`)
    //     setLoginErrors({});
    //     let newErrors = {};

    //     if (!loginData.email) {
    //         newErrors.email = "Email is required";
    //     }

    //     if (loginData.email && !isValidEmail(loginData.email)) {
    //         newErrors.email = "Wrong Email Format"
    //     }

    //     if (!loginData.password) {
    //         newErrors.password = "password is required"
    //     }

    //     if (loginData.password && (loginData.password).length < 6) {
    //         newErrors.password = "password must be at least 6 characters"
    //     }
    //     setLoginErrors(newErrors);
    //     if (newErrors.email || newErrors.password) {
    //         return false;
    //     } else return true;
    // };



    const onLoginSubmit =(data) =>{
        console.log("Login Attempt: ", data)

        const result = login(data.email, data.password)
        console.log('result: ', result);

        if (result.success) {
            console.log("Login Successful: ", result.user)
            navigate("/home")
        } else{
            alert(result.error)
        }
    }

    const onSignupSubmit = (data) => {
        console.log(`Sign Up Data ${JSON.stringify(data)}`);

        fetch("https://apistudent.codedonor.in/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: `jaanicloud-${data.email}`,
                phoneNumber: data.phoneNumber,
                password: data.password,
                otherDetails: JSON.stringify({
                    studentId: "jaani-cloud"
                })
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                console.log(`Sign Up Response: ${JSON.stringify(result)}`);
            })
            .catch((error) => {
                console.log(`Sign Up Error: ${JSON.stringify(error)}`);
            });
    };

    const onForgotSubmit = (data) => {
        console.log(`Forgot Data ${JSON.stringify(data)}`)
        setEmailSent(true);
    }

    // const handleSignupChange = (e) => {
    //     setSignupData({ ...signupData, [e.target.name]: e.target.value });
    // }

    // const passSignup = () => {
    //     setSignupErrors({});
    //     let newErrors = {};

    //     if (!signupData.name) {
    //         newErrors.name = "name is required";
    //     }

    //     if (!signupData.email) {
    //         newErrors.email = "email is required"
    //     }

    //     if (signupData.email && !isValidEmail(signupData.email)) {
    //         newErrors.email = "wrong email format";
    //     }

    //     if (!signupData.password) {
    //         newErrors.password = "password is required"
    //     }
    //     if (signupData.password && (signupData.password).length < 6) {
    //         newErrors.password = "password must be at least  6 characters"
    //     }

    //     setSignupErrors(newErrors);
    //     if (newErrors.name || newErrors.email || newErrors.password) {
    //         return false;
    //     } else return true;
    // };

    // const passForgot = () => {
    //     setForgotErrors({});
    //     let newErrors = {};

    //     if (!forgotEmail) {
    //         newErrors.email = "email is required"
    //     }

    //     if (forgotEmail && !isValidEmail(forgotEmail)) {
    //         newErrors.email = "wrong email format"
    //     }

    //     setForgotErrors(newErrors);
    //     if (newErrors.email) {
    //         return false;
    //     } else return true;
    // }

    //! #1 Not working...
    // const [randomBgImageStart, setRandomBgImageStart] = useState(0);

    //! #1 Working...
    const [randomBgImageStart] = useState(() => {
        let index = Math.trunc(Math.random() * (movies.length - 1) + 1);
        return index + 15 > movies.length ? index - 15 : index;
    });


    // // chat gpt used
    // const isValidEmail = (email) => {
    //     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     return regex.test(email.trim());
    // }



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
                            {movies.slice(randomBgImageStart, randomBgImageStart + 21).map((movie, index) => (
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
                <div className="relative w-full max-w-md overflow-hidden min-h-[700px]">

                    <div className={`form-animate ${currentForm === "login" ? "form-animate-in" : "form-animate-out"}`}>

                        {/* Login page */}

                        <div className="w-full max-w-md p-8">

                            <form onSubmit={handleLoginSubmit(onLoginSubmit)}>

                                <h1 className="form-h1">Welcome Back!</h1>
                                <p className="form-p1">Login to continue to review movies</p>

                                <input className="form-input"
                                    type="email"
                                    placeholder="Enter your email here..."
                                    {...registerLogin('email', {
                                        required: "email is required",
                                        pattern: {
                                            value: validEmail,
                                            message: "Invalid email format"
                                        }
                                    })}
                                />
                                {loginErrors.email && <p className="form-error">{loginErrors.email.message}</p>}

                                <input className="form-input"
                                    type="password"
                                    placeholder="Enter your password here...."
                                    {...registerLogin('password', passwordValidator)}
                                />

                                {loginErrors.password && <p className="form-error">{loginErrors.password.message}</p>}

                                <div className="flex justify-end mb-4">

                                    <a href="#" onClick={() => setCurrentForm("forgot")}
                                        className="form-a">
                                        Forget Password?</a>
                                </div>

                                <input
                                    type="submit"
                                    value="Login"
                                    className="form-btn"
                                />

                                <p className="form-p2">Don't have an account?{" "}
                                    <a href="#" onClick={() => setCurrentForm("signup")}
                                        className="form-a">
                                        Signup for free
                                    </a>
                                </p>
                            </form>

                        </div>
                    </div>

                    {/* Signup form */}

                    <div className={`form-animate ${currentForm === "signup" ? "form-animate-in" : "form-animate-out"}`}>

                        <div className="w-full max-w-md p-8">

                            <form onSubmit={handleSignupSubmit(onSignupSubmit)}>

                                <h1 className="form-h1">Create Account</h1>
                                <p className="form-p1">Signing up to start reviewing movies</p>

                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="Enter your first name here..."
                                    {...registerSignup('firstName', {
                                        required: "First name is required",
                                        minLength: {
                                            value: 2,
                                            message: "First name must be at least 2 characters"
                                        }
                                    })}
                                />

                                {signupErrors.firstName && <p className="form-error">{signupErrors.firstName.message}</p>}

                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="Enter your last name here..."
                                    {...registerSignup('lastName', {
                                        required: "Last name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Last name must be at least 2 characters"
                                        }
                                    })}
                                />

                                {signupErrors.lastName && <p className="form-error">{signupErrors.lastName.message}</p>}

                                <input
                                    className="form-input"
                                    type="email"
                                    placeholder="Enter your email here..."
                                    {...registerSignup('email', {
                                        required: "email is required",
                                        pattern: {
                                            value: validEmail,
                                            message: "Invalid Email Format"
                                        }
                                    })}
                                />

                                {signupErrors.email && <p className="form-error">{signupErrors.email.message}</p>}

                                <input
                                    className="form-input"
                                    type="tel"
                                    placeholder="Enter your phone number here..."
                                    {...registerSignup('phoneNumber', {
                                        required: "phone number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Phone Number must be 10 digits"
                                        }
                                    })}
                                />

                                {signupErrors.phoneNumber && <p className="form-error">{signupErrors.phoneNumber.message}</p>}

                                <input
                                    className="form-input"
                                    type="password"
                                    placeholder="Create password..."
                                    {...registerSignup('password', passwordValidator)}
                                />

                                {signupErrors.password && <p className="form-error">{signupErrors.password.message}</p>}

                                <input
                                    className="form-input"
                                    type="password"
                                    placeholder="Confirm password..."
                                    {...registerSignup('confirmPassword', {
                                        required: "Confirm your password",
                                        validate: value => value === passwordValue || "Password does not match"
                                    })}
                                />

                                {signupErrors.confirmPassword && <p className="form-error">{signupErrors.confirmPassword.message}</p>}

                                <input
                                    type="submit"
                                    value="Sign Up"
                                    className="form-btn"
                                />

                                <p className="form-p2">Already have an account?{" "}
                                    <a href="#" onClickCapture={() => setCurrentForm("login")}
                                        className="form-a">
                                        Login
                                    </a>
                                </p>
                            </form>

                        </div>
                    </div>

                    {/* forgot form */}

                    <div className={`form-animate ${currentForm === "forgot" ? "form-animate-in" : "form-animate-out"}`}>

                        <div className="w-full max-w-md p-8">

                            <form onSubmit={handleForgotSubmit(onForgotSubmit)}>
                                <h1 className="form-h1">Forgot Password?{"\u00A0\u00A0"} <Link to="./home" className="opacity-0 cursor-vertical-text">0</Link></h1>

                                {emailSent && (
                                    <div className="p-4 mb-4 text-green-400 bg-green-900 rounded-lg">
                                        Email sent successfully...
                                    </div>
                                )}
                                {emailSent || (
                                    <>
                                        <p className="form-p1">Enter your email to reset password</p>

                                        <input
                                            className="form-input"
                                            type="email"
                                            placeholder="Enter your email here..."
                                            {...registerForgot('email', {
                                                required: "Email is required",
                                                pattern: {
                                                    value: validEmail,
                                                    message: "Invalid Email format"
                                                }
                                            })}
                                        />

                                        {forgotErrors.email && <p className="form-error">{forgotErrors.email.message}</p>}

                                        <input
                                            type="submit"
                                            className="form-btn"
                                            value="Reset Password"
                                        />

                                    </>
                                )}
                                <p className="form-p2">Remember Password?{" "}
                                    <a href="#" onClick={() => setCurrentForm("login")}
                                        className="form-a">Back to Login</a>
                                </p>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}