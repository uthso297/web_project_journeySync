import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiPackage, FiDollarSign, FiAlignLeft, FiStar, FiCalendar, FiImage, FiMap, FiPlus } from "react-icons/fi";

const initialState = {
    photos: [],
    tourType: "",
    tripTitle: "",
    price: "",
    tourInformation: { overview: "", highlights: [] },
    tourPlan: {
        day1: { activities: "" },
        day2: { activities: "" },
    },
};

const AddPackage = () => {
    const axiosSecure = useAxiosSecure();
    const [tourData, setTourData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTourData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const packageData = { ...tourData, price: parseFloat(tourData.price) };
        try {
            const result = await axiosSecure.post("/tourPackages", packageData);
            if (result.data.insertedId) {
                Swal.fire({
                    title: "Package added!",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
            }
            setTourData(initialState);
        } catch (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Failed to add package.",
                confirmButtonColor: "#ef4444",
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <span className="eyebrow">New</span>
                <h1 className="heading-md mt-3">Add a tour package</h1>
                <p className="muted mt-1">Create a new trip for travelers to discover.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basics */}
                <div className="card-modern p-6 sm:p-8 space-y-5">
                    <h2 className="heading-sm mb-1">Basics</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="form-group sm:col-span-2">
                            <label className="label-modern flex items-center gap-2">
                                <FiPackage className="text-brand-500" /> Trip title
                            </label>
                            <input
                                type="text"
                                name="tripTitle"
                                value={tourData.tripTitle}
                                onChange={handleChange}
                                className="input-modern"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-modern flex items-center gap-2">
                                <FiMap className="text-brand-500" /> Tour type
                            </label>
                            <input
                                type="text"
                                name="tourType"
                                value={tourData.tourType}
                                onChange={handleChange}
                                placeholder="e.g. Adventure, Beach, Cultural"
                                className="input-modern"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-modern flex items-center gap-2">
                                <FiDollarSign className="text-brand-500" /> Price (USD)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={tourData.price}
                                onChange={handleChange}
                                className="input-modern"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="card-modern p-6 sm:p-8 space-y-5">
                    <h2 className="heading-sm mb-1">Tour information</h2>
                    <div className="form-group">
                        <label className="label-modern flex items-center gap-2">
                            <FiAlignLeft className="text-brand-500" /> Overview
                        </label>
                        <textarea
                            rows={5}
                            value={tourData.tourInformation.overview}
                            onChange={(e) =>
                                setTourData((prev) => ({
                                    ...prev,
                                    tourInformation: { ...prev.tourInformation, overview: e.target.value },
                                }))
                            }
                            className="textarea-modern"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="label-modern flex items-center gap-2">
                            <FiStar className="text-brand-500" /> Highlights
                        </label>
                        <input
                            type="text"
                            value={tourData.tourInformation.highlights.join(",")}
                            onChange={(e) =>
                                setTourData((prev) => ({
                                    ...prev,
                                    tourInformation: {
                                        ...prev.tourInformation,
                                        highlights: e.target.value.split(",").map((s) => s.trim()),
                                    },
                                }))
                            }
                            placeholder="Comma-separated (e.g. Sunrise hike, Local cuisine, Boat ride)"
                            className="input-modern"
                            required
                        />
                    </div>
                </div>

                {/* Plan */}
                <div className="card-modern p-6 sm:p-8 space-y-5">
                    <h2 className="heading-sm mb-1 flex items-center gap-2">
                        <FiCalendar className="text-brand-500" /> Tour plan
                    </h2>
                    <div className="form-group">
                        <label className="label-modern">Day 1 activities</label>
                        <textarea
                            rows={4}
                            value={tourData.tourPlan.day1.activities}
                            onChange={(e) =>
                                setTourData((prev) => ({
                                    ...prev,
                                    tourPlan: {
                                        ...prev.tourPlan,
                                        day1: { activities: e.target.value },
                                    },
                                }))
                            }
                            className="textarea-modern"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="label-modern">Day 2 activities</label>
                        <textarea
                            rows={4}
                            value={tourData.tourPlan.day2.activities}
                            onChange={(e) =>
                                setTourData((prev) => ({
                                    ...prev,
                                    tourPlan: {
                                        ...prev.tourPlan,
                                        day2: { activities: e.target.value },
                                    },
                                }))
                            }
                            className="textarea-modern"
                            required
                        />
                    </div>
                </div>

                {/* Photos */}
                <div className="card-modern p-6 sm:p-8">
                    <h2 className="heading-sm mb-5 flex items-center gap-2">
                        <FiImage className="text-brand-500" /> Photos
                    </h2>
                    <div className="form-group">
                        <label className="label-modern">Photo URLs</label>
                        <input
                            type="text"
                            value={tourData.photos.join(",")}
                            onChange={(e) =>
                                setTourData((prev) => ({
                                    ...prev,
                                    photos: e.target.value.split(",").map((u) => u.trim()),
                                }))
                            }
                            placeholder="Comma-separated URLs"
                            className="input-modern"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="w-full btn-primary-modern py-3 text-base">
                    <FiPlus /> Add package
                </button>
            </form>
        </div>
    );
};

export default AddPackage;
