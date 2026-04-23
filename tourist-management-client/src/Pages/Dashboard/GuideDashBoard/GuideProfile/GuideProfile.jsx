import { useContext, useState, useEffect } from "react";
import useSpecificGuide from "../../../../Hooks/useSpecificGuide";
import { AuthContext } from "../../../../Components/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { BallTriangle } from "react-loader-spinner";
import { FiEdit2, FiMail, FiUser, FiImage, FiMessageCircle, FiX, FiCompass } from "react-icons/fi";
import { Link } from "react-router-dom";

const GuideProfile = () => {
    const { updateUserProfile } = useContext(AuthContext);
    const { specificGuide, refetch } = useSpecificGuide();
    const axiosSecure = useAxiosSecure();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [whyGuide, setWhyGuide] = useState("");

    useEffect(() => {
        if (specificGuide) {
            setName(specificGuide?.name || "");
            setPhotoURL(specificGuide?.photo || "");
            setWhyGuide(specificGuide?.whyGuide || "");
        }
    }, [specificGuide]);

    const handleSave = async () => {
        try {
            await updateUserProfile(name, photoURL);
            const guideRes = await axiosSecure.patch(`/guides/${specificGuide?.email}`, {
                username: name,
                userimage: photoURL,
            });
            const userRes = await axiosSecure.patch(`/users/${specificGuide?.email}`, {
                username: name,
                userimage: photoURL,
            });
            if (guideRes.status === 200 && userRes.status === 200) {
                Swal.fire({
                    title: "Profile updated!",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
                refetch();
            }
            setIsModalOpen(false);
        } catch {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Update failed.",
                confirmButtonColor: "#ef4444",
            });
        }
    };

    if (!specificGuide) {
        return (
            <div className="flex justify-center py-20">
                <BallTriangle height={80} width={80} radius={5} color="#10b981" visible={true} />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="heading-md">Welcome, {specificGuide?.name?.split(" ")[0]}</h1>
                <p className="muted mt-1">Your guide profile and controls.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="card-modern overflow-hidden">
                        <div className="h-24 bg-gradient-brand relative">
                            <div className="absolute inset-0 bg-mesh opacity-20" />
                        </div>
                        <div className="p-6 -mt-12 text-center">
                            <div className="relative inline-block">
                                <div className="absolute -inset-1 bg-gradient-brand rounded-full blur opacity-50" />
                                <img
                                    src={specificGuide?.photo || "/default-avatar.png"}
                                    alt={specificGuide?.name}
                                    className="relative w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-soft"
                                />
                            </div>
                            <h2 className="mt-4 text-lg font-semibold text-ink-900">
                                {specificGuide?.name}
                            </h2>
                            <span className="inline-flex items-center gap-1 mt-2 badge-success">
                                <FiCompass /> Tour Guide
                            </span>

                            <div className="mt-5 text-left space-y-2 border-t border-ink-100 pt-4">
                                <div className="flex items-center gap-2 text-sm text-ink-600">
                                    <FiMail className="text-brand-500 flex-shrink-0" />
                                    <span className="truncate">{specificGuide?.email}</span>
                                </div>
                            </div>

                            <button onClick={() => setIsModalOpen(true)} className="mt-5 w-full btn-primary-modern">
                                <FiEdit2 /> Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="card-modern p-6 sm:p-7">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                                <FiMessageCircle className="text-brand-600" />
                            </div>
                            <h3 className="heading-sm">Why I guide</h3>
                        </div>
                        <p className="text-ink-700 leading-relaxed whitespace-pre-line">
                            {specificGuide?.whyGuide || "No reason added yet."}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <Link
                            to="/dashboard/myassignedtour"
                            className="card-modern card-modern-hover p-5 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-sky-50 ring-1 ring-sky-100 flex items-center justify-center">
                                <FiCompass className="text-sky-600" />
                            </div>
                            <p className="mt-4 font-semibold text-ink-900 group-hover:text-brand-700 transition-colors">
                                Assigned Tours
                            </p>
                            <p className="text-xs text-ink-500 mt-1">Review & accept bookings</p>
                        </Link>
                        <Link
                            to="/dashboard/addstoryGuide"
                            className="card-modern card-modern-hover p-5 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-accent-50 ring-1 ring-accent-100 flex items-center justify-center">
                                <FiEdit2 className="text-accent-600" />
                            </div>
                            <p className="mt-4 font-semibold text-ink-900 group-hover:text-brand-700 transition-colors">
                                Add Story
                            </p>
                            <p className="text-xs text-ink-500 mt-1">Inspire travelers</p>
                        </Link>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-md card-modern p-6 sm:p-8 animate-fade-up">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 w-9 h-9 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
                        >
                            <FiX />
                        </button>
                        <h2 className="heading-sm mb-5">Edit guide profile</h2>
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
                                <label className="label-modern">Reason to be a guide</label>
                                <textarea
                                    value={whyGuide}
                                    disabled
                                    rows={4}
                                    className="textarea-modern bg-ink-50 cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={() => setIsModalOpen(false)} className="btn-ghost-modern">
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

export default GuideProfile;
