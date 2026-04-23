import React from 'react';
import { FiCheckCircle, FiInfo } from 'react-icons/fi';

const TourInfo = ({ tourInformation, tripTitle }) => {
    return (
        <div className="card-modern p-6 sm:p-8">
            <h2 className="heading-md mb-2">{tripTitle}</h2>
            <div className="divider-soft my-6" />

            <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                        <FiInfo className="text-brand-600" />
                    </div>
                    <h3 className="heading-sm">Tour overview</h3>
                </div>
                <p className="text-ink-600 leading-relaxed">
                    {tourInformation?.overview}
                </p>
            </div>

            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center">
                        <FiCheckCircle className="text-accent-600" />
                    </div>
                    <h3 className="heading-sm">Tour highlights</h3>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                    {tourInformation?.highlights?.map((highlight, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-xl bg-ink-50 ring-1 ring-ink-100"
                        >
                            <FiCheckCircle className="text-brand-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-ink-700 leading-relaxed">
                                {highlight}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TourInfo;
