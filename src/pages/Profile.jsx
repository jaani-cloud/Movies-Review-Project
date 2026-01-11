import { getCurrentUser } from "../services/authService"
import { Link } from "react-router-dom"

export default function Profile() {
    const currentUser = getCurrentUser()

    if (!currentUser) {
        return (
            <div className="p-8 min-h-screen">
                Please <Link to={"/"} className="text-blue-400 font-semibold hover:text-blue-300">login here</Link> to view your profile
            </div>
        )
    }

    return (
        <div className="min-h-screen p-8 pt-24">
            <h1 className="text-4xl font-bold mb-8">MyProfile</h1>

            <div className="bg-slate-900 p-6 rounded-lg max-w-2xl">

                <div className="mb-4">
                    <label htmlFor="" className="text-slate-400 text-sm block mb-1">Profile Photo</label>
                    <div className="w-24 bg-slate-800 h-24 rounded-full flex items-center justify-center text-4xl">
                        {currentUser.profilePhoto ? (
                            <img src={currentUser.profilePhoto} alt="" className="w-24 h-24 rounded-full object-cover"/>
                        ) : "👤"}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="text-slate-400 text-sm block mb-1">Username</label>
                    <p className="text-lg">@{currentUser.username}</p>
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="text-slate-400 text-sm block mb-1">Email</label>
                    <p className="text-lg">{currentUser.email}</p>
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="text-slate-400 text-sm block mb-1">Name</label>
                    <p className="text-lg">{currentUser.firstName} {currentUser.lastName}</p>
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="text-slate-400 text-sm block mb-1">Date of Birth</label>
                    <p className="text-lg">{currentUser.dob || "Not set"}</p>
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="text-slate-400 text-sm block mb-1">Instagram</label>
                    <p className="text-lg">{currentUser.instagram || "Not set"}</p>
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="text-slate-400 text-sm block mb-1">Youtube</label>
                    <p className="text-lg">{currentUser.youtube || "Not set"}</p>
                </div>
            </div>
        </div>
    )
};
