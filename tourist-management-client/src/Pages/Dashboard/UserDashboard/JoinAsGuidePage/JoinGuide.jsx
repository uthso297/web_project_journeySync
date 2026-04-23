import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useSpecificUser from "../../../../Hooks/useSpecificUser";
import Swal from "sweetalert2";
import { FiUserPlus, FiType, FiMail, FiLink, FiMessageCircle, FiCheckCircle, FiLoader, FiX } from "react-icons/fi";

const JoinGuide = () => {
    const axiosSecure = useAxiosSecure();
    const { specificUser } = useSpecificUser();
    const [applicationTitle, setApplicationTitle] = useState('');
    const [whyTourGuide, setWhyTourGuide] = useState('');
    const [cvLink, setCvLink] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const name = specificUser?.userName;
    const email = specificUser?.userEmail;
    const role = specificUser?.role;
    const image = specificUser?.image;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!applicationTitle || !whyTourGuide || !cvLink) {
            Swal.fire({
                icon: "error",
                title: "Missing fields",
                text: "Please fill in all fields.",
                confirmButtonColor: "#ef4444",
            });
            return;
        }

        setLoading(true);
        try {
            const applicationData = {
                applicationTitle,
                name,
                userEmail: email,
                whyTourGuide,
                cvLink,
                role,
                image,
            };
            const response = await axiosSecure.post('/applications', applicationData);
            if (response.data) {
                setIsModalOpen(true);
                setApplicationTitle('');
                setWhyTourGuide('');
                setCvLink('');
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Submission failed",
                text: "Please try again later.",
                confirmButtonColor: "#ef4444",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <span className="eyebrow">Apply</span>
                <h1 className="heading-md mt-3">Become a Tour Guide</h1>
                <p className="muted mt-1">
                    Share your passion for travel with our growing community.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="card-modern p-6 sm:p-8 space-y-5">
                <div className="form-group">
                    <label className="label-modern flex items-center gap-2">
                        <FiType className="text-brand-500" /> Application title
                    </label>
                    <input
                        type="text"
                        value={applicationTitle}
                        onChange={(e) => setApplicationTitle(e.target.value)}
                        placeholder="e.g. Experienced trekker applying to guide"
                        className="input-modern"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="label-modern flex items-center gap-2">
                        <FiMail className="text-brand-500" /> Your email
                    </label>
                    <input
                        type="email"
                        value={email || ''}
                        readOnly
                        className="input-modern bg-ink-50 cursor-not-allowed"
                    />
                </div>

                <div className="form-group">
                    <label className="label-modern flex items-center gap-2">
                        <FiMessageCircle className="text-brand-500" /> Why do you want to be a tour guide?
                    </label>
                    <textarea
                        value={whyTourGuide}
                        onChange={(e) => setWhyTourGuide(e.target.value)}
                        rows="5"
                        placeholder="Tell us about your experience, motivation, and what you'd bring to travelers..."
                        className="textarea-modern"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="label-modern flex items-center gap-2">
                        <FiLink className="text-brand-500" /> CV or portfolio link
                    </label>
                    <input
                        type="url"
                        value={cvLink}
                        onChange={(e) => setCvLink(e.target.value)}
                        placeholder="https://..."
                        className="input-modern"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary-modern py-3"
                >
                    {loading ? (
                        <><FiLoader className="animate-spin" /> Submitting...</>
                    ) : (
                        <><FiUserPlus /> Submit Application</>
                    )}
                </button>
            </form>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-sm card-modern p-6 sm:p-8 text-center animate-fade-up">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
                        >
                            <FiX />
                        </button>
                        <div className="inline-flex w-16 h-16 rounded-full bg-brand-50 items-center justify-center mb-4">
                            <FiCheckCircle className="text-brand-500 text-3xl" />
                        </div>
                        <h3 className="heading-sm mb-2">Application submitted!</h3>
                        <p className="text-sm text-ink-500 mb-6">
                            Thanks for applying. We'll review your application and get back to you soon.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-full btn-primary-modern"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JoinGuide;
