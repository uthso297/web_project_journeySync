import { FiMapPin, FiDollarSign } from 'react-icons/fi';

const Gallery = ({ photos = [], tripTitle, price, tourType }) => {
    const safePhotos = photos.slice(0, 5);
    const [hero, ...rest] = safePhotos;

    return (
        <section className="relative">
            <div className="container-page pt-8">
                <div className="grid grid-cols-4 grid-rows-2 gap-3 sm:gap-4 h-[60vh] min-h-[400px]">
                    {hero && (
                        <div className="col-span-4 sm:col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
                            <img
                                src={hero}
                                alt={tripTitle}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <div className="flex items-center gap-2 mb-3">
                                    {tourType && (
                                        <span className="badge-modern bg-white/20 backdrop-blur text-white ring-white/20">
                                            <FiMapPin /> {tourType}
                                        </span>
                                    )}
                                    {price && (
                                        <span className="badge-modern bg-brand-500/90 backdrop-blur text-white ring-brand-400">
                                            <FiDollarSign /> {price}
                                        </span>
                                    )}
                                </div>
                                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold line-clamp-2">
                                    {tripTitle}
                                </h1>
                            </div>
                        </div>
                    )}
                    {rest.map((photo, index) => (
                        <div
                            key={index}
                            className="hidden sm:block col-span-1 row-span-1 relative rounded-2xl overflow-hidden group"
                        >
                            <img
                                src={photo}
                                alt={`${tripTitle} ${index + 2}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
