import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../Components/AuthProvider';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FiEdit3, FiImage, FiUploadCloud, FiType, FiAlignLeft, FiLoader } from 'react-icons/fi';

const AddStoriesUser = () => {
    const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const uploadedImageUrls = [];
        for (let i = 0; i < images.length; i++) {
            const imageFile = { image: images[i] };
            try {
                const res = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                uploadedImageUrls.push(res.data.data.display_url);
            } catch (err) {
                console.error('Error uploading image:', err);
            }
        }

        setUploadedImages(uploadedImageUrls);

        const formData = {
            title,
            description,
            images: uploadedImageUrls,
            email: user?.email,
        };

        axiosSecure.post('/stories', formData).then((res) => {
            if (res.data.insertedId) {
                setTitle('');
                setDescription('');
                setImages([]);
                Swal.fire({
                    title: "Story published!",
                    text: "Thanks for sharing your journey.",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
            }
            setSubmitting(false);
        }).catch(() => setSubmitting(false));
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <span className="eyebrow">Share</span>
                <h1 className="heading-md mt-3">Add a new story</h1>
                <p className="muted mt-1">Inspire fellow travelers with your experience.</p>
            </div>

            <form onSubmit={handleSubmit} className="card-modern p-6 sm:p-8 space-y-5">
                <div className="form-group">
                    <label className="label-modern flex items-center gap-2">
                        <FiType className="text-brand-500" /> Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="An unforgettable sunrise in Sajek..."
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
                        placeholder="Tell us about your journey, the people you met, and moments that stuck..."
                        rows="6"
                        className="textarea-modern"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="label-modern flex items-center gap-2">
                        <FiImage className="text-brand-500" /> Photos
                    </label>
                    <label className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-ink-200 hover:border-brand-400 hover:bg-brand-50/30 transition-colors cursor-pointer">
                        <FiUploadCloud className="text-3xl text-ink-400" />
                        <div className="text-sm text-ink-700 font-medium">
                            {images.length > 0
                                ? `${images.length} file${images.length > 1 ? "s" : ""} selected`
                                : "Click to upload images"}
                        </div>
                        <p className="text-xs text-ink-500">Multiple files supported · Max 5MB each</p>
                        <input
                            type="file"
                            onChange={(e) => setImages(e.target.files)}
                            multiple
                            accept="image/*"
                            className="hidden"
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary-modern py-3"
                >
                    {submitting ? (
                        <>
                            <FiLoader className="animate-spin" /> Publishing...
                        </>
                    ) : (
                        <>
                            <FiEdit3 /> Publish Story
                        </>
                    )}
                </button>

                {uploadedImages.length > 0 && (
                    <div className="border-t border-ink-100 pt-5">
                        <p className="text-sm font-semibold text-ink-900 mb-3">Uploaded images</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {uploadedImages.map((url, i) => (
                                <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                                    <img src={url} alt={`upload-${i}`} className="w-full h-20 object-cover rounded-lg ring-1 ring-ink-100 hover:ring-brand-400 transition-all" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddStoriesUser;
