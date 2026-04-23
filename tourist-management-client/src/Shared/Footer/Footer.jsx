import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from 'react-share';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FiCompass, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { AuthContext } from '../../Components/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import checkGuide from '../../Hooks/checkGuide';

const shareUrl = 'https://www.facebook.com/share/1BK2SGrqNr/';
const shareUrlT = 'https://t.me/uthso297';
const shareUrlW = 'https://wa.me/1861976409';

const Footer = () => {
    const year = new Date().getFullYear();
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isGuide] = checkGuide();
    const dashboardLink = isAdmin
        ? "/dashboard/adminProfile"
        : isGuide
        ? "/dashboard/guideProfile"
        : "/dashboard/userProfile";

    return (
        <footer className="bg-ink-950 text-ink-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
            <div className="container-page relative py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
                                <FiCompass className="text-white text-xl" />
                            </div>
                            <span className="font-display text-2xl font-bold text-white">
                                Journey<span className="text-brand-400">Sync</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-ink-400 mb-6">
                            Reliable travel service since 2020. Discover destinations,
                            connect with expert guides, share your adventure.
                        </p>
                        <div className="flex items-center gap-2">
                            <FacebookShareButton url={shareUrl}>
                                <FacebookIcon size={36} round />
                            </FacebookShareButton>
                            <TwitterShareButton url={shareUrl}>
                                <XIcon size={36} round />
                            </TwitterShareButton>
                            <TelegramShareButton url={shareUrlT}>
                                <TelegramIcon size={36} round />
                            </TelegramShareButton>
                            <WhatsappShareButton url={shareUrlW}>
                                <WhatsappIcon size={36} round />
                            </WhatsappShareButton>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h6 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Explore
                        </h6>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/" className="hover:text-brand-400 transition-colors">Home</Link></li>
                            <li><Link to="/trips" className="hover:text-brand-400 transition-colors">Trips</Link></li>
                            <li><Link to="/community" className="hover:text-brand-400 transition-colors">Community</Link></li>
                            <li><Link to="/about" className="hover:text-brand-400 transition-colors">About us</Link></li>
                        </ul>
                    </div>

                    {/* Account / Support */}
                    <div>
                        <h6 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            {user ? "Your account" : "Get started"}
                        </h6>
                        <ul className="space-y-3 text-sm">
                            {user ? (
                                <>
                                    <li><Link to={dashboardLink} className="hover:text-brand-400 transition-colors">Dashboard</Link></li>
                                    {!isAdmin && !isGuide && (
                                        <>
                                            <li><Link to="/dashboard/mybookings" className="hover:text-brand-400 transition-colors">My Bookings</Link></li>
                                            <li><Link to="/dashboard/addstory" className="hover:text-brand-400 transition-colors">Share a Story</Link></li>
                                            <li><Link to="/dashboard/joinguide" className="hover:text-brand-400 transition-colors">Become a Guide</Link></li>
                                        </>
                                    )}
                                    {isGuide && (
                                        <>
                                            <li><Link to="/dashboard/myassignedtour" className="hover:text-brand-400 transition-colors">Assigned Tours</Link></li>
                                            <li><Link to="/dashboard/addstoryGuide" className="hover:text-brand-400 transition-colors">Add Story</Link></li>
                                        </>
                                    )}
                                    {isAdmin && (
                                        <>
                                            <li><Link to="/dashboard/manageUsers" className="hover:text-brand-400 transition-colors">Manage Users</Link></li>
                                            <li><Link to="/dashboard/addPackage" className="hover:text-brand-400 transition-colors">Add Package</Link></li>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <li><Link to="/signup" className="hover:text-brand-400 transition-colors">Create account</Link></li>
                                    <li><Link to="/login" className="hover:text-brand-400 transition-colors">Sign in</Link></li>
                                    <li><Link to="/trips" className="hover:text-brand-400 transition-colors">Browse trips</Link></li>
                                    <li><a href="#" className="hover:text-brand-400 transition-colors">Help center</a></li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h6 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Contact
                        </h6>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <FiMapPin className="mt-0.5 text-brand-400 flex-shrink-0" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <FiMail className="mt-0.5 text-brand-400 flex-shrink-0" />
                                <a href="mailto:hello@journeysync.app" className="hover:text-brand-400 transition-colors">
                                    hello@journeysync.app
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <FiPhone className="mt-0.5 text-brand-400 flex-shrink-0" />
                                <span>+880 1861 976409</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-ink-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-ink-500">
                        © {year} JourneySync. All rights reserved.
                    </p>
                    <p className="text-xs text-ink-500">
                        Crafted with care for curious travelers.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
