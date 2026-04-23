import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useBoooks from "./useBooks";
import { FiCreditCard, FiTrash2, FiCalendar, FiUser, FiBookmark } from "react-icons/fi";
import { BallTriangle } from "react-loader-spinner";
import Swal from "sweetalert2";

const statusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "pending") return "badge-warning";
    if (s === "accepted" || s === "in review") return "badge-info";
    if (s === "rejected") return "badge-danger";
    if (s === "paid" || s === "accepted by guide") return "badge-success";
    return "badge-neutral";
};

const Bookings = () => {
    const [books, loadingBooks, refetch] = useBoooks();
    const axiosSecure = useAxiosSecure();

    const handleCancel = (bookId) => {
        Swal.fire({
            title: "Cancel booking?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/books/${bookId}`).then((res) => {
                    if (res.data.deletedCount >= 1) refetch();
                });
            }
        });
    };

    if (loadingBooks) {
        return (
            <div className="flex justify-center py-20">
                <BallTriangle height={80} width={80} radius={5} color="#10b981" visible={true} />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="heading-md">Your bookings</h1>
                <p className="muted mt-1">Manage and review your upcoming trips.</p>
            </div>

            {books.length === 0 ? (
                <div className="card-modern p-10 text-center">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-brand-50 items-center justify-center mb-4">
                        <FiBookmark className="text-brand-600 text-2xl" />
                    </div>
                    <h3 className="heading-sm mb-2">No bookings yet</h3>
                    <p className="text-ink-500 mb-6">Start planning your next adventure.</p>
                    <Link to="/trips" className="btn-primary-modern">
                        Browse Trips
                    </Link>
                </div>
            ) : (
                <div className="card-modern overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table-modern">
                            <thead>
                                <tr>
                                    <th>Package</th>
                                    <th>Guide</th>
                                    <th>Date</th>
                                    <th className="text-right">Price</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book) => (
                                    <tr key={book._id}>
                                        <td className="font-medium">{book.packageTitle}</td>
                                        <td>
                                            <span className="inline-flex items-center gap-1.5 text-sm">
                                                <FiUser className="text-brand-500" />
                                                {book.tourGuide}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="inline-flex items-center gap-1.5 text-sm text-ink-600">
                                                <FiCalendar className="text-ink-400" />
                                                {new Date(book.tourDate).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="text-right font-semibold text-ink-900">
                                            ${book.price}
                                        </td>
                                        <td>
                                            <span className={statusStyle(book.status)}>
                                                {book.status}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            {book.status === "Pending" ? (
                                                <div className="inline-flex gap-2">
                                                    <Link
                                                        to={`/dashboard/payment/${book._id}`}
                                                        className="btn-primary-modern !px-3 !py-1.5 !text-xs"
                                                    >
                                                        <FiCreditCard /> Pay
                                                    </Link>
                                                    <button
                                                        onClick={() => handleCancel(book._id)}
                                                        className="btn-danger-modern !px-3 !py-1.5 !text-xs"
                                                    >
                                                        <FiTrash2 /> Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-ink-400">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bookings;
