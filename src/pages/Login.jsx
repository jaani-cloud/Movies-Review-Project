import { movies } from "../data/Movies";
import { useForm } from "react-hook-form";
import { passwordValidator } from "../validators/passwordValidator";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle2 } from 'lucide-react';
import LoadingButton from "../components/common/LoadingButton";
import ErrorMessage from "../components/common/ErrorMessage";
import { useEffect, useState, useRef } from "react";
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
import "../styles/loginAnimation.css";

const successImage = new Image();
successImage.src = IMAGES.EMAIL_VERIFIED;

// Password strength calculator
const calculatePasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    if (strength <= 2) return { strength: 1, label: 'Weak' };
    if (strength <= 4) return { strength: 2, label: 'Medium' };
    return { strength: 3, label: 'Strong' };
};

// OTP Input Component
const OTPInput = ({ length = 6, onComplete, error, reset }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);

    useEffect(() => {
        if (reset) {
            setOtp(new Array(length).fill(''));
            if (inputRefs.current[0]) {
                setTimeout(() => {
                    inputRefs.current[0].focus();
                }, 100);
            }
        }
    }, [reset, length]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Auto-focus next input
        if (element.value && index < length - 1) {
            if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }

        // Call onComplete when all filled
        if (newOtp.every(digit => digit !== '')) {
            onComplete(newOtp.join(''));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newOtp = [...otp];

            if (otp[index]) {
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                newOtp[index - 1] = '';
                setOtp(newOtp);
                if (inputRefs.current[index - 1]) {
                    inputRefs.current[index - 1].focus();
                }
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length).split('');
        if (pastedData.every(char => !isNaN(char))) {
            const newOtp = [...otp];
            pastedData.forEach((char, i) => {
                if (i < length) newOtp[i] = char;
            });
            setOtp(newOtp);

            if (pastedData.length === length) {
                onComplete(newOtp.join(''));
            }
        }
    };

    return (
        <div className="otp-container">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className={`otp-input ${digit ? 'filled' : ''} ${error ? 'error' : ''}`}
                />
            ))}
        </div>
    );
};

