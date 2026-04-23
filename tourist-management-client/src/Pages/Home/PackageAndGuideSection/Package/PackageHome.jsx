import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FiArrowRight, FiMapPin } from "react-icons/fi";

const PackageHome = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/tourPackages/random').then(res => {
            setPackages(res.data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <BallTriangle height={80} width={80} radius={5} color="#10b981" visible={true} />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => (
                <div key={pkg._id} className="card-modern card-modern-hover group">
                    <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                            src={pkg.photos?.[0]}
                            alt={pkg.tripTitle}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute top-4 left-4 badge-modern bg-white/90 backdrop-blur text-ink-800 ring-white/60">
                            <FiMapPin /> {pkg.tourType}
                        </span>
                        <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand-600 text-white text-sm font-bold shadow-glow">
                            ${pkg.price}
                        </span>
                    </div>
                    <div className="p-5">
                        <h3 className="text-lg font-semibold text-ink-900 line-clamp-1 group-hover:text-brand-700 transition-colors">
                            {pkg.tripTitle}
                        </h3>
                        <p className="muted mt-1 line-clamp-2">
                            {pkg.tourType} experience designed for every traveler.
                        </p>
                        <Link
                            to={`/tourPackages/${pkg._id}`}
                            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800 group/link"
                        >
                            View Details
                            <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PackageHome;
