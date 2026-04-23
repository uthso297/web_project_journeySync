import { useState, useContext } from 'react';
import useBooks from '../../../../Hooks/useBooks';
import usePackage from '../../../../Hooks/usePackage';
import useStory from '../../../../Hooks/useStory';
import useUsers from '../../../../Hooks/useUsers';
import { AuthContext } from '../../../../Components/AuthProvider';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts';
import {
    FiUsers, FiUserCheck, FiPackage, FiBookmark, FiBookOpen,
    FiDollarSign, FiClock, FiCheckCircle, FiXCircle, FiEdit2, FiX
} from 'react-icons/fi';

const STAT_COLORS = {
    blue: { bg: "bg-sky-50", ring: "ring-sky-100", text: "text-sky-600" },
    green: { bg: "bg-emerald-50", ring: "ring-emerald-100", text: "text-emerald-600" },
    purple: { bg: "bg-violet-50", ring: "ring-violet-100", text: "text-violet-600" },
    red: { bg: "bg-rose-50", ring: "ring-rose-100", text: "text-rose-600" },
    orange: { bg: "bg-accent-50", ring: "ring-accent-100", text: "text-accent-600" },
    amber: { bg: "bg-amber-50", ring: "ring-amber-100", text: "text-amber-600" },
};

const StatCard = ({ icon: Icon, label, value, color = "blue", prefix = "" }) => {
    const c = STAT_COLORS[color];
    return (
        <div className="card-modern p-5">
            <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl ${c.bg} ring-1 ${c.ring} flex items-center justify-center`}>
                    <Icon className={c.text} />
                </div>
            </div>
            <p className="mt-4 muted">{label}</p>
            <p className="mt-1 text-2xl font-bold text-ink-900">
                {prefix}{value || 0}
            </p>
        </div>
    );
};

const AdminProfile = () => {
    const [users, , refetch] = useUsers();
    const [books] = useBooks();
    const [packages] = usePackage();
    const [stories] = useStory();
    const { updateUserProfile } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminName, setAdminName] = useState('');
    const [adminImage, setAdminImage] = useState('');

    const admin = users?.find((user) => user.role === 'Admin');
    const generalUsers = users?.filter((user) => user.role === 'User');
    const tourGuides = users?.filter((user) => user.role === 'Tour Guide');

    const sumByStatus = (status) =>
        books?.filter((b) => b.status === status)
            ?.reduce((t, b) => t + parseFloat(b.price || 0), 0);

    const totalPendingPayment = sumByStatus('Pending');
    const totalInRiviewPayment = sumByStatus('In-review');
    const totalAcceptedPayment = sumByStatus('Accepted');
    const totalRjectedPayment = sumByStatus('Rejected');

    const openModal = () => {
        setAdminName(admin?.userName || '');
        setAdminImage(admin?.image || '');
        setIsModalOpen(true);
    };

    const chartData = [
        { name: 'Pending', price: totalPendingPayment || 0, fill: '#f59e0b' },
        { name: 'In-review', price: totalInRiviewPayment || 0, fill: '#0ea5e9' },
        { name: 'Accepted', price: totalAcceptedPayment || 0, fill: '#10b981' },
        { name: 'Rejected', price: totalRjectedPayment || 0, fill: '#ef4444' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(adminName, adminImage);
            const res = await axiosSecure.patch(`/users/${admin?.userEmail}`, {
                username: adminName,
                userimage: adminImage,
            });
            if (res.status === 200) {
                Swal.fire({
                    title: "Profile updated!",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
                refetch();
            }
            setIsModalOpen(false);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Update failed`,
                confirmButtonColor: "#ef4444",
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div>
                <span className="eyebrow">Admin</span>
                <h1 className="heading-md mt-3">Dashboard overview</h1>
                <p className="muted mt-1">Business snapshot and payment breakdown.</p>
            </div>

            {/* Admin Profile */}
            {admin && (
                <div className="card-modern p-6 sm:p-7">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-brand rounded-full blur opacity-40" />
                                <img
                                    src={admin.image}
                                    alt={admin.userName}
                                    className="relative w-16 h-16 rounded-full object-cover ring-2 ring-white"
                                />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                                    Admin
                                </p>
                                <p className="text-lg font-semibold text-ink-900">{admin.userName}</p>
                                <p className="text-sm text-ink-500">{admin.userEmail}</p>
                            </div>
                        </div>
                        <button onClick={openModal} className="btn-secondary-modern self-start sm:self-center">
                            <FiEdit2 /> Edit Profile
                        </button>
                    </div>
                </div>
            )}

            {/* KPIs */}
            <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
                    Platform stats
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    <StatCard icon={FiUsers} label="Total Clients" value={generalUsers?.length} color="blue" />
                    <StatCard icon={FiUserCheck} label="Tour Guides" value={tourGuides?.length} color="green" />
                    <StatCard icon={FiPackage} label="Packages" value={packages?.length} color="purple" />
                    <StatCard icon={FiBookmark} label="Bookings" value={books?.length} color="red" />
                    <StatCard icon={FiBookOpen} label="Stories" value={stories?.length} color="orange" />
                </div>
            </div>

            {/* Payment stats */}
            <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">
                    Payments
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={FiClock} label="Pending" value={totalPendingPayment} color="amber" prefix="$" />
                    <StatCard icon={FiDollarSign} label="In-review" value={totalInRiviewPayment} color="blue" prefix="$" />
                    <StatCard icon={FiCheckCircle} label="Accepted" value={totalAcceptedPayment} color="green" prefix="$" />
                    <StatCard icon={FiXCircle} label="Rejected" value={totalRjectedPayment} color="red" prefix="$" />
                </div>
            </div>

            {/* Chart */}
            <div className="card-modern p-6 sm:p-7">
                <div className="mb-4">
                    <h3 className="heading-sm">Payment breakdown</h3>
                    <p className="muted mt-1">Totals across payment statuses.</p>
                </div>
                <div style={{ width: '100%', height: 360 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: 12,
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 4px 16px -4px rgba(0,0,0,0.08)',
                                }}
                            />
                            <Bar dataKey="price" radius={[8, 8, 0, 0]}>
                                {chartData.map((entry, i) => (
                                    <Cell key={i} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-md card-modern p-6 sm:p-8 animate-fade-up">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 w-9 h-9 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
                        >
                            <FiX />
                        </button>
                        <h3 className="heading-sm mb-5">Edit profile</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-group">
                                <label className="label-modern">Name</label>
                                <input
                                    type="text"
                                    value={adminName}
                                    onChange={(e) => setAdminName(e.target.value)}
                                    className="input-modern"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="label-modern">Image URL</label>
                                <input
                                    type="url"
                                    value={adminImage}
                                    onChange={(e) => setAdminImage(e.target.value)}
                                    className="input-modern"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn-ghost-modern"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary-modern">
                                    Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProfile;
