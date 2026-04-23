import { motion } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../../Components/PageTitle";
import { useContext, useState } from "react";
import { AuthContext } from "../../Components/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff, FiLock, FiMail, FiX, FiCompass, FiArrowRight, FiShield } from "react-icons/fi";

const Login = () => {
    const { signIn, googleSignIn, resetPassword } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [isOpen, setIsOpen] = useState(false);
    const [showCredetial, setShowCredetial] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const role = 'User';

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(() => {
                Swal.fire({
                    title: "Welcome back!",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
                form.reset();
                navigate(location.state || '/');
            })
            .catch(err => {
                if (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Check your password!",
                        confirmButtonColor: "#ef4444",
                    });
                }
            });
    };

    const handleGoogle = () => {
        googleSignIn().then((result) => {
            const userInfo = {
                userName: result.user.displayName,
                userEmail: result.user.email,
                role,
                image: result.user.photoURL,
            };
            axiosPublic.post('/users', userInfo).then(res => {
                if (res.data.insertedId === null || res.data.insertedId) {
                    Swal.fire({
                        title: "Welcome back!",
                        icon: "success",
                        confirmButtonColor: "#10b981",
                    });
                    navigate(location.state || '/');
                }
            });
        });
    };

    const handleForget = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        resetPassword(email)
            .then(() => {
                Swal.fire({
                    title: "Reset link sent!",
                    text: "Check your email for the password reset link.",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
                setIsOpen(false);
            })
            .catch(() => {});
    };

    return (
        <div className="min-h-screen flex flex-col-reverse lg:flex-row bg-white">
            <PageTitle title="Login || JourneySync" />

            {/* Left: Form */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:py-16"
            >
                <div className="w-full max-w-md">
                    <Link to="/" className="inline-flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
                            <FiCompass className="text-white text-xl" />
                        </div>
                        <span className="font-display text-xl font-bold text-ink-900">
                            Journey<span className="text-brand-600">Sync</span>
                        </span>
                    </Link>

                    <h1 className="heading-md mb-2">Welcome back</h1>
                    <p className="text-ink-500 mb-8">
                        Sign in to continue your journey and manage your bookings.
                    </p>

                    <button
                        onClick={handleGoogle}
                        className="w-full btn-secondary-modern py-3 mb-6"
                    >
                        <img
                            src="https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg"
                            alt="Google"
                            className="w-5 h-5 rounded-full"
                        />
                        Continue with Google
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px flex-1 bg-ink-200" />
                        <span className="text-xs text-ink-400 uppercase tracking-wider">or</span>
                        <div className="h-px flex-1 bg-ink-200" />
                    </div>

                    {/* Admin creds teaser */}
                    <button
                        type="button"
                        onClick={() => setShowCredetial(!showCredetial)}
                        className="w-full mb-4 px-4 py-3 rounded-xl bg-amber-50 ring-1 ring-amber-200 text-amber-900 text-sm font-medium hover:bg-amber-100 transition-colors flex items-center gap-2"
                    >
                        <FiShield className="text-amber-600" />
                        {showCredetial ? "Hide" : "Show"} demo admin credentials
                    </button>
                    {showCredetial && (
                        <div className="mb-4 p-4 rounded-xl bg-ink-50 ring-1 ring-ink-200 text-sm space-y-1 animate-fade-up">
                            <p><span className="text-ink-500">Email: </span><code className="font-mono text-ink-900">admin@admin.com</code></p>
                            <p><span className="text-ink-500">Password: </span><code className="font-mono text-ink-900">Abc@123</code></p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-group">
                            <label className="label-modern">Email address</label>
                            <div className="relative">
                                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="you@example.com"
                                    className="input-modern pl-10"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="label-modern">Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    className="input-modern pl-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <button
                                type="button"
                                onClick={() => setIsOpen(true)}
                                className="text-sm font-medium text-brand-700 hover:text-brand-800"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button type="submit" className="w-full btn-primary-modern py-3 group">
                            Sign in
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-ink-500">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-brand-700 font-semibold hover:text-brand-800">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </motion.div>

            {/* Right: Visual */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 relative overflow-hidden min-h-[40vh] lg:min-h-screen"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?cs=srgb&dl=pexels-freestockpro-3278215.jpg&fm=jpg')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-900/70 via-ink-900/60 to-accent-700/40" />
                <div className="relative z-10 h-full flex flex-col justify-center items-start text-white p-8 lg:p-16">
                    <div className="max-w-md">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-sm font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                            Welcome back, wanderer
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                            Explore, book,<br /> and travel.
                        </h2>
                        <p className="text-ink-200 text-base sm:text-lg leading-relaxed">
                            Sign in to continue exploring destinations, track your trips, and get the latest travel updates.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Forgot Password Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-md card-modern p-6 sm:p-8 animate-fade-up">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 w-9 h-9 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500 hover:text-ink-900 transition-colors"
                        >
                            <FiX />
                        </button>
                        <h2 className="heading-sm mb-2">Reset your password</h2>
                        <p className="text-sm text-ink-500 mb-5">
                            Enter your email and we'll send you a reset link.
                        </p>
                        <form onSubmit={handleForget} className="space-y-4">
                            <div className="relative">
                                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    name="email"
                                    required
                                    className="input-modern pl-10"
                                />
                            </div>
                            <button type="submit" className="w-full btn-primary-modern py-3">
                                Send reset link
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
