import { useState } from "react";
import { passwordValidator } from "../validators/passwordValidator";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";
import { changePasswordWithAPI } from "../services/authService";
import LoadingButton from "../components/common/LoadingButton";
import { showAlert } from "../components/common/CustomAlert";
import { useForm } from "react-hook-form";

export default function Settings() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    const newPasswordValue = watch("newPassword");

    const handlePasswordChange = async (data) => {
        setLoading(true);

        const result = await changePasswordWithAPI(data.currentPassword, data.newPassword);
        setLoading(false);

        if (result.success) {
            showAlert("Password changed successfully!", "success");
            reset();
        } else {
            showAlert(result.error || "Failed to change password", "error");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-red-600 to-red-500 rounded-lg">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white">Settings</h1>
                    </div>
                    <p className="text-gray-400">Manage your account security</p>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
                    <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 p-6 border-b border-slate-700">
                        <div className="flex items-center gap-2">
                            <Lock className="w-5 h-5 text-red-500" />
                            <h2 className="text-xl sm:text-2xl font-bold text-white">Change Password</h2>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">Update your password to keep your account secure</p>
                    </div>

                    <form onSubmit={handleSubmit(handlePasswordChange)} className="p-6 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500 border border-slate-700 transition-all"
                                    placeholder="Enter current password"
                                    {...register("currentPassword", {
                                        required: "Current password is required"
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    {showPassword ?
                                        <Eye className="w-5 h-5 text-gray-400" /> :
                                        <EyeOff className="w-5 h-5 text-gray-400" />
                                    }
                                </button>
                            </div>
                            {errors.currentPassword && (
                                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                                    <span>⚠️</span> {errors.currentPassword.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                New Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 border border-slate-700 transition-all"
                                placeholder="Enter new password"
                                {...register("newPassword", passwordValidator)}
                            />
                            {errors.newPassword && (
                                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                                    <span>⚠️</span> {errors.newPassword.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 border border-slate-700 transition-all"
                                placeholder="Confirm new password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => value === newPasswordValue || "Passwords don't match"
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                                    <span>⚠️</span> {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <div className="pt-4">
                            <LoadingButton
                                type="submit"
                                isLoading={loading}
                                className="w-full"
                            >
                                Update Password
                            </LoadingButton>
                        </div>
                    </form>
                </div>

                <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                    <h3 className="text-sm font-semibold text-white mb-2">Password Requirements:</h3>
                    <ul className="text-xs text-gray-400 space-y-1">
                        <li>• At least 8 characters long</li>
                        <li>• Contains uppercase and lowercase letters</li>
                        <li>• Includes at least one number</li>
                        <li>• Has at least one special character</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}