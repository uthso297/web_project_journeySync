import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from 'react-share';
import coverImg from '../../assets/Home/banner.jpg';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiArrowRight, FiMapPin, FiUsers, FiStar } from 'react-icons/fi';

const Cover = () => {
    const shareUrl = 'https://journey-sync-91305.web.app/';
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "journey");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme((prev) => (prev === "journey" ? "dark" : "journey"));
        window.location.reload();
    };

    return (
        <section className="relative min-h-[92vh] flex items-center overflow-hidden">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${coverImg})` }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-ink-950/90 via-ink-900/70 to-brand-900/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative container-page py-16 lg:py-24 w-full">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                            <span className="text-sm font-medium">Explore the world with confidence</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
                        >
                            Your next
                            <span className="block bg-gradient-to-r from-brand-300 via-brand-400 to-accent-400 bg-clip-text text-transparent">
                                adventure awaits
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mt-6 text-base sm:text-lg lg:text-xl text-ink-200 max-w-2xl leading-relaxed"
                        >
                            Plan seamlessly, travel confidently, and share every story. JourneySync makes your perfect getaway simple and stress-free.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="mt-8 flex flex-wrap items-center gap-3"
                        >
                            <Link to="/trips" className="btn-primary-modern btn-lg-modern group">
                                Get Started
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/community" className="btn-modern btn-lg-modern bg-white/10 hover:bg-white/20 text-white backdrop-blur-md ring-1 ring-white/20">
                                Explore Community
                            </Link>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl"
                        >
                            {[
                                { icon: FiMapPin, value: "120+", label: "Destinations" },
                                { icon: FiUsers, value: "8.5K", label: "Happy Travelers" },
                                { icon: FiStar, value: "4.9", label: "Average Rating" },
                            ].map(({ icon: Icon, value, label }) => (
                                <div key={label} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 flex items-center justify-center flex-shrink-0">
                                        <Icon className="text-brand-300" />
                                    </div>
                                    <div>
                                        <div className="text-xl sm:text-2xl font-bold">{value}</div>
                                        <div className="text-xs text-ink-300">{label}</div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Floating share card */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-2 p-2 rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20"
            >
                <FacebookShareButton url={shareUrl}><FacebookIcon size={36} round /></FacebookShareButton>
                <TwitterShareButton url={shareUrl}><XIcon size={36} round /></TwitterShareButton>
                <TelegramShareButton url={shareUrl}><TelegramIcon size={36} round /></TelegramShareButton>
                <WhatsappShareButton url={shareUrl}><WhatsappIcon size={36} round /></WhatsappShareButton>
                <button
                    onClick={handleThemeToggle}
                    className="w-9 h-9 mx-auto mt-1 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'journey' ? '🌙' : '🌞'}
                </button>
            </motion.div>

            {/* Mobile share row */}
            <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                <FacebookShareButton url={shareUrl}><FacebookIcon size={32} round /></FacebookShareButton>
                <TwitterShareButton url={shareUrl}><XIcon size={32} round /></TwitterShareButton>
                <TelegramShareButton url={shareUrl}><TelegramIcon size={32} round /></TelegramShareButton>
                <WhatsappShareButton url={shareUrl}><WhatsappIcon size={32} round /></WhatsappShareButton>
            </div>
        </section>
    );
};

export default Cover;
