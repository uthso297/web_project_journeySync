import React, { useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';

const RatingSlider = () => {
    const items = [
        {
            id: 1,
            name: 'John Doe',
            image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'The Rangamati package is a great experience with amazing features and unforgettable views.',
            rating: 4.5,
        },
        {
            id: 2,
            name: 'Mike Urban',
            image: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'The Paharpur package is loved by many for its reliability and consistent quality.',
            rating: 3.8,
        },
        {
            id: 3,
            name: 'Peter Parker',
            image: 'https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'Sylhet is an outstanding package with excellent performance. Would book again in a heartbeat.',
            rating: 5,
        },
        {
            id: 4,
            name: 'Guljit Singh',
            image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'The Rangamati package combines style and functionality — perfect for families.',
            rating: 4.2,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const { name, image, description, rating } = items[currentIndex];

    const renderRating = (r) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <FiStar
                key={i}
                className={`${
                    i < Math.round(r) ? 'fill-amber-400 text-amber-400' : 'text-ink-300'
                }`}
            />
        ));
    };

    return (
        <section className="section-sm bg-ink-50/50">
            <div className="container-page">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <span className="eyebrow">Testimonials</span>
                    <h2 className="heading-lg mt-4">What travelers say</h2>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div
                        key={currentIndex}
                        className="card-modern p-8 sm:p-10 animate-fade-up"
                    >
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <img
                                src={image}
                                alt={name}
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-brand-100 flex-shrink-0"
                            />
                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex justify-center sm:justify-start items-center gap-1 mb-3">
                                    {renderRating(rating)}
                                    <span className="ml-2 text-sm font-semibold text-ink-700">
                                        {rating.toFixed(1)}
                                    </span>
                                </div>
                                <p className="text-base sm:text-lg text-ink-700 leading-relaxed italic mb-3">
                                    "{description}"
                                </p>
                                <h3 className="font-semibold text-ink-900">{name}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-1.5 mt-6">
                        {items.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2 rounded-full transition-all ${
                                    currentIndex === idx ? 'bg-brand-500 w-8' : 'bg-ink-300 w-2'
                                }`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RatingSlider;
