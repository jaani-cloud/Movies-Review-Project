import { useState } from "react"
import { getCurrentUser } from "../services/authService"
import { Link } from "react-router-dom"
import { Instagram, Youtube } from "lucide-react"
import UserReviews from "../components/profile/UserReviews"

export default function Profile() {
    const currentUser = getCurrentUser()
    const [isEdited, setIsEdited] = useState(false)
    const [formData, setFormData] = useState({
        firstName: currentUser?.firstName || "",
        lastName: currentUser?.lastName || "",
        dob: currentUser?.dob || "",
        instagram: currentUser?.instagram || "",
        youtube: currentUser?.youtube || "",
        profilePhoto: currentUser?.profilePhoto || ""
    })

    const handleSave = () => {
        const updateUser = { ...currentUser, ...formData }
        localStorage.setItem("currentUser", JSON.stringify(updateUser))
        setIsEdited(false)
        alert("Your Profile Updated Successfully...")
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
            <h1 className="text-4xl font-bold mb-8">MyProfile</h1>

            <div className="bg-slate-900 p-6 rounded-lg max-w-2xl">

                <div className="mb-4">
                    <label htmlFor="" className="Profile-label">Profile Photo</label>
                    {isEdited ? (
                        <div>
                            <input className="mb-2"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0]
                                    if (file) {
                                        const reader = new FileReader()
                                        reader.onloadend = () => {
                                            setFormData({ ...currentUser, profilePhoto: reader.result })
                                        }
                                        reader.readAsDataURL(file)
                                    }
                                }}
                            />
                            {formData.profilePhoto && (
                                <img src={formData.profilePhoto} className="w-24 h-24 rounded-full object-cover" />
                            )}
                        </div>
                    ) : (
                        <div className="w-24 bg-slate-800 h-24 rounded-full flex items-center justify-center text-4xl">
                            {currentUser.profilePhoto ? (
                                <img src={currentUser.profilePhoto} alt="" className="w-24 h-24 rounded-full object-cover" />
                            ) : "👤"}
                        </div>
                    )}

                </div>

                <div className="mb-4">
                    <label htmlFor="" className="Profile-label">Username</label>
                    {isEdited ? (
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...setFormData, username: e.target.value })}
                            className="Profile-input"
                        />
                    ) : (
                        <p className="text-lg">@{currentUser.username}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="Profile-label">Email</label>
                    <p className="text-lg">{currentUser.email}</p>
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="Profile-label">Name</label>
                    {isEdited ? (
                        <input
                            type="text"
                            value={`${formData.firstName} ${formData.lastName}`}
                            onChange={(e) => {
                                const fullName = e.target.value;
                                const parts = fullName.split(" ")
                                const firstName = parts[0] || ""
                                const lastName = parts.slice(1).join(" ") || ""
                                setFormData({ ...setFormData, firstName, lastName })
                            }}
                            className="Profile-input"
                        />
                    ) : (
                        <p className="text-lg">{currentUser.firstName} {currentUser.lastName}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="Profile-label">Date of Birth</label>
                    {isEdited ? (
                        <input
                            type="date"
                            value={formData.dob}
                            onChange={(e) => setFormData({ ...setFormData, dob: e.target.value })}
                            className="Profile-input"
                        />
                    ) : (
                        <p className="text-lg">{currentUser.dob || "Not set"}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="Profile-label">Instagram</label>
                    {isEdited ? (
                        <input
                            type="text"
                            placeholder="Enter the username"
                            value={formData.instagram}
                            onChange={(e) => setFormData({ ...setFormData, instagram: e.target.value })}
                            className="Profile-input"
                        />
                    ) : (
                        currentUser.instagram ? (
                            <>
                                <a className="flex items-center gap-2 text-pink-400 hover:text-pink-300 text-lg"
                                    href={`https://instagram.com/${currentUser.instagram.replace("@", "")}`}
                                    target="_blank"
                                >
                                    <Instagram size={20} />
                                    @{currentUser.instagram.replace("@", "")}
                                </a>
                            </>) : (
                            <>
                                <p className="text-lg">Not Set</p>
                            </>)
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="Profile-label">Youtube</label>
                    {isEdited ? (
                        <input
                            type="text"
                            value={formData.youtube}
                            onChange={(e) => setFormData({ ...setFormData, youtube: e.target.value })}
                            className="Profile-input"
                        />
                    ) : (
                        currentUser.youtube ? (
                            <>
                                <a className="flex items-center gap-2 text-red-400 hover:text-red-300 text-lg"
                                    href={currentUser.youtube.startsWith("http") ? currentUser.youtube : `https://youtube.com/@${currentUser.youtube.replace("@", "")}`}
                                    target="_blank"
                                >
                                    <Youtube size={20}/>
                                    {currentUser.youtube.startsWith("http") ? "Visit Channel" : `@${currentUser.youtube.replace("@", "")}`}
                                </a>
                            </>
                        ) : (
                            <>
                                <p className="text-lg">Not Set</p>
                            </>
                        )
                    )}
                </div>

                {isEdited && (
                    <button className="bg-green-600 px-6 py-2 rounded-lg mr-3 hover:bg-green-700"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                )}

                <button
                    onClick={() => setIsEdited(!isEdited)}
                    className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    {isEdited ? "Cancel" : "Edit Profile"}
                </button>
            </div>
            <UserReviews userId={currentUser.id}/>
        </div>
    )
};