// Floating Label Input Component
const FloatingLabelInput = ({
    label,
    icon: Icon,
    type = "text",
    register,
    error,
    showPassword,
    togglePassword,
    isValid,
    characterCount,
    maxCharacters,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    return (
        <div className="floating-label-container form-field-stagger">
            <div className="relative">
                {Icon && <Icon className="input-icon" size={18} />}

                <input
                    className={`Form-input glass-input ${Icon ? 'input-with-icon' : ''} ${error ? 'shake' : ''}`}
                    type={type}
                    placeholder=" "
                    {...register}
                    {...props}
                    onFocus={(e) => {
                        setIsFocused(true);
                        if (props.onFocus) props.onFocus(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        setHasValue(e.target.value !== '');
                        if (props.onBlur) props.onBlur(e);
                    }}
                />

                <label className="floating-label">{label}</label>

                {type === 'password' && togglePassword && (
                    <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute p-1 -translate-y-1/2 rounded right-3 top-1/2 hover:bg-slate-700 transition-colors z-10"
                    >
                        {showPassword ? <Eye size={20} className="text-slate-400" /> : <EyeOff className="text-slate-400" size={20} />}
                    </button>
                )}

                {isValid && !error && type !== 'password' && (
                    <CheckCircle2 className="validation-icon show" size={18} />
                )}

                {characterCount !== undefined && maxCharacters && (
                    <span className={`character-counter ${characterCount === maxCharacters ? 'complete' : ''}`}>
                        {characterCount}/{maxCharacters}
                    </span>
                )}
            </div>

            {error && <p className="Form-error">{error.message}</p>}
        </div>
    );
};

export default function Login() {
    const [userEmail, setUserEmail] = useState("");
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [verifyError, setVerifyError] = useState("");
    const [otpReset, setOtpReset] = useState(false);

    const {
        register: registerVerify,
        handleSubmit: handleVerifySubmit,
        reset: resetVerify,
        setFocus: setVerifyFocus,
        setValue: setVerifyValue,
        formState: { errors: verifyErrors }
    } = useForm();

    const [loginLoading, setLoginLoading] = useState(false);
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
        const currentUser = getCurrentUser();
        if (currentUser) {
            navigate("/");
        }
    }, [navigate]);

    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ strength: 0, label: '' });
    const [phoneCharCount, setPhoneCharCount] = useState(0);

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        setValue: setLoginValue,
        setFocus: setLoginFocus,
        watch: watchLogin,
        formState: { errors: loginErrors }
    } = useForm();

    const loginEmailValue = watchLogin('email');
    const loginPasswordValue = watchLogin('password');

    const {
        register: registerSignup,
        handleSubmit: handleSignupSubmit,
        watch: watchSignup,
        formState: { errors: signupErrors }
    } = useForm();

    const signupFirstName = watchSignup('firstName');
    const signupLastName = watchSignup('lastName');
    const signupEmail = watchSignup('email');
    const signupPhone = watchSignup('phoneNumber');
    const passwordValue = watchSignup('password');
    const confirmPasswordValue = watchSignup('confirmPassword');
    const validEmail = /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    useEffect(() => {
        if (passwordValue) {
            setPasswordStrength(calculatePasswordStrength(passwordValue));
        } else {
            setPasswordStrength({ strength: 0, label: '' });
        }
    }, [passwordValue]);

    useEffect(() => {
        if (signupPhone) {
            setPhoneCharCount(signupPhone.length);
        } else {
            setPhoneCharCount(0);
        }
    }, [signupPhone]);

    const {
        register: registerForgot,
        handleSubmit: handleForgotSubmit,
        reset: resetForgot,
        watch: watchForgot,
        setValue: setForgotValue,
        formState: { errors: forgotErrors }
    } = useForm();

    const forgotEmailValue = watchForgot('email');

    const {
        register: registerReset,
        handleSubmit: handleResetSubmit,
        watch: watchReset,
        formState: { errors: resetErrors }
    } = useForm();

    const resetPasswordValue = watchReset('newPassword');
    const resetConfirmPasswordValue = watchReset('confirmPassword');

    const [resetLoading, setResetLoading] = useState(false);
    const [resetError, setResetError] = useState("");
    const [resetSuccess, setResetSuccess] = useState(false);
    const [resetPasswordStrength, setResetPasswordStrength] = useState({ strength: 0, label: '' });

    useEffect(() => {
        if (resetPasswordValue) {
            setResetPasswordStrength(calculatePasswordStrength(resetPasswordValue));
        } else {
            setResetPasswordStrength({ strength: 0, label: '' });
        }
    }, [resetPasswordValue]);

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
                setLoginValue("email", resetEmail);
                setTimeout(() => {
                    setLoginFocus("password");
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
        setLoginLoading(true);
        setLoginError("");
        console.log("Login Attempt: ", data);

        const result = await loginWithAPI(data.email, data.password);
        console.log('result: ', result);

        setLoginLoading(false);

        if (result.success) {
            console.log("Login Successful: ", result.role);
            navigate("/");
        } else {
            console.log("Login failed:", result.error);
            setLoginError(result.error);
        }
    };

    const onSignupSubmit = async (data) => {
        setSignupLoading(true);
        setSignupError("");

        const result = await registerWithAPI(data);
        setSignupLoading(false);

        if (result.success) {
            setUserEmail(data.email);
            setUserName(data.firstName);
            setCurrentForm("verify");
            setOtpReset(true);
            setTimeout(() => setOtpReset(false), 100);
        } else {
            if (result.error && result.error.includes("Verification code already sent")) {
                setUserEmail(data.email);
                setUserName(data.firstName);
                setCurrentForm("verify");
                setOtpReset(true);
                setTimeout(() => setOtpReset(false), 100);
            } else {
                setSignupError(result.error);
            }
        }
    };

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
                setOtpReset(true);
                setTimeout(() => setOtpReset(false), 100);
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
        return index + 15 > movies.length ? index - 15 : index;
    });

    const onVerifySubmit = async (data) => {
        setVerifyLoading(true);
        setVerifyError("");

        const result = await verifyEmailWithAPI(userEmail, data.code);
        setVerifyLoading(false);

        if (result.success) {
            setVerifySuccess(true);
            resetVerify();

            setTimeout(() => {
                setVerifySuccess(false);
                setCurrentForm("login");
                setLoginError("");
                setLoginValue("email", userEmail);

                setTimeout(() => {
                    setLoginFocus("password");
                }, 1000);
            }, 3500);
        } else {
            setVerifyError(result.error);
        }
    };

    const handleResendCode = async () => {
        const result = await resendCodeWithAPI(userEmail);

        if (result.success) {
            setVerifyError("");
        } else {
            setVerifyError(result.error);
        }
    };

    const handleOTPComplete = (code) => {
        setVerifyValue('code', code);
    };

    const handleForgotOTPComplete = (code) => {
        setForgotValue('code', code);
    };

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
            <div className="hidden lg:block lg:w-[50%] bg-white bg-gradient-to-br from-slate-900 to-slate-800 relative">
                <div className="w-[50%] bg-gradient-to-br from-slate-900 to-slate-800">
                    {/* Logo div */}
                    <div className="absolute left-4 top-4 z-30">
                        <h2 className="text-3xl font-bold text-white">🎬 ReviewHub</h2>
                    </div>

                    {/*  */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
                        <div className="grid grid-cols-3 gap-4 p-4">
                            {movies.slice(randomBgImageStart, randomBgImageStart + 21).map((movie, index) => (
                                <img
                                    src={movie.poster}
                                    key={index}
                                    className="object-cover w-full h-32 rounded-lg"
                                    alt=""
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* In left side movie box */}
                <div className="relative flex items-center justify-center h-full parallax-wrapper">
                    {/* movie animation box */}
                    <div className="relative w-full max-w-md h-[600px]">
                        {movies.map((movie, index) => (
                            <div
                                key={movie.id}
                                className={`absolute inset-0 transition-all duration-1000 parallax-layer ${index === currentIndex ?
                                        "opacity-100 translate-y-0" :
                                        index === previousIndex ?
                                            "opacity-0 -translate-y-full" :
                                            "opacity-0 translate-y-full"
                                    }`}
                            >
                                <img
                                    src={movie.poster}
                                    alt={movie.name}
                                    className="object-cover w-full h-full rounded-2xl shadow-elevation-4"
                                />
                                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 rounded-b-2xl bg-gradient-to-t from-black to-transparent">
                                    <h3 className="text-2xl font-bold text-white">{movie.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* right side of screen... */}
            <div className="w-full lg:w-[50%] bg-black flex items-center justify-center p-4">
                {/* right login box */}
                <div className="relative w-full max-w-md overflow-visible min-h-[700px] lg:min-h-[700px]">

                    <div className={`Form-animate ${currentForm === "login" ? "Form-animate-in z-20" : "Form-animate-out z-0"}`}>
                        {/* Login page */}
                        <div className="w-full max-w-md p-6 lg:p-8 glass-container rounded-2xl shadow-elevation-3">
                            <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
                                <h1 className="Form-h1 form-field-stagger">Welcome Back!</h1>
                                <p className="Form-p1 form-field-stagger">Login to continue to review movies</p>

                                <FloatingLabelInput
                                    label="Email Address"
                                    icon={Mail}
                                    type="email"
                                    register={registerLogin('email', {
                                        required: "email is required",
                                        pattern: {
                                            value: validEmail,
                                            message: "Invalid email format"
                                        }
                                    })}
                                    error={loginErrors.email}
                                    isValid={loginEmailValue && validEmail.test(loginEmailValue) && !loginErrors.email}
                                />

                                <FloatingLabelInput
                                    label="Password"
                                    icon={Lock}
                                    type={showPassword ? "text" : "password"}
                                    register={registerLogin('password', passwordValidator)}
                                    error={loginErrors.password}
                                    showPassword={showPassword}
                                    togglePassword={() => setShowPassword(!showPassword)}
                                    isValid={loginPasswordValue && !loginErrors.password}
                                />

                                {loginError && <ErrorMessage message={loginError} onClose={() => setLoginError("")} />}

                                <div className="flex justify-end mb-4 form-field-stagger">
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setCurrentForm("forgot"); }}
                                        className="Form-a enhanced-link"
                                    >
                                        Forget Password?
                                    </a>
                                </div>

                                <div className="form-field-stagger">
                                    <LoadingButton type="submit" isLoading={loginLoading} className="enhanced-button">
                                        Login
                                    </LoadingButton>
                                </div>

                                <p className="Form-p2 mt-4 form-field-stagger">
                                    Don't have an account?{" "}
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setCurrentForm("signup"); }}
                                        className="Form-a enhanced-link"
                                    >
                                        Signup for free
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Signup form */}
                    <div className={`Form-animate ${currentForm === "signup" ? "Form-animate-in z-20" : "Form-animate-out z-0"}`}>
                        <div className="w-full max-w-md p-6 lg:p-8 glass-container rounded-2xl shadow-elevation-3">
                            <form onSubmit={handleSignupSubmit(onSignupSubmit)}>
                                <h1 className="Form-h1 form-field-stagger">Create Account</h1>
                                <p className="Form-p1 form-field-stagger">Signing up to start reviewing movies</p>

                                <FloatingLabelInput
                                    label="First Name"
                                    icon={User}
                                    type="text"
                                    register={registerSignup('firstName', {
                                        required: "First name is required",
                                        minLength: {
                                            value: 2,
                                            message: "First name must be at least 2 characters"
                                        }
                                    })}
                                    error={signupErrors.firstName}
                                    isValid={signupFirstName && signupFirstName.length >= 2 && !signupErrors.firstName}
                                />

                                <FloatingLabelInput
                                    label="Last Name"
                                    icon={User}
                                    type="text"
                                    register={registerSignup('lastName', {
                                        required: "Last name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Last name must be at least 2 characters"
                                        }
                                    })}
                                    error={signupErrors.lastName}
                                    isValid={signupLastName && signupLastName.length >= 2 && !signupErrors.lastName}
                                />

                                <FloatingLabelInput
                                    label="Email Address"
                                    icon={Mail}
                                    type="email"
                                    register={registerSignup('email', {
                                        required: "email is required",
                                        pattern: {
                                            value: validEmail,
                                            message: "Invalid Email Format"
                                        }
                                    })}
                                    error={signupErrors.email}
                                    isValid={signupEmail && validEmail.test(signupEmail) && !signupErrors.email}
                                />

                                <FloatingLabelInput
                                    label="Phone Number"
                                    icon={Phone}
                                    type="tel"
                                    register={registerSignup('phoneNumber', {
                                        required: "phone number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Phone Number must be 10 digits"
                                        }
                                    })}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                                    }}
                                    error={signupErrors.phoneNumber}
                                    characterCount={phoneCharCount}
                                    maxCharacters={10}
                                    isValid={signupPhone && signupPhone.length === 10 && !signupErrors.phoneNumber}
                                />

                                <div className="form-field-stagger">
                                    <FloatingLabelInput
                                        label="Create Password"
                                        icon={Lock}
                                        type={showPassword ? "text" : "password"}
                                        register={registerSignup('password', passwordValidator)}
                                        error={signupErrors.password}
                                        showPassword={showPassword}
                                        togglePassword={() => setShowPassword(!showPassword)}
                                    />

                                    {passwordValue && (
                                        <>
                                            <div className="password-strength-meter">
                                                <div className={`password-strength-bar ${passwordStrength.label.toLowerCase()}`}></div>
                                            </div>
                                            <p className={`password-strength-text ${passwordStrength.label.toLowerCase()}`}>
                                                Password Strength: {passwordStrength.label}
                                            </p>
                                        </>
                                    )}
                                </div>

                                <FloatingLabelInput
                                    label="Confirm Password"
                                    icon={Lock}
                                    type={showPassword ? "text" : "password"}
                                    register={registerSignup('confirmPassword', {
                                        required: "Confirm your password",
                                        validate: value => value === passwordValue || "Password does not match"
                                    })}
                                    error={signupErrors.confirmPassword}
                                    isValid={confirmPasswordValue && confirmPasswordValue === passwordValue && !signupErrors.confirmPassword}
                                />

                                {signupError && <ErrorMessage message={signupError} onClose={() => setSignupError("")} />}

                                <div className="form-field-stagger">
                                    <LoadingButton type="submit" isLoading={signupLoading} className="enhanced-button">
                                        Sign Up
                                    </LoadingButton>
                                </div>

                                <p className="Form-p2 mt-4 form-field-stagger">
                                    Already have an account?{" "}
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setCurrentForm("login"); }}
                                        className="Form-a enhanced-link"
                                    >
                                        Login
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* forgot form */}
                    <div className={`Form-animate ${currentForm === "forgot" ? "Form-animate-in z-20" : "Form-animate-out z-0"}`}>
                        <div className="w-full max-w-md p-6 lg:p-8 glass-container rounded-2xl shadow-elevation-3">
                            <form onSubmit={handleForgotSubmit(onForgotSubmit)}>
                                <h1 className="Form-h1 form-field-stagger">Forgot Password?</h1>

                                {emailSent ? (
                                    <>
                                        <p className="Form-p1 form-field-stagger">Enter the 6-digit code sent to {resetEmail}</p>

                                        <div className="form-field-stagger">
                                            <OTPInput
                                                length={6}
                                                onComplete={handleForgotOTPComplete}
                                                error={forgotErrors.code}
                                                reset={otpReset}
                                            />
                                        </div>

                                        {forgotErrors.code && <p className="Form-error">{forgotErrors.code.message}</p>}

                                        {forgotError && <ErrorMessage message={forgotError} onClose={() => setForgotError("")} />}

                                        <div className="form-field-stagger">
                                            <LoadingButton type="submit" isLoading={forgotLoading} className="enhanced-button">
                                                Verify Code
                                            </LoadingButton>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="Form-p1 form-field-stagger">Enter your email to reset password</p>

                                        <FloatingLabelInput
                                            label="Email Address"
                                            icon={Mail}
                                            type="email"
                                            register={registerForgot('email', {
                                                required: "Email is required",
                                                pattern: {
                                                    value: validEmail,
                                                    message: "Invalid Email format"
                                                }
                                            })}
                                            error={forgotErrors.email}
                                            isValid={forgotEmailValue && validEmail.test(forgotEmailValue) && !forgotErrors.email}
                                        />

                                        {forgotError && <ErrorMessage message={forgotError} onClose={() => setForgotError("")} />}

                                        <div className="form-field-stagger">
                                            <LoadingButton type="submit" isLoading={forgotLoading} className="enhanced-button">
                                                Send Reset Code
                                            </LoadingButton>
                                        </div>
                                    </>
                                )}

                                <p className="Form-p2 mt-4 form-field-stagger">
                                    Remember Password?{" "}
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setCurrentForm("login"); }}
                                        className="Form-a enhanced-link"
                                    >
                                        Back to Login
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Reset Password form */}
                    <div className={`Form-animate ${currentForm === "resetPassword" ? "Form-animate-in z-20" : "Form-animate-out z-0"}`}>
                        <div className="w-full max-w-md p-6 lg:p-8 glass-container rounded-2xl shadow-elevation-3">
                            {resetSuccess ? (
                                <div className="success-fade-in">
                                    <SuccessMessage
                                        message="Password Reset Successful! 🎉"
                                        subMessage="Redirecting to login..."
                                    />
                                </div>
                            ) : (
                                <form onSubmit={handleResetSubmit(onResetSubmit)}>
                                    <h1 className="Form-h1 form-field-stagger">Reset Password</h1>
                                    <p className="Form-p1 form-field-stagger">Enter your new password</p>

                                    <div className="form-field-stagger">
                                        <FloatingLabelInput
                                            label="New Password"
                                            icon={Lock}
                                            type={showPassword ? "text" : "password"}
                                            register={registerReset('newPassword', passwordValidator)}
                                            error={resetErrors.newPassword}
                                            showPassword={showPassword}
                                            togglePassword={() => setShowPassword(!showPassword)}
                                        />

                                        {resetPasswordValue && (
                                            <>
                                                <div className="password-strength-meter">
                                                    <div className={`password-strength-bar ${resetPasswordStrength.label.toLowerCase()}`}></div>
                                                </div>
                                                <p className={`password-strength-text ${resetPasswordStrength.label.toLowerCase()}`}>
                                                    Password Strength: {resetPasswordStrength.label}
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    <FloatingLabelInput
                                        label="Confirm New Password"
                                        icon={Lock}
                                        type={showPassword ? "text" : "password"}
                                        register={registerReset('confirmPassword', {
                                            required: "Confirm your password",
                                            validate: value => value === resetPasswordValue || "Password does not match"
                                        })}
                                        error={resetErrors.confirmPassword}
                                        isValid={resetConfirmPasswordValue && resetConfirmPasswordValue === resetPasswordValue && !resetErrors.confirmPassword}
                                    />

                                    {resetError && <ErrorMessage message={resetError} onClose={() => setResetError("")} />}

                                    <div className="form-field-stagger">
                                        <LoadingButton type="submit" isLoading={resetLoading} className="enhanced-button">
                                            Reset Password
                                        </LoadingButton>
                                    </div>

                                    <p className="Form-p2 form-field-stagger">
                                        <a
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); setCurrentForm("login"); setEmailSent(false); }}
                                            className="Form-a enhanced-link mt-6"
                                        >
                                            Back to Login
                                        </a>
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* register otp form */}
                    <div className={`Form-animate ${currentForm === "verify" ? "Form-animate-in z-20" : "Form-animate-out z-0"}`}>
                        <div className="w-full max-w-md p-6 lg:p-8 glass-container rounded-2xl shadow-elevation-3">
                            {verifySuccess ? (
                                <div className="success-fade-in">
                                    <SuccessMessage
                                        message={`Welcome ${userName} Ji! 🎉`}
                                        subMessage="Redirecting to login..."
                                    />
                                </div>
                            ) : (
                                <form onSubmit={handleVerifySubmit(onVerifySubmit)}>
                                    <h1 className="Form-h1 form-field-stagger">Verify Email</h1>
                                    <p className="Form-p1 form-field-stagger">Enter the 6-digit code sent to {userEmail}</p>

                                    <div className="form-field-stagger">
                                        <OTPInput
                                            length={6}
                                            onComplete={handleOTPComplete}
                                            error={verifyErrors.code}
                                            reset={otpReset}
                                        />
                                    </div>

                                    {verifyErrors.code && <p className="Form-error">{verifyErrors.code.message}</p>}

                                    {verifyError && <ErrorMessage message={verifyError} onClose={() => setVerifyError("")} />}

                                    <p className="Form-p2 border-l-4 border-blue-600 w-max pl-1 rounded mb-4 mt-1 form-field-stagger">
                                        Didn't receive code?{" "}
                                        <a
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); handleResendCode(); }}
                                            className="Form-a enhanced-link"
                                        >
                                            Resend Code
                                        </a>
                                    </p>

                                    <div className="form-field-stagger">
                                        <LoadingButton type="submit" isLoading={verifyLoading} className="enhanced-button">
                                            Verify Email
                                        </LoadingButton>
                                    </div>

                                    <p className="Form-p2 form-field-stagger">
                                        <a
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); setCurrentForm("login"); }}
                                            className="Form-a enhanced-link"
                                        >
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