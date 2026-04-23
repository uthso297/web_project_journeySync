import video1 from '../../../assets/Community/communityCover.mp4';
import { motion } from "motion/react";
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from 'react-share';
import { FiUsers, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CoverWithVideo = () => {
    const shareUrl = 'https://github.com/uthso297';
    return (
        <section className="relative min-h-[88vh] overflow-hidden flex items-center">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={`${video1}`} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-ink-950/85 via-ink-900/70 to-brand-900/50" />

            <div className="relative container-page py-16 w-full text-white">
                <div className="max-w-3xl">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-sm font-medium mb-6"
                    >
                        <FiUsers /> Our community
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05]"
                    >
                        Welcome to our
                        <span className="block bg-gradient-to-r from-brand-300 via-brand-400 to-accent-400 bg-clip-text text-transparent">
                            community of explorers
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-6 text-base sm:text-lg lg:text-xl text-ink-200 max-w-2xl leading-relaxed"
                    >
                        Shared experiences connect us. Let your voice be heard and inspire others by telling your story.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-8 flex flex-wrap gap-3"
                    >
                        <a href="#stories" className="btn-primary-modern btn-lg-modern group">
                            Read Stories
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <Link
                            to="/dashboard/addstory"
                            className="btn-modern btn-lg-modern bg-white/10 hover:bg-white/20 text-white backdrop-blur-md ring-1 ring-white/20"
                        >
                            Share your story
                        </Link>
                    </motion.div>
                </div>
            </div>

            <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-2 p-2 rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                <FacebookShareButton url={shareUrl}><FacebookIcon size={36} round /></FacebookShareButton>
                <TwitterShareButton url={shareUrl}><XIcon size={36} round /></TwitterShareButton>
                <TelegramShareButton url={shareUrl}><TelegramIcon size={36} round /></TelegramShareButton>
                <WhatsappShareButton url={shareUrl}><WhatsappIcon size={36} round /></WhatsappShareButton>
            </div>
        </section>
    );
};

export default CoverWithVideo;
