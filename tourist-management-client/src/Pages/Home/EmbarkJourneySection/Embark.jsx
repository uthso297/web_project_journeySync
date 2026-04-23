import { Link } from "react-router-dom";
import { useContext } from "react";
import { FiArrowRight, FiCompass, FiMap, FiEdit3 } from "react-icons/fi";
import { AuthContext } from "../../../Components/AuthProvider";
import useAdmin from "../../../Hooks/useAdmin";
import checkGuide from "../../../Hooks/checkGuide";

const Embark = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isGuide] = checkGuide();

    const dashboardLink = isAdmin
        ? "/dashboard/adminProfile"
        : isGuide
        ? "/dashboard/guideProfile"
        : "/dashboard/userProfile";

    return (
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url(https://t3.ftcdn.net/jpg/03/04/88/18/360_F_304881889_yJ1S3butl9gVs0kMptYTU2N1EVmEJbz8.jpg)",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink-950/90 via-ink-900/80 to-brand-900/60" />

            <div className="relative container-page py-20 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-white text-sm font-medium mb-6">
                    <FiCompass /> {user ? "Ready for more?" : "Ready when you are"}
                </div>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
                    {user ? (
                        <>
                            Your next adventure
                            <span className="block bg-gradient-to-r from-brand-300 to-accent-400 bg-clip-text text-transparent">
                                is one click away
                            </span>
                        </>
                    ) : (
                        <>
                            Ready to embark on
                            <br />
                            <span className="bg-gradient-to-r from-brand-300 to-accent-400 bg-clip-text text-transparent">
                                your next journey?
                            </span>
                        </>
                    )}
                </h2>
                <p className="mt-6 text-base sm:text-lg text-ink-200 max-w-2xl mx-auto leading-relaxed">
                    {user
                        ? `Welcome back${user.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}. Pick up where you left off — browse trips, manage bookings, or share a new story.`
                        : "Whether you seek thrilling adventures, tranquil escapes, or cultural explorations — now is the perfect time to begin. Your next adventure awaits."}
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                    {user ? (
                        <>
                            <Link to="/trips" className="btn-primary-modern btn-lg-modern group">
                                <FiMap /> Browse Trips
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to={dashboardLink}
                                className="btn-modern btn-lg-modern bg-white/10 hover:bg-white/20 text-white backdrop-blur-md ring-1 ring-white/20"
                            >
                                Go to Dashboard
                            </Link>
                            {!isAdmin && !isGuide && (
                                <Link
                                    to="/dashboard/addstory"
                                    className="btn-modern btn-lg-modern bg-white/10 hover:bg-white/20 text-white backdrop-blur-md ring-1 ring-white/20"
                                >
                                    <FiEdit3 /> Share a Story
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="btn-primary-modern btn-lg-modern group">
                                Create Free Account
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/login" className="btn-modern btn-lg-modern bg-white/10 hover:bg-white/20 text-white backdrop-blur-md ring-1 ring-white/20">
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Embark;
