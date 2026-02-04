import { useState, useEffect } from "react"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getProfileWithAPI, updateProfileWithAPI, logout } from "../services/authService"
import { useNavigate } from "react-router-dom"
import { Instagram, Youtube, Mail, Calendar, User, Camera } from "lucide-react"
import UserReviews from "../components/profile/UserReviews"
import { formatDate } from "../utils/formatters"
import ProfilePageSkeleton from "../components/Skeleton/ProfilePageSkeleton"
import { showAlert } from "../components/common/CustomAlert"
import LoadingButton from "../components/common/LoadingButton"

export default function Profile() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [isEdited, setIsEdited] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dob: "",
        instagram: "",
        youtube: "",
        profilePhoto: ""
    })
    const [editingName, setEditingName] = useState("")

    const { data: currentUser, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const result = await getProfileWithAPI()
            if (!result.success) {
                throw new Error(result.error || "Failed to load profile")
            }
            return result.user
        },
        staleTime: 2 * 60 * 1000,
        refetchOnWindowFocus: true,
    })

    useEffect(() => {
        if (currentUser) {
            setFormData({
                firstName: currentUser.firstName || "",
                lastName: currentUser.lastName || "",
                phoneNumber: currentUser.phoneNumber || "",
                dob: currentUser.dob ? currentUser.dob.split("T")[0] : "",
                instagram: currentUser.instagram || "",
                youtube: currentUser.youtube || "",
                profilePhoto: currentUser.profilePhoto || ""
            })
        }
    }, [currentUser])

    const handleSave = async () => {
        setIsSaving(true)
        const { profilePhoto, ...apiData } = formData
        const result = await updateProfileWithAPI(formData)

        if (result.success) {
            const updatedUser = {
                ...result.user,
                profilePhoto: profilePhoto
            }

            localStorage.setItem("currentUser", JSON.stringify(updatedUser))
            queryClient.invalidateQueries(['profile'])
            setIsEdited(false)
            showAlert("Profile updated successfully!", "success")
        } else {
            showAlert(result.error || "Failed to update profile", "error")
        }
        setIsSaving(false)
    }

    // Show combined skeleton with loading spinner overlay
    if (isLoading) {
        return <ProfilePageSkeleton />;
    }

    if (error || !currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <p className="text-white text-xl mb-4">Please login to view your profile</p>
                    <button
                        onClick={() => {
                            logout()
                            navigate("/login")
                        }}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Login Here
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">My Profile</h1>
                    <p className="text-gray-400">Manage your account information</p>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
                    <div className="relative h-32 bg-gradient-to-r from-slate-600 via-blue-500 to-slate-500">
                        <div className="absolute -bottom-16 left-6 sm:left-8">
                            <div className="relative">
                                {isEdited ? (
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="photo-upload"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files[0]
                                                if (file) {
                                                    const reader = new FileReader()
                                                    reader.onloadend = () => {
                                                        setFormData({ ...formData, profilePhoto: reader.result })
                                                    }
                                                    reader.readAsDataURL(file)
                                                }
                                            }}
                                        />
                                        <label htmlFor="photo-upload" className="cursor-pointer">
                                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity">
                                                {formData.profilePhoto ? (
                                                    <img src={formData.profilePhoto} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Camera size={40} className="text-gray-400" />
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                ) : (
                                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                                        {currentUser.profilePhoto ? (
                                            <img src={currentUser.profilePhoto} className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={50} className="text-gray-400" />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 px-6 sm:px-8 pb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                                    <Mail size={16} />
                                    Email
                                </label>
                                <p className="text-lg text-white bg-slate-800/50 rounded-lg px-4 py-3">{currentUser.email}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                                    <User size={16} />
                                    Full Name
                                </label>
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
                                        className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="Enter your full name"
                                    />
                                ) : (
                                    <p className="text-lg text-white bg-slate-800/50 rounded-lg px-4 py-3">
                                        {currentUser.firstName} {currentUser.lastName}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                                    <Calendar size={16} />
                                    Date of Birth
                                </label>
                                {isEdited ? (
                                    <input
                                        type="date"
                                        value={formData.dob}
                                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                        className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                ) : (
                                    <p className="text-lg text-white bg-slate-800/50 rounded-lg px-4 py-3">
                                        {formatDate(currentUser.dob) || "Not set"}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                                    <Instagram size={16} />
                                    Instagram
                                </label>
                                {isEdited ? (
                                    <input
                                        type="text"
                                        placeholder="@username"
                                        value={formData.instagram}
                                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                        className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                ) : (
                                    currentUser.instagram ? (
                                        <a
                                            className="flex items-center gap-2 text-lg text-pink-400 hover:text-pink-300 bg-slate-800/50 rounded-lg px-4 py-3 transition-colors"
                                            href={`https://instagram.com/${currentUser.instagram.replace("@", "")}`}
                                            target="_blank"
                                        >
                                            <Instagram size={20} />
                                            @{currentUser.instagram.replace("@", "")}
                                        </a>
                                    ) : (
                                        <p className="text-lg text-gray-500 bg-slate-800/50 rounded-lg px-4 py-3">Not set</p>
                                    )
                                )}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                                    <Youtube size={16} />
                                    YouTube
                                </label>
                                {isEdited ? (
                                    <input
                                        type="text"
                                        placeholder="@channel or URL"
                                        value={formData.youtube}
                                        onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                                        className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                ) : (
                                    currentUser.youtube ? (
                                        <a
                                            className="flex items-center gap-2 text-lg text-red-400 hover:text-red-300 bg-slate-800/50 rounded-lg px-4 py-3 transition-colors"
                                            href={currentUser.youtube.startsWith("http") ? currentUser.youtube : `https://youtube.com/@${currentUser.youtube.replace("@", "")}`}
                                            target="_blank"
                                        >
                                            <Youtube size={20} />
                                            {currentUser.youtube.startsWith("http") ? "Visit Channel" : `@${currentUser.youtube.replace("@", "")}`}
                                        </a>
                                    ) : (
                                        <p className="text-lg text-gray-500 bg-slate-800/50 rounded-lg px-4 py-3">Not set</p>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8 w-max">
                            {isEdited && (
                                <LoadingButton
                                    onClick={handleSave}
                                    isLoading={isSaving}
                                    className=""
                                >
                                    Save Changes
                                </LoadingButton>

                            )}
                            <button
                                onClick={() => {
                                    setIsEdited(!isEdited)
                                    if (!isEdited) {
                                        setEditingName(`${currentUser.firstName} ${currentUser.lastName}`)
                                    }
                                }}
                                className="px-6 h-max py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
                            >
                                {isEdited ? "Cancel" : "Edit Profile"}
                            </button>
                        </div>
                    </div>
                </div>

                <UserReviews userId={currentUser.id} />
            </div>
        </div>
    )
}