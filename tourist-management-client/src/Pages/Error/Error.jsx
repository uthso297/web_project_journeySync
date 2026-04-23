import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiArrowLeft, FiCompass } from 'react-icons/fi';

const Error = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-ink-50 px-4 py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />

            <div className="relative w-full max-w-lg text-center">
                <Link to="/" className="inline-flex items-center gap-2 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
                        <FiCompass className="text-white text-xl" />
                    </div>
                    <span className="font-display text-xl font-bold text-ink-900">
                        Journey<span className="text-brand-600">Sync</span>
                    </span>
                </Link>

                <div className="card-modern p-8 sm:p-12">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-red-50 ring-1 ring-red-100 items-center justify-center mb-6">
                        <FiAlertTriangle className="text-red-500 text-2xl" />
                    </div>

                    <div className="text-8xl font-display font-bold text-gradient mb-4">
                        404
                    </div>
                    <h1 className="heading-md text-ink-900 mb-3">
                        Lost in the wilderness
                    </h1>
                    <p className="text-ink-600 mb-8 leading-relaxed">
                        The page you're looking for seems to have wandered off. Let's get you back to familiar ground.
                    </p>

                    <Link to="/" className="btn-primary-modern btn-lg-modern inline-flex">
                        <FiArrowLeft /> Go back home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Error;
