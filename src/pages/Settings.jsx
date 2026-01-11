import { useState } from "react";
import { getCurrentUser } from "../services/authService";

export default function Settings() {
    const currentUser = getCurrentUser()

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handlePasswordChange = ()=>{
        if (currentPassword !== currentUser.password) {
            alert("Current password is incorrect...")
            return
        }
        if (newPassword !== confirmPassword) {
            alert("New Password do not match...")
            return
        }
        if (newPassword.length < 6) {
            alert("Password must be at least 8 characters...")
        }

        const updateUser = {...currentUser, password: newPassword}
        localStorage.setItem("currentUser", JSON.stringify(updateUser))
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        alert("Password updated successfully...")
    }

    
    if (!currentUser) {
        return (
            <div className="p-8 min-h-screen">
                Please <Link to={"/"} className="text-blue-400 font-semibold hover:text-blue-300">login here</Link> to view your profile
            </div>
        )
    }
    return (
        <div className="min-h-screen p-8 pt-24">
            <h1 className="text-4xl font-bold mb-4">Settings</h1>

            <div className="max-w-2xl">
                <div className="bg-slate-900 p-6 rounded-lg mb-6">
                    <h2 className="text-2xl font-bold mb-4">Change Password</h2>

                    <div className="mb-3">
                        <label htmlFor="" className="Profile-label">Current Password</label>
                        <input type="text" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="Profile-input"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="" className="Profile-label">New Password</label>
                        <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="Profile-input" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="" className="Profile-label">Confirm Password</label>
                        <input type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="Profile-input" />
                    </div>

                    <button className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700" onClick={handlePasswordChange}>Update Password</button>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Change Email</h2>
                </div>
            </div>
        </div>
    )


};
