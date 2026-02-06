import { movies } from "../data/Movies";
import { useForm } from "react-hook-form";
import { passwordValidator } from "../validators/passwordValidator";
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from 'lucide-react';
import LoadingButton from "../components/common/LoadingButton";
import ErrorMessage from "../components/common/ErrorMessage";
import { useEffect, useState } from "react";
import {
    loginWithAPI,
    getCurrentUser,
    registerWithAPI,
    verifyEmailWithAPI,
    resendCodeWithAPI,
    forgotPasswordWithAPI,
    verifyResetCodeWithAPI,
    resetPasswordWithAPI
} from "../services/authService";

import SuccessMessage from "../components/common/SuccessMessage";
import { IMAGES } from "../constants/apiConfig";

const successImage = new Image();
successImage.src = IMAGES.EMAIL_VERIFIED;


export default function Login() {
    const [userEmail, setUserEmail] = useState("");
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [verifyError, setVerifyError] = useState("");

    const {
        register: registerVerify,
        handleSubmit: handleVerifySubmit,
        reset: resetVerify,
        setFocus: setVerifyFocus,
        formState: { errors: verifyErrors }
    } = useForm()

    const [loginLoading, setLoginLoading] = useState(false)
    const [signupLoading, setSignupLoading] = useState(false);
    const [forgotLoading, setForgotLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [signupError, setSignupError] = useState("");
    const [forgotError, setForgotError] = useState("");
    const [verifySuccess, setVerifySuccess] = useState(false);
    const [resetToken, setResetToken] = useState("");
    const [resetEmail, setResetEmail] = useState("");

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
        setValue: setLoginValue,
        setFocus: setLoginFocus,
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
        reset: resetForgot,
        formState: { errors: forgotErrors }
    } = useForm();

    const {
        register: registerReset,
        handleSubmit: handleResetSubmit,
        watch: watchReset,
        formState: { errors: resetErrors }
    } = useForm();

    const [resetLoading, setResetLoading] = useState(false);
    const [resetError, setResetError] = useState("");
    const [resetSuccess, setResetSuccess] = useState(false);

    const onResetSubmit = async (data) => {
        setResetLoading(true);
        setResetError("");

        const result = await resetPasswordWithAPI(resetToken, data.newPassword);
        setResetLoading(false);

        if (result.success) {
            setResetSuccess(true);

            setTimeout(() => {
                setResetSuccess(false);
                setCurrentForm("login");
                setEmailSent(false);
                setLoginValue("email", resetEmail)
                setTimeout(() => {
                    setLoginFocus("password")
                }, 1000);
            }, 3500);
        } else {
            setResetError(result.error);
        }
    };

    const [currentIndex, setCurrentIndex] = useState(() => {
        let index = Math.trunc(Math.random() * (movies.length - 1) + 1);
        return index;
    });

    const [previousIndex, setPreviousIndex] = useState(null);
    const [currentForm, setCurrentForm] = useState("login");
    const [emailSent, setEmailSent] = useState(false);
    const [userName, setUserName] = useState("");


    const onLoginSubmit = async (data) => {
        setLoginLoading(true)
        setLoginError("")
        console.log("Login Attempt: ", data)

        const result = await loginWithAPI(data.email, data.password)
        console.log('result: ', result);

        setLoginLoading(false)

        if (result.success) {
            console.log("Login Successful: ", result.role)
            navigate("/")
        } else {
            console.log("Login failed:", result.error)
            setLoginError(result.error)
        }
    }

    const onSignupSubmit = async (data) => {
        setSignupLoading(true)
        setSignupError("")

        const result = await registerWithAPI(data)
        setSignupLoading(false)

        if (result.success) {
            setUserEmail(data.email)
            setUserName(data.firstName)
            setCurrentForm("verify")

            setTimeout(() => {
                setVerifyFocus("code");
            }, 800);

        } else {
            if (result.error && result.error.includes("Verification code already sent")) {
                setUserEmail(data.email)
                setUserName(data.firstName)
                setCurrentForm("verify")

                setTimeout(() => {
                    setVerifyFocus("code")
                }, 3000);
            } else {
                setSignupError(result.error)
            }
        }
    }

    const onForgotSubmit = async (data) => {
        setForgotLoading(true);
        setForgotError("");

        if (!emailSent) {
            const result = await forgotPasswordWithAPI(data.email);
            setForgotLoading(false);

            if (result.success) {
                setResetEmail(data.email);
                setEmailSent(true);
                resetForgot();
            } else {
                setForgotError(result.error);
            }
        } else {
            const result = await verifyResetCodeWithAPI(resetEmail, data.code);
            setForgotLoading(false);

            if (result.success) {
                setResetToken(result.resetToken);
                setCurrentForm("resetPassword");
            } else {
                setForgotError(result.error);
            }
        }
    };

    const [randomBgImageStart] = useState(() => {
        let index = Math.trunc(Math.random() * (movies.length - 1) + 1);
        return index + 15 > movies.length ? index - 15 : index
    })

    const onVerifySubmit = async (data) => {
        setVerifyLoading(true)
        setVerifyError("")

        const result = await verifyEmailWithAPI(userEmail, data.code);
        setVerifyLoading(false)

        if (result.success) {
            setVerifySuccess(true)
            resetVerify()

            setTimeout(() => {
                setVerifySuccess(false)
                setCurrentForm("login");
                setLoginError("");
                setLoginValue("email", userEmail)

                setTimeout(() => {
                    setLoginFocus("password");
                }, 1000);

            }, 3500);
        } else {
            setVerifyError(result.error)
        }
    }

    const handleResendCode = async () => {
        const result = await resendCodeWithAPI(userEmail)

        if (result.success) {
            setVerifyError("")
        } else {
            setVerifyError(result.error)
        }
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

    return (

        // full div screen...

        <div className="flex w-full min-h-screen overflow-hidden">

            {/* left side of screen... */}

            <div className="hidden lg:block  lg:w-[50%] bg-white bg-gradient-to-br from-slate-900 to-slate-800 relative">

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

            <div className="w-full lg:w-[50%] bg-black flex items-center justify-center">

                {/* right login box */}
                <div className="relative w-full max-w-md overflow-hidden min-h-[700px] lg:min-h-[700px] px-4">

                    <div className={`Form-animate ${currentForm === "login" ? "Form-animate-in z-20" : "Form-animate-out z-0"}`}>

                        {/* Login page */}

                        <div className="w-full max-w-md p-4 lg:p-8">

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
                                        {showPassword ? <Eye size={20} className="text-white" /> : <EyeOff className="text-white" size={20} />}
                                    </button>
                                </div>

                                {loginErrors.password && <p className="Form-error">{loginErrors.password.message}</p>}

                                <ErrorMessage message={loginError} onClose={() => setLoginError("")} />

                                <div className="flex justify-end mb-4">

                                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentForm("forgot") }}
                                        className="Form-a">
                                        Forget Password?</a>
                                </div>

                                <LoadingButton type="submit" isLoading={loginLoading}
                                >
                                    Login
                                </LoadingButton>

                                <p className="Form-p2 mt-4">Don't have an account?{" "}
                                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentForm("signup") }}
                                        className="Form-a">
                                        Signup for free
                                    </a>
                                </p>
                            </form>

                        </div>
                    </div>

                    {/* Signup form */}

                    <div className={`Form-animate ${currentForm === "signup" ? "Form-animate-in z-20" : "Form-animate-out z-0"}`}>

                        <div className="w-full max-w-md p-4 lg:p-8">

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

                                {signupErrors.firstName && <p className="Form-error">{signupErrors.firstName.message}</p>}

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
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10)
                                    }}
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
                                        {showPassword ? <Eye className="text-white" size={20} /> : <EyeOff className="text-white" size={20} />}
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

                                <ErrorMessage message={signupError} onClose={() => setSignupError("")} />

                                <LoadingButton type="submit" isLoading={signupLoading}>Sign Up</LoadingButton>

                                <p className="Form-p2 mt-4">Already have an account?{" "}
                                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentForm("login") }}
                                        className="Form-a">
                                        Login
                                    </a>
                                </p>
                            </form>

                        </div>
                    </div>

                    {/* forgot form */}

                    <div className={`Form-animate ${currentForm === "forgot" ? "Form-animate-in z-20" : "Form-animate-out z-0"}`}>

                        <div className="w-full max-w-md p-4 lg:p-8">

                            <form onSubmit={handleForgotSubmit(onForgotSubmit)}>
                                <h1 className="Form-h1">Forgot Password?</h1>

                                {emailSent ? (
                                    <>
                                        <p className="Form-p1">Enter the 6-digit code sent to {resetEmail}</p>

                                        <input
                                            onFocus={(e) => console.log("OTP input focused, value: ", e.target.value)}
                                            className="Form-input text-center text-2xl tracking-widest"
                                            type="tel"
                                            placeholder="1-2-3-4-5-6"
                                            maxLength="6"
                                            autoComplete="off"
                                            {...registerForgot('code', {
                                                required: "Verification code is required",
                                                pattern: {
                                                    value: /^[0-9]{6}$/,
                                                    message: "Code must be 6 digits"
                                                }
                                            })}
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
                                            }}
                                        />

                                        {forgotErrors.code && <p className="Form-error">{forgotErrors.code.message}</p>}

                                        <ErrorMessage message={forgotError} onClose={() => setForgotError("")} />

                                        <LoadingButton type="submit" isLoading={forgotLoading}>
                                            Verify Code
                                        </LoadingButton>
                                    </>
                                ) : (
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

                                        <ErrorMessage message={forgotError} onClose={() => setForgotError("")} />

                                        <LoadingButton type="submit" isLoading={forgotLoading}>
                                            Send Reset Code
                                        </LoadingButton>
                                    </>
                                )}
                                <p className="Form-p2 mt-4">Remember Password?{" "}
                                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentForm("login") }}
                                        className="Form-a">Back to Login</a>
                                </p>
                            </form>

                        </div>
                    </div>

                    {/* Reset Password form */}

                    <div className={`Form-animate ${currentForm === "resetPassword" ? "Form-animate-in z-20" : "Form-animate-out z-0"}`}>

                        <div className="w-full max-w-md p-4 lg:p-8">

                            {resetSuccess ? (
                                <SuccessMessage
                                    message="Password Reset Successful! 🎉"
                                    subMessage="Redirecting to login..."
                                />
                            ) : (
                                <form onSubmit={handleResetSubmit(onResetSubmit)}>

                                    <h1 className="Form-h1">Reset Password</h1>
                                    <p className="Form-p1">Enter your new password</p>

                                    <div className="relative">
                                        <input
                                            className="pr-10 Form-input"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter new password..."
                                            {...registerReset('newPassword', passwordValidator)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute p-1 -translate-y-1/2 rounded right-3 top-1/2 hover:bg-gray-100"
                                        >
                                            {showPassword ? <Eye size={20} className="text-white" /> : <EyeOff className="text-white" size={20} />}
                                        </button>
                                    </div>

                                    {resetErrors.newPassword && <p className="Form-error">{resetErrors.newPassword.message}</p>}

                                    <input
                                        className="Form-input"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm new password..."
                                        {...registerReset('confirmPassword', {
                                            required: "Confirm your password",
                                            validate: value => value === watchReset('newPassword') || "Password does not match"
                                        })}
                                    />

                                    {resetErrors.confirmPassword && <p className="Form-error">{resetErrors.confirmPassword.message}</p>}

                                    <ErrorMessage message={resetError} onClose={() => setResetError("")} />

                                    <LoadingButton type="submit" isLoading={resetLoading}>
                                        Reset Password
                                    </LoadingButton>

                                    <p className="Form-p2">
                                        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentForm("login"); setEmailSent(false); }}
                                            className="Form-a">
                                            Back to Login
                                        </a>
                                    </p>
                                </form>
                            )}

                        </div>
                    </div>

                    {/* register otp form */}

                    <div className={`Form-animate ${currentForm === "verify" ? "Form-animate-in z-20" : "Form-animate-out z-0"}`}>

                        <div className="w-full max-w-md p-4 lg:p-8">

                            {verifySuccess ? (
                                <SuccessMessage
                                    message={`Welcome ${userName} Ji! 🎉`}
                                    subMessage="Redirecting to login..."
                                />
                            ) : (
                                <form onSubmit={handleVerifySubmit(onVerifySubmit)}>

                                    <h1 className="Form-h1">Verify Email</h1>
                                    <p className="Form-p1">Enter the 6-digit code sent to {userEmail}</p>

                                    <input
                                        className="Form-input text-center text-2xl tracking-widest"
                                        type="tel"
                                        placeholder="1-2-3-4-5-6"
                                        maxLength="6"
                                        autoComplete="off"
                                        {...registerVerify('code', {
                                            required: "Verification code is required",
                                            pattern: {
                                                value: /^[0-9]{6}$/,
                                                message: "Code must be 6 digits"
                                            }
                                        })}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
                                        }}
                                    />

                                    {verifyErrors.code && <p className="Form-error">{verifyErrors.code.message}</p>}

                                    <ErrorMessage message={verifyError} onClose={() => setVerifyError("")} />

                                    <p className="Form-p2 border-l-4 border-blue-600 w-max pl-1 rounded mb-4 mt-1">
                                        Didn't receive code?{" "}
                                        <a href="#" onClick={(e) => { e.preventDefault(); handleResendCode(); }}
                                            className="Form-a">
                                            Resend Code
                                        </a>
                                    </p>

                                    <LoadingButton type="submit" isLoading={verifyLoading}>
                                        Verify Email
                                    </LoadingButton>

                                    <p className="Form-p2">
                                        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentForm("login"); }}
                                            className="Form-a">
                                            Back to Login
                                        </a>
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}