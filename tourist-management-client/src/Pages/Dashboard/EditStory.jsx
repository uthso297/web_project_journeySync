import { useParams } from "react-router-dom";
import useSpecificStoryById from "../../Hooks/useSpecificStoryById";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { BallTriangle } from "react-loader-spinner";
import { FiType, FiAlignLeft, FiImage, FiX, FiPlus, FiSave, FiCheckCircle } from "react-icons/fi";

const EditStory = () => {
    const { id } = useParams();
    const [specificStory, isLoading, refetch] = useSpecificStoryById(id);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [newImage, setNewImage] = useState("");
    const [removedImages, setRemovedImages] = useState([]);
    const [message, setMessage] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!isLoading && specificStory) {
            setTitle(specificStory.title);
            setDescription(specificStory.description);
            setImages(specificStory.images || []);
        }
    }, [specificStory, isLoading]);

    const handleRemoveImage = (imageToRemove) => {
        if (!removedImages.includes(imageToRemove)) {
            setRemovedImages([...removedImages, imageToRemove]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSubmit = {
                title,
                description,
                newImages: newImage ? [newImage] : [],
                removedImages,
            };
            const response = await axiosSecure.patch(`/stories/${id}`, dataToSubmit);
            if (response.data) {
                const updatedStory = response.data;
                setImages(updatedStory.images);
                setNewImage("");
                setRemovedImages([]);
                setMessage("Story updated successfully!");
                refetch();
            }
        } catch (error) {
            setMessage("Failed to update the story. Please try again.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <BallTriangle height={80} width={80} radius={5} color="#10b981" visible={true} />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <span className="eyebrow">Edit</span>
                <h1 className="heading-md mt-3">Edit your story</h1>
                <p className="muted mt-1">Polish your story and keep your travelers inspired.</p>
            </div>

            {message && (
                <div className="mb-5 p-3 rounded-xl bg-emerald-50 ring-1 ring-emerald-200 flex items-center gap-2 text-sm text-emerald-800 animate-fade-up">
                    <FiCheckCircle className="text-emerald-600" /> {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="card-modern p-6 sm:p-8 space-y-5">
                <div className="form-group">
                    <label className="label-modern flex items-center gap-2">
                        <FiType className="text-brand-500" /> Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-modern"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="label-modern flex items-center gap-2">
                        <FiAlignLeft className="text-brand-500" /> Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="6"
                        className="textarea-modern"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="label-modern flex items-center gap-2">
                        <FiImage className="text-brand-500" /> Current images
                    </label>
                    <p className="text-xs text-ink-500 mb-3">
                        Click remove to mark an image for deletion, then save changes.
                    </p>
                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {images.map((image, index) => {
                                const willRemove = removedImages.includes(image);
                                return (
                                    <div
                                        key={index}
                                        className={`relative group rounded-xl overflow-hidden ring-1 ${
                                            willRemove ? "ring-red-300 opacity-50" : "ring-ink-100"
                                        }`}
                                    >
                                        <img src={image} alt="" className="w-full aspect-square object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(image)}
                                            disabled={willRemove}
                                            className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/95 shadow-soft flex items-center justify-center text-red-600 hover:bg-red-50"
                                        >
                                            <FiX />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-ink-500">No images attached.</p>
                    )}
                </div>

                <div className="form-group">
                    <label className="label-modern flex items-center gap-2">
                        <FiPlus className="text-brand-500" /> Add new image URL
                    </label>
                    <input
                        type="url"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        placeholder="https://..."
                        className="input-modern"
                    />
                </div>

                <button type="submit" className="w-full btn-primary-modern py-3">
                    <FiSave /> Save changes
                </button>
            </form>
        </div>
    );
};

export default EditStory;
