import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../Components/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useSpecificUser from "../../../../Hooks/useSpecificUser";
import Swal from "sweetalert2";
import { FiEdit2, FiMail, FiUser, FiUserPlus, FiX, FiImage, FiShield } from "react-icons/fi";
import { BallTriangle } from "react-loader-spinner";

const UserProfile = () => {
    const { updateUserProfile } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { specificUser, refetch } = useSpecificUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    useEffect(() => {
        if (specificUser) {
            setName(specificUser?.userName || "");
            setPhotoURL(specificUser?.image || "");
        }
    }, [specificUser]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSave = async () => {
        try {
            await updateUserProfile(name, photoURL);
            const res = await axiosSecure.patch(`/users/${specificUser?.userEmail}`, {
                username: name,
                userimage: photoURL,
            });
            if (res.status === 200) {
                Swal.fire({
                    title: "Profile updated!",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
                refetch();
            } else {
                throw new Error("Failed to update profile");
            }
            closeModal();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Error updating profile`,
                confirmButtonColor: "#ef4444",
            });
        }
    };

    if (!specificUser) {
        return (
            <div className="flex justify-center py-20">
                <BallTriangle height={80} width={80} radius={5} color="#10b981" visible={true} />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="heading-md">Welcome back, {specificUser?.userName?.split(' ')[0]}</h1>
                <p className="muted mt-1">Manage your profile and settings.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile card */}
                <div className="lg:col-span-1">
                    <div className="card-modern overflow-hidden">
                        <div className="h-24 bg-gradient-brand relative">
                            <div className="absolute inset-0 bg-mesh opacity-20" />
                        </div>
                        <div className="p-6 -mt-12 text-center">
                            <div className="relative inline-block">
                                <div className="absolute -inset-1 bg-gradient-brand rounded-full blur opacity-50" />
                                <img
                                    src={specificUser?.image || "/default-avatar.png"}
                                    alt={specificUser?.userName}
                                    className="relative w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-soft"
                                />
                            </div>
                            <h2 className="mt-4 text-lg font-semibold text-ink-900">
                                {specificUser?.userName}
                            </h2>
                            <span className="inline-flex items-center gap-1 mt-2 badge-success">
                                <FiShield /> {specificUser?.role || "User"}
                            </span>

                            <div className="mt-5 text-left space-y-2 border-t border-ink-100 pt-4">
                                <div className="flex items-center gap-2 text-sm text-ink-600">
                                    <FiMail className="text-brand-500 flex-shrink-0" />
                                    <span className="truncate">{specificUser?.userEmail}</span>
                                </div>
                            </div>

                            <button onClick={openModal} className="mt-5 w-full btn-primary-modern">
                                <FiEdit2 /> Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Actions / info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card-modern p-6 sm:p-8 relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-brand-50 rounded-full blur-3xl" />
                        <div className="relative">
                            <span className="badge-success inline-flex mb-3">
                                Opportunity
                            </span>
                            <h3 className="heading-sm mb-2">Become a Tour Guide</h3>
                            <p className="text-ink-600 mb-5 max-w-xl">
                                Share your passion and earn while you explore. Apply today to become a
                                certified JourneySync guide and lead travelers through unforgettable experiences.
                            </p>
                            <Link to="/dashboard/joinguide" className="btn-accent-modern">
                                <FiUserPlus /> Apply to Guide
                            </Link>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <Link
                            to="/dashboard/mybookings"
                            className="card-modern card-modern-hover p-5 group"
                        >
                            <div className="flex items-start justify-between">
                                <div className="w-10 h-10 rounded-xl bg-sky-50 ring-1 ring-sky-100 flex items-center justify-center">
                                    <FiUser className="text-sky-600" />
                                </div>
                            </div>
                            <p className="mt-4 font-semibold text-ink-900 group-hover:text-brand-700 transition-colors">
                                My Bookings
                            </p>
                            <p className="text-xs text-ink-500 mt-1">View and manage your trips</p>
                        </Link>
                        <Link
                            to="/dashboard/addstory"
                            className="card-modern card-modern-hover p-5 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-accent-50 ring-1 ring-accent-100 flex items-center justify-center">
                                <FiEdit2 className="text-accent-600" />
                            </div>
                            <p className="mt-4 font-semibold text-ink-900 group-hover:text-brand-700 transition-colors">
                                Add a Story
                            </p>
                            <p className="text-xs text-ink-500 mt-1">Inspire fellow travelers</p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-md card-modern p-6 sm:p-8 animate-fade-up">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 w-9 h-9 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
                        >
                            <FiX />
                        </button>
                        <h2 className="heading-sm mb-5">Edit profile</h2>
                        <div className="space-y-4">
                            <div className="form-group">
                                <label className="label-modern">Name</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="input-modern pl-10"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label-modern">Photo URL</label>
                                <div className="relative">
                                    <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                                    <input
                                        type="text"
                                        value={photoURL}
                                        onChange={(e) => setPhotoURL(e.target.value)}
                                        className="input-modern pl-10"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label-modern">Email</label>
                                <input
                                    type="email"
                                    defaultValue={specificUser?.userEmail}
                                    disabled
                                    className="input-modern bg-ink-50 cursor-not-allowed"
                                />
                            </div>
                            <div className="form-group">
                                <label className="label-modern">Role</label>
                                <input
                                    type="text"
                                    defaultValue={specificUser?.role}
                                    disabled
                                    className="input-modern bg-ink-50 cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={closeModal} className="btn-ghost-modern">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="btn-primary-modern">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
