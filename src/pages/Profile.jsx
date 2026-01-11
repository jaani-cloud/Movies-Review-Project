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
                    <label htmlFor="" className="text-slate-400 text-sm block mb-1">Username</label>
                    <p className="text-lg">@{currentUser.username}</p>
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="text-slate-400 text-sm block mb-1">Email</label>
                    <p className="text-lg">{currentUser.email}</p>
                </div>

                <div>
                    <label htmlFor="" className="text-slate-400 text-sm block mb-1">Name</label>
                    <p className="text-lg">{currentUser.firstName} {currentUser.lastName}</p>
                </div>
            </div>
        </div>
    )
};
