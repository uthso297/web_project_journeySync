import { BallTriangle } from "react-loader-spinner";
import useApplications from "../../../../Hooks/useApplications";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiCheck, FiX, FiExternalLink, FiUserPlus } from "react-icons/fi";

const ManageCandidate = () => {
    const [applications, loadingApplications, refetch] = useApplications();
    const axiosSecure = useAxiosSecure();

    const handleAccept = (photo, whyGuide, name, email, id) => {
        axiosSecure.patch(`/users/role/${email}`).then((res) => {
            if (res.data.modifiedCount >= 1) {
                axiosSecure.delete(`/applications/${id}`).then((res) => {
                    if (res.data.deletedCount >= 1) {
                        axiosSecure
                            .post('/guides', { name, email, whyGuide, photo })
                            .then((res) => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        title: "Application accepted!",
                                        icon: "success",
                                        confirmButtonColor: "#10b981",
                                    });
                                }
                                refetch();
                            });
                    }
                });
            }
        });
    };

    const handleReject = (id) => {
        Swal.fire({
            title: "Reject application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, reject",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/applications/${id}`).then(() => {
                    Swal.fire({ title: "Rejected", icon: "success", confirmButtonColor: "#10b981" });
                    refetch();
                });
            }
        });
    };

    if (loadingApplications) {
        return (
            <div className="flex justify-center py-20">
                <BallTriangle height={80} width={80} radius={5} color="#10b981" visible={true} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="heading-md">Guide Applications</h1>
                <p className="muted mt-1">
                    Review candidates applying to become tour guides.
                </p>
            </div>

            {applications?.length === 0 ? (
                <div className="card-modern p-10 text-center">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-brand-50 items-center justify-center mb-4">
                        <FiUserPlus className="text-brand-600 text-2xl" />
                    </div>
                    <h3 className="heading-sm mb-2">No applications yet</h3>
                    <p className="text-ink-500">New applications will appear here.</p>
                </div>
            ) : (
                <div className="card-modern overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table-modern">
                            <thead>
                                <tr>
                                    <th>Application</th>
                                    <th>Candidate</th>
                                    <th>CV</th>
                                    <th>Role</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app._id}>
                                        <td>
                                            <p className="font-medium text-ink-900 line-clamp-1">
                                                {app.applicationTitle}
                                            </p>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={app.image}
                                                    alt={app.name}
                                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-soft"
                                                />
                                                <div className="min-w-0">
                                                    <p className="font-medium text-ink-900 truncate">
                                                        {app.name}
                                                    </p>
                                                    <p className="text-xs text-ink-500 truncate">
                                                        {app.userEmail}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <a
                                                href={app.cvLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-sm text-brand-700 hover:text-brand-800 font-medium"
                                            >
                                                View <FiExternalLink className="text-xs" />
                                            </a>
                                        </td>
                                        <td>
                                            <span className="badge-neutral">{app.role}</span>
                                        </td>
                                        <td className="text-right">
                                            <div className="inline-flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleAccept(
                                                            app.image,
                                                            app.whyTourGuide,
                                                            app.name,
                                                            app.userEmail,
                                                            app._id
                                                        )
                                                    }
                                                    className="btn-primary-modern !px-3 !py-1.5 !text-xs"
                                                >
                                                    <FiCheck /> Accept
                                                </button>
                                                <button
                                                    onClick={() => handleReject(app._id)}
                                                    className="btn-danger-modern !px-3 !py-1.5 !text-xs"
                                                >
                                                    <FiX /> Reject
                                                </button>
                                            </div>
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

export default ManageCandidate;
