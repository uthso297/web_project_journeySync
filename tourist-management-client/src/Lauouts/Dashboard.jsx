import { Link, NavLink, Outlet } from "react-router-dom";
import { motion } from "motion/react";
import { useContext, useState } from "react";
import useAdmin from "../Hooks/useAdmin";
import checkGuide from "../Hooks/checkGuide";
import { AuthContext } from "../Components/AuthProvider";
import {
    FiCompass, FiHome, FiUser, FiBookmark, FiEdit3, FiPlusSquare,
    FiUserPlus, FiUsers, FiPackage, FiMap, FiMenu, FiX, FiLogOut,
    FiChevronRight, FiLayers, FiShield
} from "react-icons/fi";
import Swal from "sweetalert2";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isGuide] = checkGuide();
    const { user, logOut } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logOut().then(() => {
            Swal.fire({
                title: "Signed out",
                icon: "success",
                confirmButtonColor: "#10b981",
            });
        });
    };

    const adminLinks = [
        { to: "/dashboard/adminProfile", label: "Dashboard", icon: FiShield },
        { to: "/dashboard/manageCandidates", label: "Manage Candidates", icon: FiUserPlus },
        { to: "/dashboard/addPackage", label: "Add Package", icon: FiPlusSquare },
        { to: "/dashboard/manageUsers", label: "Manage Users", icon: FiUsers },
    ];
    const guideLinks = [
        { to: "/dashboard/guideProfile", label: "My Profile", icon: FiUser },
        { to: "/dashboard/myassignedtour", label: "Assigned Tours", icon: FiMap },
        { to: "/dashboard/managestoryGuide", label: "Manage Stories", icon: FiLayers },
        { to: "/dashboard/addstoryGuide", label: "Add Story", icon: FiEdit3 },
    ];
    const userLinks = [
        { to: "/dashboard/userProfile", label: "My Profile", icon: FiUser },
        { to: "/dashboard/mybookings", label: "My Bookings", icon: FiBookmark },
        { to: "/dashboard/managestory", label: "Manage Stories", icon: FiLayers },
        { to: "/dashboard/addstory", label: "Add Story", icon: FiEdit3 },
        { to: "/dashboard/joinguide", label: "Join as Guide", icon: FiUserPlus },
    ];

    const links = isAdmin ? adminLinks : isGuide ? guideLinks : userLinks;
    const roleLabel = isAdmin ? "Admin" : isGuide ? "Tour Guide" : "Traveler";
    const roleBadgeColor = isAdmin ? "bg-accent-500" : isGuide ? "bg-brand-500" : "bg-sky-500";

    const SidebarContent = () => (
        <>
            <Link to="/" className="flex items-center gap-2 px-2 mb-8">
                <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
                    <FiCompass className="text-white text-lg" />
                </div>
                <span className="font-display text-xl font-bold text-white">
                    Journey<span className="text-brand-400">Sync</span>
                </span>
            </Link>

            {/* User card */}
            {user && (
                <div className="mb-6 p-3 rounded-xl bg-white/5 ring-1 ring-white/10">
                    <div className="flex items-center gap-3">
                        <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20"
                        />
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-white truncate">
                                {user.displayName}
                            </p>
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold text-white ${roleBadgeColor}`}>
                                {roleLabel}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <nav className="space-y-1">
                <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-ink-400 mb-2">
                    Menu
                </p>
                {links.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                                isActive
                                    ? "bg-brand-500/15 text-brand-300 ring-1 ring-brand-500/30"
                                    : "text-ink-300 hover:bg-white/5 hover:text-white"
                            }`
                        }
                    >
                        <Icon className="text-base" />
                        <span className="flex-1">{label}</span>
                        <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </NavLink>
                ))}
            </nav>

            <div className="h-px bg-white/10 my-6" />

            <nav className="space-y-1">
                <Link
                    to="/"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-300 hover:bg-white/5 hover:text-white transition-all"
                >
                    <FiHome className="text-base" />
                    <span>Back to site</span>
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all"
                >
                    <FiLogOut className="text-base" />
                    <span>Logout</span>
                </button>
            </nav>
        </>
    );

    return (
        <div className="min-h-screen bg-ink-50/50">
            {/* Mobile topbar */}
            <div className="lg:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-ink-200 px-4 py-3 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                        <FiCompass className="text-white text-sm" />
                    </div>
                    <span className="font-display font-bold text-ink-900">
                        Journey<span className="text-brand-600">Sync</span>
                    </span>
                </Link>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg text-ink-700 hover:bg-ink-100"
                    aria-label="Toggle sidebar"
                >
                    {sidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
                </button>
            </div>

            {/* Mobile drawer */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute left-0 top-0 bottom-0 w-72 bg-ink-950 p-5 overflow-y-auto"
                    >
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="absolute top-4 right-4 w-9 h-9 rounded-lg text-white/70 hover:bg-white/10 flex items-center justify-center"
                        >
                            <FiX />
                        </button>
                        <SidebarContent />
                    </motion.aside>
                </div>
            )}

            <div className="flex">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block fixed inset-y-0 left-0 w-72 bg-ink-950 p-5 overflow-y-auto">
                    <SidebarContent />
                </aside>

                {/* Content */}
                <main className="flex-1 lg:ml-72 min-h-screen">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="p-4 sm:p-6 lg:p-10"
                    >
                        <Outlet />
                    </motion.div>
                    <footer className="border-t border-ink-200 py-6 px-6 text-center text-xs text-ink-500">
                        © {new Date().getFullYear()} JourneySync. All rights reserved.
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
