import { useState } from 'react';
import useStory from '../../../Hooks/useStory';
import { BallTriangle } from 'react-loader-spinner';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function TouristSlider() {
    const [stories, loading] = useStory();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % stories.length);
    };
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <BallTriangle height={80} width={80} radius={5} color="#10b981" visible={true} />
            </div>
        );
    }

    if (!stories?.length) {
        return (
            <div className="text-center py-10 text-ink-400">No stories yet.</div>
        );
    }

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-soft-lg ring-1 ring-white/10 bg-white/5 backdrop-blur-sm">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {stories.map((tourist, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={tourist.images?.[0]}
                                    alt={tourist.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                                    {tourist.title}
                                </h3>
                                <p className="text-sm text-ink-300 line-clamp-3 leading-relaxed">
                                    {tourist.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-ink-900 shadow-soft-lg flex items-center justify-center hover:scale-110 transition-transform"
                onClick={prevSlide}
                aria-label="Previous"
            >
                <FiChevronLeft className="text-xl" />
            </button>
            <button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-11 h-11 rounded-full bg-white text-ink-900 shadow-soft-lg flex items-center justify-center hover:scale-110 transition-transform"
                onClick={nextSlide}
                aria-label="Next"
            >
                <FiChevronRight className="text-xl" />
            </button>

            <div className="flex justify-center gap-1.5 mt-4">
                {stories.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                            currentIndex === idx ? 'bg-brand-500 w-6' : 'bg-white/30 w-2'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default TouristSlider;
