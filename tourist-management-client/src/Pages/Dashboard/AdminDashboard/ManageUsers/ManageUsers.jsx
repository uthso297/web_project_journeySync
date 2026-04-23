import { useState, useEffect } from "react";
import useUsers from "../../../../Hooks/useUsers";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { BallTriangle } from "react-loader-spinner";
import { FiSearch, FiChevronLeft, FiChevronRight, FiUsers } from "react-icons/fi";

const roleBadge = (role) => {
    if (role === "Admin") return "badge-danger";
    if (role === "Tour Guide") return "badge-success";
    return "badge-info";
};

const ManageUsers = () => {
    const [users, loading] = useUsers();
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setFilteredUsers(users || []);
    }, [users]);

    const handleSearch = async (e) => {
        e?.preventDefault();
        try {
            const response = await axiosSecure.get(`/users`, {
                params: { search: searchQuery, role: selectedRole },
            });
            setFilteredUsers(response.data);
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (p) => {
        if (p >= 1 && p <= totalPages) setCurrentPage(p);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <BallTriangle height={80} width={80} radius={5} color="#10b981" visible={true} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="heading-md">Manage users</h1>
                <p className="muted mt-1">
                    Browse, search, and filter platform users.
                </p>
            </div>

            <form
                onSubmit={handleSearch}
                className="card-modern p-4 sm:p-5 mb-6 flex flex-col sm:flex-row gap-3"
            >
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-modern pl-10"
                    />
                </div>
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="input-modern sm:w-48"
                >
                    <option value="">All roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Tour Guide">Tour Guide</option>
                    <option value="User">User</option>
                </select>
                <button type="submit" className="btn-primary-modern sm:w-auto">
                    <FiSearch /> Search
                </button>
            </form>

            {paginatedUsers.length === 0 ? (
                <div className="card-modern p-10 text-center">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-ink-100 items-center justify-center mb-4">
                        <FiUsers className="text-ink-500 text-2xl" />
                    </div>
                    <h3 className="heading-sm mb-2">No users found</h3>
                    <p className="text-ink-500">Try adjusting your filters.</p>
                </div>
            ) : (
                <>
                    <div className="card-modern overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table-modern">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedUsers.map((user) => (
                                        <tr key={user._id}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={user.image}
                                                        alt={user.userName}
                                                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-soft"
                                                    />
                                                    <span className="font-medium text-ink-900">
                                                        {user.userName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="text-ink-600">{user.userEmail}</td>
                                            <td>
                                                <span className={roleBadge(user.role)}>
                                                    {user.role || "User"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
                        <p className="text-sm text-ink-500">
                            Page {currentPage} of {totalPages} · {filteredUsers.length} total
                        </p>
                        <div className="inline-flex items-center gap-1">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="btn-secondary-modern !px-3 !py-2"
                                disabled={currentPage === 1}
                            >
                                <FiChevronLeft />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .slice(
                                    Math.max(0, currentPage - 3),
                                    Math.min(totalPages, currentPage + 2)
                                )
                                .map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                                            currentPage === page
                                                ? "bg-brand-600 text-white shadow-glow"
                                                : "bg-white ring-1 ring-ink-200 text-ink-700 hover:bg-ink-50"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="btn-secondary-modern !px-3 !py-2"
                                disabled={currentPage === totalPages}
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageUsers;
