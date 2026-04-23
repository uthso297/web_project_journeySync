import { Link } from "react-router-dom";
import useGuide from '../../../../Hooks/useGuide.jsx';
import { FiMail, FiArrowRight } from "react-icons/fi";

const GuideHome = () => {
    const [guides] = useGuide();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((guide, index) => (
                <div
                    key={index}
                    className="card-modern card-modern-hover group p-6 text-center"
                >
                    <div className="relative inline-block mb-4">
                        <div className="absolute -inset-1 bg-gradient-brand rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity" />
                        <img
                            src={guide.photo}
                            alt={guide.name}
                            className="relative w-24 h-24 rounded-full object-cover ring-4 ring-white"
                        />
                    </div>
                    <h3 className="text-lg font-semibold text-ink-900 mb-1">
                        {guide.name}
                    </h3>
                    <p className="muted mb-4 flex items-center justify-center gap-1 truncate">
                        <FiMail className="text-brand-500 flex-shrink-0" />
                        <span className="truncate">{guide.email}</span>
                    </p>
                    <Link
                        to={`/guidePro/${guide.email}`}
                        className="btn-secondary-modern w-full group/btn"
                    >
                        View Profile
                        <FiArrowRight className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default GuideHome;
