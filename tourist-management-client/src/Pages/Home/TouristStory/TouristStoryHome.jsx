import { useContext } from "react";
import TouristSlider from "./TouristSlider";
import { FacebookIcon, FacebookShareButton } from "react-share";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Components/AuthProvider";
import { FiArrowRight, FiEdit3, FiShare2 } from "react-icons/fi";

const TouristStoryHome = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const shareUrl = 'https://journey-sync-91305.web.app/community';

    const handleShare = () => {
        if (!user) navigate('/login');
    };

    return (
        <section className="section bg-ink-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
            <div className="container-page relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <span className="eyebrow bg-white/10 text-brand-300 ring-white/10">
                            <FiShare2 /> Traveler Stories
                        </span>
                        <h2 className="heading-lg text-white">
                            Real journeys,<br />
                            <span className="text-brand-400">real inspiration</span>
                        </h2>
                        <p className="text-ink-300 leading-relaxed max-w-xl">
                            Hear directly from travelers about their memorable experiences — breathtaking views, hidden gems, and life-changing moments. Let their stories inspire your next adventure.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link to='/community' className="btn-primary-modern group">
                                All Stories
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to='/dashboard/addstory' className="btn-modern bg-white/10 hover:bg-white/20 text-white ring-1 ring-white/20">
                                <FiEdit3 /> Add Story
                            </Link>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <span className="text-sm text-ink-400">Share it on Facebook:</span>
                            {user ? (
                                <FacebookShareButton url={shareUrl}>
                                    <FacebookIcon size={36} round />
                                </FacebookShareButton>
                            ) : (
                                <button onClick={handleShare} aria-label="Share on Facebook">
                                    <FacebookIcon size={36} round />
                                </button>
                            )}
                        </div>
                    </div>

                    <div>
                        <TouristSlider />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TouristStoryHome;
