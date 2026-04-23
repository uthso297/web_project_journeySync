import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCheckCircle, FiCalendar, FiUser, FiDollarSign, FiPackage, FiX } from "react-icons/fi";
import useGuide from '../../../Hooks/useGuide';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useBooks from '../../Dashboard/UserDashboard/MyBookingsPage/useBooks';
import ReactConfetti from 'react-confetti';

const BookingForm = ({ touristName, touristEmail, touristImage, price, packageTitle }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedGuide, setSelectedGuide] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [guides] = useGuide();
    const axiosSecure = useAxiosSecure();
    const [books, , refetch] = useBooks();
    const [confettiCount, setConfettiCount] = useState(0);

    const handleBooking = (e) => {
        e.preventDefault();
        const selectedGuideObj = guides.find((g) => g.name === selectedGuide);
        const guideEmail = selectedGuideObj ? selectedGuideObj.email : '';
        const formData = {
            touristName,
            touristEmail,
            touristImage,
            tourDate: startDate,
            tourGuide: selectedGuide,
            price,
            status: 'Pending',
            guideEmail,
            packageTitle,
        };

        axiosSecure.post('/books', formData).then(() => {
            refetch();
            setIsModalOpen(true);
        });
    };

    const runConfetti = books.length === 3 && confettiCount < 3;
    const handleConfettiComplete = () => setConfettiCount((p) => p + 1);

    return (
        <>
            {runConfetti && (
                <ReactConfetti
                    gravity={0.1}
                    numberOfPieces={200}
                    recycle={false}
                    run={runConfetti}
                    onConfettiComplete={handleConfettiComplete}
                />
            )}

            <form onSubmit={handleBooking} className="card-modern p-6 sm:p-7">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
                        <FiPackage className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-ink-900">Book this tour</h3>
                        <p className="text-xs text-ink-500">Fill in the details to reserve</p>
                    </div>
                </div>

                {/* Tourist card */}
                {touristImage && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 ring-1 ring-ink-100 mb-5">
                        <img
                            src={touristImage}
                            alt={touristName}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                        />
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-ink-900 truncate">{touristName}</p>
                            <p className="text-xs text-ink-500 truncate">{touristEmail}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <div className="form-group">
                        <label className="label-modern flex items-center gap-1.5">
                            <FiPackage className="text-brand-500" /> Tour package
                        </label>
                        <input
                            type="text"
                            value={packageTitle || ''}
                            readOnly
                            className="input-modern bg-ink-50"
                        />
                    </div>

                    <div className="form-group">
                        <label className="label-modern flex items-center gap-1.5">
                            <FiCalendar className="text-brand-500" /> Tour date
                        </label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="input-modern"
                            minDate={new Date()}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label-modern flex items-center gap-1.5">
                            <FiUser className="text-brand-500" /> Tour guide
                        </label>
                        <select
                            className="input-modern"
                            value={selectedGuide}
                            onChange={(e) => setSelectedGuide(e.target.value)}
                            required
                        >
                            <option value="">Select a guide</option>
                            {guides.map((guide, i) => (
                                <option key={i} value={guide.name}>
                                    {guide.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="label-modern flex items-center gap-1.5">
                            <FiDollarSign className="text-brand-500" /> Price
                        </label>
                        <input
                            type="text"
                            value={`$${price}`}
                            readOnly
                            className="input-modern bg-ink-50 font-semibold text-ink-900"
                        />
                    </div>

                    <button type="submit" className="w-full btn-primary-modern py-3 text-base">
                        Book Now
                    </button>
                    <p className="text-xs text-ink-400 text-center">
                        You won't be charged yet. Payment is confirmed after booking.
                    </p>
                </div>
            </form>

            {/* Success Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-sm card-modern p-6 sm:p-8 text-center animate-fade-up">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
                        >
                            <FiX />
                        </button>
                        <div className="inline-flex w-16 h-16 rounded-full bg-brand-50 items-center justify-center mb-4">
                            <FiCheckCircle className="text-brand-500 text-3xl" />
                        </div>
                        <h3 className="heading-sm mb-2">Booking submitted!</h3>
                        <p className="text-sm text-ink-500 mb-6">
                            Your booking has been saved. Visit My Bookings to complete payment.
                        </p>
                        <div className="flex flex-col gap-2">
                            <Link
                                to="/dashboard/mybookings"
                                className="btn-primary-modern"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Go to My Bookings
                            </Link>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="btn-ghost-modern"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingForm;
