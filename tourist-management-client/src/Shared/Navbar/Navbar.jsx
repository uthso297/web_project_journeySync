import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Components/AuthProvider";
import useAdmin from "../../Hooks/useAdmin";
import checkGuide from "../../Hooks/checkGuide";
import Swal from "sweetalert2";
import { FiMenu, FiX, FiLogOut, FiUser, FiCompass } from "react-icons/fi";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isGuide] = checkGuide();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleLogout = () => {
        logOut().then(() => {
            Swal.fire({
                title: "Signed out",
                text: "Come back soon!",
                icon: "success",
                confirmButtonColor: "#10b981",
            });
        });
    };

    const navItems = [
        { to: "/", label: "Home" },
        { to: "/community", label: "Community" },
        { to: "/about", label: "About" },
        { to: "/trips", label: "Trips" },
    ];

    const dashboardLink = isAdmin
        ? "/dashboard/adminProfile"
        : isGuide
        ? "/dashboard/guideProfile"
        : "/dashboard/userProfile";

    const linkClass = ({ isActive }) =>
        `relative px-3 py-2 text-sm font-medium transition-colors ${
            isActive ? "text-brand-600" : "text-ink-700 hover:text-ink-900"
        }`;

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/85 backdrop-blur-xl shadow-soft ring-1 ring-black/5"
                    : "bg-white/60 backdrop-blur-md"
            }`}
        >
            <nav className="container-page">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
                            <FiCompass className="text-white text-lg" />
                        </div>
                        <span className="font-display text-xl lg:text-2xl font-bold text-ink-900 tracking-tight">
                            Journey<span className="text-brand-600">Sync</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <NavLink to={item.to} className={linkClass}>
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Right side */}
                    <div className="hidden lg:flex items-center gap-3">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white ring-1 ring-ink-200 hover:ring-ink-300 shadow-soft transition-all"
                                >
                                    <img
                                        src={user?.photoURL}
                                        alt={user?.displayName}
                                        className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-100"
                                    />
                                    <span className="text-sm font-medium text-ink-800 max-w-[120px] truncate">
                                        {user?.displayName}
                                    </span>
                                </button>
                                {menuOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setMenuOpen(false)}
                                        />
                                        <div className="absolute right-0 top-full mt-2 w-64 card-modern p-2 z-20 animate-fade-up">
                                            <div className="px-3 py-3 border-b border-ink-100">
                                                <p className="text-sm font-semibold text-ink-900 truncate">
                                                    {user?.displayName}
                                                </p>
                                                <p className="text-xs text-ink-500 truncate">
                                                    {user?.email}
                                                </p>
                                            </div>
                                            <Link
                                                to={dashboardLink}
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                                            >
                                                <FiUser /> Dashboard
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setMenuOpen(false);
                                                    handleLogout();
                                                }}
                                                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <FiLogOut /> Logout
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <>
                                <NavLink to="/login" className="btn-ghost-modern">
                                    Login
                                </NavLink>
                                <NavLink to="/signup" className="btn-primary-modern">
                                    Get Started
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 rounded-lg text-ink-700 hover:bg-ink-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="lg:hidden pb-4 pt-2 animate-fade-up">
                        <ul className="space-y-1">
                            {navItems.map((item) => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        onClick={() => setMobileOpen(false)}
                                        className={({ isActive }) =>
                                            `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                                isActive
                                                    ? "bg-brand-50 text-brand-700"
                                                    : "text-ink-700 hover:bg-ink-100"
                                            }`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-ink-100">
                            {user ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 px-3 py-2">
                                        <img
                                            src={user?.photoURL}
                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-100"
                                            alt=""
                                        />
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold truncate">
                                                {user?.displayName}
                                            </p>
                                            <p className="text-xs text-ink-500 truncate">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        to={dashboardLink}
                                        onClick={() => setMobileOpen(false)}
                                        className="block w-full btn-secondary-modern"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setMobileOpen(false);
                                            handleLogout();
                                        }}
                                        className="w-full btn-danger-modern"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-2">
                                    <NavLink
                                        to="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="btn-secondary-modern"
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="/signup"
                                        onClick={() => setMobileOpen(false)}
                                        className="btn-primary-modern"
                                    >
                                        Sign Up
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
