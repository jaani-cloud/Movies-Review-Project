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
    const [editingName, setEditingName] = useState("")

    const handleSave = () => {
        const updateUser = { ...currentUser, ...formData }
        localStorage.setItem("currentUser", JSON.stringify(updateUser))
        setIsEdited(false)
        alert("Your Profile Updated Successfully...")
    }

    if (!currentUser) {
        return (
            <div className="min-h-screen p-8">
                Please <Link to={"/"} className="font-semibold text-blue-400 hover:text-blue-300">login here</Link> to view your profile
            </div>
        )
    }

    return (
        <div className="min-h-screen p-8 pt-24">
            <h1 className="mb-8 text-4xl font-bold">MyProfile</h1>

            <div className="max-w-2xl p-6 rounded-lg bg-slate-900">

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
                                <img src={formData.profilePhoto} className="object-cover w-24 h-24 rounded-full" />
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-24 h-24 text-4xl rounded-full bg-slate-800">
                            {currentUser.profilePhoto ? (
                                <img src={currentUser.profilePhoto} alt="" className="object-cover w-24 h-24 rounded-full" />
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
                            value={editingName}
                            onChange={(e) => {
                                setEditingName(e.target.value)
                                const parts = e.target.value.split(/\s+/)
                                setFormData({
                                    ...formData,
                                    firstName: parts[0] || "",
                                    lastName: parts.slice(1).join(" ") || ""
                                })
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
                                <a className="flex items-center gap-2 text-lg text-pink-400 hover:text-pink-300"
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
                                <a className="flex items-center gap-2 text-lg text-red-400 hover:text-red-300"
                                    href={currentUser.youtube.startsWith("http") ? currentUser.youtube : `https://youtube.com/@${currentUser.youtube.replace("@", "")}`}
                                    target="_blank"
                                >
                                    <Youtube size={20} />
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
                    <button className="px-6 py-2 mr-3 bg-green-600 rounded-lg hover:bg-green-700"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                )}

                <button
                    onClick={() => {
                        setIsEdited(!isEdited)
                        if (!isEdited) {
                            setEditingName(`${currentUser.firstName} ${currentUser.lastName}`)
                        }
                    }}
                    className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    {isEdited ? "Cancel" : "Edit Profile"}
                </button>
            </div>
            <UserReviews userId={currentUser.id} />
        </div>
    )
};
