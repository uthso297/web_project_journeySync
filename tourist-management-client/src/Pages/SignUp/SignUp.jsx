import { motion } from "motion/react";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../../Components/PageTitle";
import { AuthContext } from "../../Components/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FiUser, FiImage, FiMail, FiLock, FiEye, FiEyeOff, FiCompass, FiArrowRight, FiAlertCircle } from "react-icons/fi";

const SignUp = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const role = 'User';
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
        if (!regex.test(password)) {
            setPasswordError('Password must be 6–20 characters and include an uppercase letter, a lowercase letter, a number, and a special character.');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.value;
        const password = form.password.value;

        if (validatePassword(password)) {
            createUser(email, password).then(result => {
                updateUserProfile(name, image).then(() => {
                    const userInfo = {
                        userName: result.user.displayName,
                        userEmail: result.user.email,
                        role,
                        image,
                    };
                    axiosPublic.post('/users', userInfo).then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Account created!",
                                text: "Welcome aboard, traveler.",
                                icon: "success",
                                confirmButtonColor: "#10b981",
                            });
                            navigate(location.state || '/');
                            form.reset();
                        }
                    });
                });
            }).catch(() => {});
        }
    };

    const handleGoogle = () => {
        googleSignIn().then((result) => {
            const userInfo = {
                userName: result.user.displayName,
                userEmail: result.user.email,
                role,
                image: result.user.photoURL,
            };
            axiosPublic.post('/users', userInfo).then((res) => {
                const isNew = !!res.data.insertedId;
                Swal.fire({
                    title: isNew ? "Account created!" : "Welcome back!",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
                navigate(location.state || '/');
            });
        });
    };

    return (
        <div className="min-h-screen flex flex-col-reverse lg:flex-row bg-white">
            <PageTitle title="SignUp || JourneySync" />

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

                    <h1 className="heading-md mb-2">Create your account</h1>
                    <p className="text-ink-500 mb-8">
                        Join our community of explorers and start planning your next adventure.
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
                        Sign up with Google
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px flex-1 bg-ink-200" />
                        <span className="text-xs text-ink-400 uppercase tracking-wider">or</span>
                        <div className="h-px flex-1 bg-ink-200" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-group">
                            <label className="label-modern">Full name</label>
                            <div className="relative">
                                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Jane Traveler"
                                    className="input-modern pl-10"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="label-modern">Profile image URL</label>
                            <div className="relative">
                                <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                                <input
                                    type="url"
                                    name="image"
                                    required
                                    placeholder="https://..."
                                    className="input-modern pl-10"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="label-modern">Email</label>
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
                                    placeholder="Create a strong password"
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
                            {passwordError && (
                                <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-red-50 ring-1 ring-red-200 mt-1">
                                    <FiAlertCircle className="mt-0.5 text-red-600 flex-shrink-0" />
                                    <p className="text-xs text-red-700 leading-relaxed">{passwordError}</p>
                                </div>
                            )}
                        </div>

                        <label className="flex items-start gap-2.5 cursor-pointer">
                            <input
                                type="checkbox"
                                required
                                className="mt-0.5 w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-2 focus:ring-brand-500"
                            />
                            <span className="text-sm text-ink-600">
                                I agree to the{" "}
                                <a href="#" className="text-brand-700 font-medium hover:text-brand-800">
                                    community guidelines
                                </a>{" "}
                                and terms of service.
                            </span>
                        </label>

                        <button type="submit" className="w-full btn-primary-modern py-3 group">
                            Create account
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-ink-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-brand-700 font-semibold hover:text-brand-800">
                            Log in
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
                            Start your adventure
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                            Plan. Explore.<br /> Share the journey.
                        </h2>
                        <p className="text-ink-200 text-base sm:text-lg leading-relaxed">
                            Create an account to unlock personalized recommendations, save favorite destinations, and manage your travel plans in one place.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;
