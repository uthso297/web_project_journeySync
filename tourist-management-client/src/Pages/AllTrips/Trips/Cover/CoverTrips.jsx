import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from 'react-share';
import coverImg from '../../../../assets/Trips/407.jpg';
import { Typewriter } from 'react-simple-typewriter';
import { FiMap } from 'react-icons/fi';

const CoverTrips = () => {
    const shareUrl = 'https://github.com/uthso297';
    return (
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${coverImg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink-950/85 via-ink-900/70 to-brand-900/50" />

            <div className="relative container-page py-16 text-white">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-sm font-medium mb-6">
                        <FiMap /> All trips & packages
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 min-h-[4rem] sm:min-h-[5rem]">
                        <Typewriter
                            words={["Find Your Perfect Trip", "Explore New Destinations", "Adventure Awaits", "Start Your Journey Today"]}
                            loop={5}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </h1>
                    <p className="text-base sm:text-lg text-ink-200 leading-relaxed max-w-2xl">
                        Explore a wide variety of destinations and experiences — from relaxing getaways to thrilling expeditions. Find the perfect trip to match your style.
                    </p>
                </div>
            </div>

            {/* Share dock */}
            <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-2 p-2 rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                <FacebookShareButton url={shareUrl}><FacebookIcon size={36} round /></FacebookShareButton>
                <TwitterShareButton url={shareUrl}><XIcon size={36} round /></TwitterShareButton>
                <TelegramShareButton url={shareUrl}><TelegramIcon size={36} round /></TelegramShareButton>
                <WhatsappShareButton url={shareUrl}><WhatsappIcon size={36} round /></WhatsappShareButton>
            </div>
            <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                <FacebookShareButton url={shareUrl}><FacebookIcon size={32} round /></FacebookShareButton>
                <TwitterShareButton url={shareUrl}><XIcon size={32} round /></TwitterShareButton>
                <TelegramShareButton url={shareUrl}><TelegramIcon size={32} round /></TelegramShareButton>
                <WhatsappShareButton url={shareUrl}><WhatsappIcon size={32} round /></WhatsappShareButton>
            </div>
        </section>
    );
};

export default CoverTrips;
