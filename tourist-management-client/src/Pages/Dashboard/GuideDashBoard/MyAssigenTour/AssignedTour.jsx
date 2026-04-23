import React, { useState } from "react";
import useBoook from "../../../../Hooks/useBoook";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { BallTriangle } from "react-loader-spinner";
import { FiCheck, FiX, FiCalendar, FiMap, FiAlertTriangle } from "react-icons/fi";

const statusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "pending") return "badge-warning";
    if (s === "in-review" || s === "accepted") return "badge-info";
    if (s === "rejected") return "badge-danger";
    if (s === "paid" || s === "accepted by guide") return "badge-success";
    return "badge-neutral";
};

const AssignedTour = () => {
    const [book, loadingBook, refetch] = useBoook();
    const [selectedTour, setSelectedTour] = useState(null);
    const axiosSecure = useAxiosSecure();

    const handleAccept = (id) => {
        axiosSecure.patch(`/books/accept/${id}`).then((res) => {
            if (res.data.modifiedCount >= 0) {
                Swal.fire({
                    title: "Tour accepted",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
                refetch();
            }
        });
    };

    const handleReject = (id) => {
        axiosSecure.patch(`/books/reject/${id}`).then((res) => {
            if (res.data.modifiedCount >= 0) {
                Swal.fire({
                    title: "Tour rejected",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
                refetch();
            }
        });
    };

    if (loadingBook) {
        return (
            <div className="flex justify-center py-20">
                <BallTriangle height={80} width={80} radius={5} color="#10b981" visible={true} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="heading-md">Assigned tours</h1>
                <p className="muted mt-1">Accept or reject bookings assigned to you.</p>
            </div>

            {book.length === 0 ? (
                <div className="card-modern p-10 text-center">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-brand-50 items-center justify-center mb-4">
                        <FiMap className="text-brand-600 text-2xl" />
                    </div>
                    <h3 className="heading-sm mb-2">No assigned tours yet</h3>
                    <p className="text-ink-500">New assignments will appear here.</p>
                </div>
            ) : (
                <div className="card-modern overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table-modern">
                            <thead>
                                <tr>
                                    <th>Package</th>
                                    <th>Tourist</th>
                                    <th>Date</th>
                                    <th className="text-right">Price</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {book.map((tour) => {
                                    const disabled =
                                        tour.status === "Pending" ||
                                        tour.status === "Accepted" ||
                                        tour.status === "Rejected";
                                    return (
                                        <tr key={tour._id}>
                                            <td className="font-medium">{tour.packageTitle}</td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={tour.touristImage}
                                                        alt={tour.touristName}
                                                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-soft"
                                                    />
                                                    <span className="font-medium text-ink-900">
                                                        {tour.touristName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="inline-flex items-center gap-1.5 text-sm text-ink-600">
                                                    <FiCalendar className="text-ink-400" />
                                                    {new Date(tour.tourDate).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="text-right font-semibold text-ink-900">
                                                ${tour.price}
                                            </td>
                                            <td>
                                                <span className={statusStyle(tour.status)}>
                                                    {tour.status}
                                                </span>
                                            </td>
                                            <td className="text-right">
                                                <div className="inline-flex gap-2">
                                                    <button
                                                        disabled={disabled}
                                                        onClick={() => handleAccept(tour._id)}
                                                        className="btn-primary-modern !px-3 !py-1.5 !text-xs disabled:!bg-ink-200 disabled:!text-ink-400 disabled:!shadow-none"
                                                    >
                                                        <FiCheck /> Accept
                                                    </button>
                                                    <button
                                                        disabled={disabled}
                                                        onClick={() => setSelectedTour(tour)}
                                                        className="btn-danger-modern !px-3 !py-1.5 !text-xs disabled:!bg-ink-200 disabled:!text-ink-400 disabled:!shadow-none"
                                                    >
                                                        <FiX /> Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Reject confirmation modal */}
            {selectedTour && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-sm card-modern p-6 sm:p-8 text-center animate-fade-up">
                        <div className="inline-flex w-16 h-16 rounded-full bg-red-50 items-center justify-center mb-4">
                            <FiAlertTriangle className="text-red-500 text-3xl" />
                        </div>
                        <h3 className="heading-sm mb-2">Reject this tour?</h3>
                        <p className="text-sm text-ink-500 mb-6">
                            The tourist will be notified. This action can't be undone.
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedTour(null)}
                                className="flex-1 btn-ghost-modern"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleReject(selectedTour._id);
                                    setSelectedTour(null);
                                }}
                                className="flex-1 btn-danger-modern"
                            >
                                Confirm reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignedTour;
