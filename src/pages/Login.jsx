import { useEffect, useState } from "react";
import { movies } from "../data/Movies";
import { useForm } from "react-hook-form";
import { Result } from "postcss";
import { passwordValidator } from "../validators/passwordValidator";
import { Link, useNavigate } from "react-router-dom"
// import { login } from "../services/authService"
import { Eye, EyeOff } from 'lucide-react';
import { loginWithAPI, getCurrentUser } from "../services/authService";


export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = getCurrentUser()
        if (currentUser) {
            navigate("/")
        }
    }, [navigate]);
    const [showPassword, setShowPassword] = useState(false);

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


    const [currentIndex, setCurrentIndex] = useState(() => {
        let index = Math.trunc(Math.random() * (movies.length - 1) + 1);
        return index;
    });

    const [previousIndex, setPreviousIndex] = useState(null);
    const [currentForm, setCurrentForm] = useState("login");
    const [emailSent, setEmailSent] = useState(false);


    const onLoginSubmit = async (data) => {
        console.log("Login Attempt: ", data)

        // const result = login(data.email, data.password)
        const result = await loginWithAPI(data.email, data.password)
        console.log('result: ', result);

        if (result.success) {
            console.log("Login Successful: ", result.role)
            navigate("/")
        } else {
            console.log("Login failed:", result.error)
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

    const [randomBgImageStart] = useState(() => {
        let index = Math.trunc(Math.random() * (movies.length - 1) + 1);
        return index + 15 > movies.length ? index - 15 : index;
    });


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

                    <div className={`Form-animate ${currentForm === "login" ? "Form-animate-in" : "Form-animate-out"}`}>

                        {/* Login page */}

                        <div className="w-full max-w-md p-8">

                            <form onSubmit={handleLoginSubmit(onLoginSubmit)}>

                                <h1 className="Form-h1">Welcome Back!</h1>
                                <p className="Form-p1">Login to continue to review movies</p>

                                <input className="Form-input"
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
                                {loginErrors.email && <p className="Form-error">{loginErrors.email.message}</p>}

                                <div className="relative">
                                    <input
                                        className="pr-10 Form-input"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password here...."
                                        {...registerLogin('password', passwordValidator)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute p-1 -translate-y-1/2 rounded right-3 top-1/2 hover:bg-gray-100"
                                    >
                                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </button>
                                </div>

                                {loginErrors.password && <p className="Form-error">{loginErrors.password.message}</p>}

                                <div className="flex justify-end mb-4">

                                    <a href="#" onClick={() => setCurrentForm("forgot")}
                                        className="form-a">
                                        Forget Password?</a>
                                </div>

                                <input
                                    type="submit"
                                    value="Login"
                                    className="Form-btn"
                                />

                                <p className="Form-p2">Don't have an account?{" "}
                                    <a href="#" onClick={() => setCurrentForm("signup")}
                                        className="Form-a">
                                        Signup for free
                                    </a>
                                </p>
                            </form>

                        </div>
                    </div>

                    {/* Signup form */}

                    <div className={`Form-animate ${currentForm === "signup" ? "Form-animate-in" : "Form-animate-out"}`}>

                        <div className="w-full max-w-md p-8">

                            <form onSubmit={handleSignupSubmit(onSignupSubmit)}>

                                <h1 className="Form-h1">Create Account</h1>
                                <p className="Form-p1">Signing up to start reviewing movies</p>

                                <input
                                    className="Form-input"
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
                                    className="Form-input"
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

                                {signupErrors.lastName && <p className="Form-error">{signupErrors.lastName.message}</p>}

                                <input
                                    className="Form-input"
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

                                {signupErrors.email && <p className="Form-error">{signupErrors.email.message}</p>}

                                <input
                                    className="Form-input"
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

                                {signupErrors.phoneNumber && <p className="Form-error">{signupErrors.phoneNumber.message}</p>}

                                <div className="relative">
                                    <input
                                        className="pr-10 Form-input"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create password..."
                                        {...registerSignup('password', passwordValidator)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute p-1 -translate-y-1/2 rounded right-3 top-1/2 hover:bg-gray-100"
                                    >
                                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </button>
                                </div>

                                {signupErrors.password && <p className="Form-error">{signupErrors.password.message}</p>}

                                <input
                                    className="Form-input"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm password..."
                                    {...registerSignup('confirmPassword', {
                                        required: "Confirm your password",
                                        validate: value => value === passwordValue || "Password does not match"
                                    })}
                                />

                                {signupErrors.confirmPassword && <p className="Form-error">{signupErrors.confirmPassword.message}</p>}

                                <input
                                    type="submit"
                                    value="Sign Up"
                                    className="Form-btn"
                                />

                                <p className="Form-p2">Already have an account?{" "}
                                    <a href="#" onClickCapture={() => setCurrentForm("login")}
                                        className="Form-a">
                                        Login
                                    </a>
                                </p>
                            </form>

                        </div>
                    </div>

                    {/* forgot form */}

                    <div className={`Form-animate ${currentForm === "forgot" ? "Form-animate-in" : "Form-animate-out"}`}>

                        <div className="w-full max-w-md p-8">

                            <form onSubmit={handleForgotSubmit(onForgotSubmit)}>
                                <h1 className="Form-h1">Forgot Password?</h1>

                                {emailSent && (
                                    <div className="p-4 mb-4 text-green-400 bg-green-900 rounded-lg">
                                        Email sent successfully...
                                    </div>
                                )}
                                {emailSent || (
                                    <>
                                        <p className="Form-p1">Enter your email to reset password</p>

                                        <input
                                            className="Form-input"
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

                                        {forgotErrors.email && <p className="Form-error">{forgotErrors.email.message}</p>}

                                        <input
                                            type="submit"
                                            className="Form-btn"
                                            value="Reset Password"
                                        />

                                    </>
                                )}
                                <p className="Form-p2">Remember Password?{" "}
                                    <a href="#" onClick={() => setCurrentForm("login")}
                                        className="Form-a">Back to Login</a>
                                </p>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}