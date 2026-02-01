import { useState } from "react";
import { passwordValidator } from "../validators/passwordValidator";
import { Eye, EyeOff } from "lucide-react"
import { changePasswordWithAPI } from "../services/authService";
import LoadingButton from "../components/common/LoadingButton"
import ErrorMessage from "../components/common/ErrorMessage"
import SuccessMessage from "../components/common/SuccessMessage"
import { useForm } from "react-hook-form"

export default function Settings() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm()

    const newPasswordValue = watch("newPassword")

    const handlePasswordChange = async (data) => {
        setLoading(true)
        setError("")

        const result = await changePasswordWithAPI(data.currentPassword, data.newPassword)
        setLoading(false)

        if (result.success) {
            setSuccess(true)
            reset()

            setTimeout(() => {
                setSuccess(false)
            }, 3000);
        } else {
            setError(result.error)
        }
    }

    return (
        <div className="min-h-screen p-8 pt-24 bg-black">
            <h1 className="text-4xl font-bold mb-4  text-white">Settings</h1>

            <div className="max-w-2xl">
                <div className="bg-slate-900 p-6 rounded-lg mb-6">
                    <h2 className="text-2xl font-bold mb-4  text-white">Change Password</h2>

                    {success && (
                        <SuccessMessage message="Password Changed Successfully..." subMessage="Your password has been updated." />
                    )}

                    <form onSubmit={handleSubmit(handlePasswordChange)}>

                        <div className="mb-3">
                            <label htmlFor="" className="Profile-label">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="Profile-input pr-10"
                                    placeholder="Enter current password..."
                                    {...register("currentPassword", {
                                        required: "Current password is required."
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute p-1 right-3 top-1/2 -translate-y-1/2 hover:bg-gray-700 rounded"
                                >
                                    {showPassword ? <Eye size={20} className="text-white" /> : <EyeOff size={20} className="text-white" />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="" className="Profile-label">New Password</label>
                            <input
                                className="Profile-input"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new Password..."
                                {...register("newPassword", passwordValidator)}
                            />
                            {errors.newPassword && <p className="Form-error">{error.newPassword.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="" className="Profile-label">Confirm Password</label>
                            <input
                                className="Profile-input"
                                type={showPassword ? "text": "password"}
                                placeholder="Confirm new password..."
                                {...register("confirmPassword" , {
                                    required: "Confirm you password",
                                    validate: value => value === newPasswordValue || "Password don't match"
                                })}
                            />
                            {errors.confirmPassword && <p className="Form-error">{errors.confirmPassword.message}</p>}
                        </div>

                        <ErrorMessage message={error} onClose={() => setError("")}/>

                        <LoadingButton type="submit" isLoading={loading}>Update Password</LoadingButton>
                    </form>
                </div>
            </div>
        </div>
    )
};
