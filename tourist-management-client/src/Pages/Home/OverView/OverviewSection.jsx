import React from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "motion/react";
import { FiPlayCircle } from "react-icons/fi";

const slides = [
    {
        src: "https://www.youtube.com/embed/JLjvEYMBGzQ?si=MW0OfwfsuZPdCXSr",
        title: "Curated Travel Packages",
        caption: "Explore a wide range of packages featuring stunning destinations and unforgettable experiences.",
    },
    {
        src: "https://www.youtube.com/embed/45ETZ1xvHS0?si=WWwpsD_ovEtNJ4Ig",
        title: "Expert Local Guides",
        caption: "Our experienced guides offer trusted advice for a memorable, safe journey.",
    },
    {
        src: "https://www.youtube.com/embed/t2yvzgjr9To?si=JD6rM2uQesmZ8vSv",
        title: "Inspiring Traveler Stories",
        caption: "Discover stories from fellow travelers and their unforgettable journeys.",
    },
];

const OverviewSection = () => {
    const [sliderRef] = useKeenSlider({
        loop: true,
        mode: "free-snap",
        slides: { perView: 1.1, spacing: 16, origin: "center" },
        breakpoints: {
            "(min-width: 768px)": { slides: { perView: 1.5, spacing: 20, origin: "center" } },
            "(min-width: 1024px)": { slides: { perView: 2.1, spacing: 24, origin: "center" } },
        },
    });

    return (
        <section className="section bg-ink-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
            <div className="container-page relative">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <span className="eyebrow bg-white/10 text-brand-300 ring-white/10">
                        <FiPlayCircle /> Watch & Learn
                    </span>
                    <h2 className="heading-lg text-white mt-4">
                        An overview of <span className="text-brand-400">JourneySync</span>
                    </h2>
                    <p className="lead text-ink-300 mt-4">
                        Hand-picked destinations, seasoned guides, and authentic stories — all in one place.
                    </p>
                </div>

                <motion.div
                    ref={sliderRef}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="keen-slider"
                >
                    {slides.map((s, idx) => (
                        <div key={idx} className="keen-slider__slide">
                            <div className="group rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur-sm">
                                <div className="relative pt-[56.25%] w-full h-0 bg-ink-900">
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full"
                                        src={s.src}
                                        title={s.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                                        {s.title}
                                    </h3>
                                    <p className="text-sm text-ink-300 leading-relaxed">
                                        {s.caption}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default OverviewSection;
