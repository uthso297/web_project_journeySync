import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FiMail, FiUser, FiMessageCircle } from "react-icons/fi";

const Guide = ({ email }) => {
    const [guide, setGuide] = useState({});
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get(`/guide/${email}`).then(res => setGuide(res.data));
    }, [email]);

    return (
        <section className="relative py-16 bg-ink-50/50 min-h-[60vh]">
            <div className="absolute inset-0 bg-gradient-hero h-64" />
            <div className="relative container-page">
                <div className="max-w-2xl mx-auto">
                    <div className="card-modern overflow-hidden">
                        <div className="relative h-32 bg-gradient-brand">
                            <div className="absolute inset-0 bg-mesh opacity-20" />
                        </div>
                        <div className="p-6 sm:p-8 -mt-16 text-center">
                            <div className="relative inline-block">
                                <div className="absolute -inset-1 bg-gradient-brand rounded-full blur opacity-50" />
                                <img
                                    src={guide.photo || "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"}
                                    alt={guide.name || "Guide"}
                                    className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-white shadow-soft"
                                />
                            </div>

                            <h1 className="heading-sm mt-4 flex items-center justify-center gap-2">
                                <FiUser className="text-brand-500" />
                                {guide.name || "Tour Guide"}
                            </h1>

                            <a
                                href={`mailto:${guide.email}`}
                                className="mt-2 inline-flex items-center gap-2 text-sm text-ink-600 hover:text-brand-700 transition-colors"
                            >
                                <FiMail className="text-brand-500" />
                                {guide.email}
                            </a>

                            {guide.whyGuide && (
                                <div className="mt-6 p-4 rounded-2xl bg-ink-50 ring-1 ring-ink-100 text-left">
                                    <div className="flex items-start gap-3">
                                        <FiMessageCircle className="text-brand-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-1">
                                                Why I guide
                                            </p>
                                            <p className="text-sm text-ink-700 leading-relaxed">
                                                {guide.whyGuide}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <a
                                href={`mailto:${guide.email}`}
                                className="mt-6 btn-primary-modern"
                            >
                                <FiMail /> Contact Guide
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Guide;
