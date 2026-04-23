import React from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

const TourPlan = ({ tourPlan }) => {
    return (
        <div className="card-modern p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                    <FiCalendar className="text-brand-600" />
                </div>
                <h2 className="heading-sm">Your tour plan</h2>
            </div>

            <div className="relative">
                <div className="absolute left-4 top-2 bottom-2 w-px bg-ink-200 hidden sm:block" />
                <div className="space-y-4">
                    {tourPlan && Object.entries(tourPlan).map(([day, details], index) => (
                        <div
                            key={index}
                            className="relative pl-0 sm:pl-12 group"
                        >
                            <div className="hidden sm:flex absolute left-0 top-1 w-8 h-8 rounded-full bg-gradient-brand items-center justify-center text-white font-bold text-sm shadow-glow ring-4 ring-white">
                                {index + 1}
                            </div>
                            <div className="bg-ink-50 hover:bg-white hover:shadow-soft transition-all rounded-2xl p-5 ring-1 ring-ink-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <FiMapPin className="text-brand-500" />
                                    <h3 className="font-semibold text-ink-900">{day}</h3>
                                </div>
                                <p className="text-ink-600 text-sm leading-relaxed">
                                    {details.activities}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TourPlan;
