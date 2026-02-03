import { useState, useEffect } from "react"
import { getProfileWithAPI, updateProfileWithAPI } from "../services/authService"
import { Link, useNavigate } from "react-router-dom"
import { Instagram, Youtube } from "lucide-react"
import UserReviews from "../components/profile/UserReviews"
import { formatDate } from "../utils/formatters";
import {logout} from "../services/authService"

export default function Profile() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEdited, setIsEdited] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dob: "",
        instagram: "",
        youtube: "",
        profilePhoto: ""
    });

    const [editingName, setEditingName] = useState("")

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            const result = await getProfileWithAPI();

            if (result.success) {
                setCurrentUser(result.user);
                setFormData({
                    firstName: result.user.firstName || "",
                    lastName: result.user.lastName || "",
                    phoneNumber: result.user.phoneNumber || "",
                    dob: result.user.dob ? result.user.dob.split("T")[0] : "",
                    instagram: result.user.instagram || "",
                    youtube: result.user.youtube || "",
                    profilePhoto: result.user.profilePhoto || ""
                });
            }

            setLoading(false);
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        setLoading(true)

        const { profilePhoto, ...apiData } = formData
        console.log('apiData: ', apiData);
        const result = await updateProfileWithAPI(formData)

        if (result.success) {
            const updateUser = {
                ...result.user,
                profilePhoto: profilePhoto
            }

            setCurrentUser(updateUser)
            localStorage.setItem("currentUser", JSON.stringify(updateUser))
            setIsEdited(false)
            alert("Your Profile Updated Successfully...")
        } else {
            alert(result.error || "Failed to update profile...")
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <div className="mt-2">Loading..</div>
            </div>
        )
    }

    if (!currentUser) {
        return (
            <div className="min-h-screen p-8">
                Please <button onClick={() => {
                    logout()
                    navigate("/login")
                }} className="font-semibold text-blue-400 hover:text-blue-300">login here</button> to view your profile
            </div>
        )
    }

    return (
        <div className="min-h-screen p-8 pt-24 bg-black">
            <h1 className="mb-8 text-4xl font-bold  text-white">MyProfile</h1>

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
                    <label htmlFor="" className="Profile-label">Email</label>
                    <p className="text-lg text-white">{currentUser.email}</p>
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
                        <p className="text-lg text-white">{currentUser.firstName} {currentUser.lastName}</p>
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
                        <p className="text-lg text-white">{formatDate(currentUser.dob) || "Not set"}</p>
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
                                <p className="text-lg text-white">Not Set</p>
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
                                <p className="text-lg text-white">Not Set</p>
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
                    className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
                >
                    {isEdited ? "Cancel" : "Edit Profile"}
                </button>
            </div>
            <UserReviews userId={currentUser.id} />
        </div>
    )
};
