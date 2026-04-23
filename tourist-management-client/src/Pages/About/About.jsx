import PageTitle from '../../Components/PageTitle';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {
    FiCompass, FiGlobe, FiHeart, FiShield, FiUsers, FiMap,
    FiAward, FiArrowRight, FiStar, FiTarget, FiZap
} from 'react-icons/fi';
import { AuthContext } from '../../Components/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import checkGuide from '../../Hooks/checkGuide';

const values = [
    {
        icon: FiGlobe,
        title: "Thoughtful exploration",
        description: "Curated itineraries that go beyond landmarks — into culture, food, and local perspectives.",
    },
    {
        icon: FiShield,
        title: "Travel with confidence",
        description: "Vetted guides, secure payments, and 24/7 support so you can focus on the journey.",
    },
    {
        icon: FiHeart,
        title: "Community first",
        description: "Every booking supports local guides and the communities that make destinations special.",
    },
    {
        icon: FiZap,
        title: "Seamless planning",
        description: "From discovery to checkout — plan complex trips in minutes, not weeks.",
    },
];

const stats = [
    { value: "120+", label: "Destinations curated" },
    { value: "8.5K", label: "Happy travelers" },
    { value: "200+", label: "Expert guides" },
    { value: "4.9", label: "Average rating" },
];

const milestones = [
    { year: "2020", title: "JourneySync is born", text: "Launched with a handful of trips in South Asia and a simple idea: travel, simplified." },
    { year: "2022", title: "Community of 5,000", text: "Crossed 5,000 travelers and welcomed our first 100 guides across three continents." },
    { year: "2024", title: "Global reach", text: "Expanded to 120+ destinations with a focus on sustainable, locally-led experiences." },
    { year: "2026", title: "The next chapter", text: "Building smarter planning tools and deeper community features — for every kind of traveler." },
];

const About = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isGuide] = checkGuide();
    const dashboardLink = isAdmin
        ? "/dashboard/adminProfile"
        : isGuide
        ? "/dashboard/guideProfile"
        : "/dashboard/userProfile";

    return (
        <div className="bg-white">
            <PageTitle title="About || JourneySync" />

            {/* Hero */}
            <section className="relative min-h-[78vh] flex items-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1920')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-ink-950/85 via-ink-900/70 to-brand-900/50" />

                <div className="relative container-page py-20 text-white">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-sm font-medium mb-6">
                            <FiCompass /> About JourneySync
                        </span>
                        <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                            Travel, connect,
                            <span className="block bg-gradient-to-r from-brand-300 via-brand-400 to-accent-400 bg-clip-text text-transparent">
                                and come home changed.
                            </span>
                        </h1>
                        <p className="mt-6 text-base sm:text-lg lg:text-xl text-ink-200 max-w-2xl leading-relaxed">
                            We're building the travel platform we always wished existed — one that puts curiosity, community, and local culture at the center of every journey.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/trips" className="btn-primary-modern btn-lg-modern group">
                                Explore Trips
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/community" className="btn-modern btn-lg-modern bg-white/10 hover:bg-white/20 text-white backdrop-blur-md ring-1 ring-white/20">
                                Meet the Community
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="section">
                <div className="container-page">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div>
                            <span className="eyebrow">Our mission</span>
                            <h2 className="heading-lg text-ink-900 mt-4">
                                Travel should feel like a <span className="text-gradient">conversation</span>, not a checklist.
                            </h2>
                            <p className="lead mt-5">
                                JourneySync started with a simple belief: the best trips happen when travelers and locals meet as equals. We partner with guides who know their regions intimately — the hidden cafes, the family-run stays, the trails only locals know — and give them the tools to build experiences that feel genuine.
                            </p>
                            <p className="text-ink-600 mt-4 leading-relaxed">
                                Today, we help thousands of travelers plan seamlessly, pay securely, and share their stories — while directly supporting the people and places that make each destination unforgettable.
                            </p>
                            <div className="mt-8 flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[
                                        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
                                        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
                                        "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100",
                                        "https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&w=100",
                                    ].map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            className="w-10 h-10 rounded-full ring-2 ring-white object-cover"
                                            alt=""
                                        />
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                                        <FiStar className="fill-amber-400" />
                                        <FiStar className="fill-amber-400" />
                                        <FiStar className="fill-amber-400" />
                                        <FiStar className="fill-amber-400" />
                                        <FiStar className="fill-amber-400" />
                                    </div>
                                    <p className="text-sm text-ink-600">
                                        <span className="font-semibold text-ink-900">4.9 / 5</span> from 2,000+ reviews
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-soft-lg">
                                        <img
                                            src="https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800"
                                            alt="Mountain adventure"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="relative rounded-2xl overflow-hidden aspect-square shadow-soft-lg">
                                        <img
                                            src="https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800"
                                            alt="Traveler"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 mt-12">
                                    <div className="relative rounded-2xl overflow-hidden aspect-square shadow-soft-lg">
                                        <img
                                            src="https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=800"
                                            alt="Beach"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-soft-lg">
                                        <img
                                            src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800"
                                            alt="Cultural"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Floating badge */}
                            <div className="hidden sm:flex absolute -bottom-6 -left-6 card-modern p-4 items-center gap-3 max-w-xs">
                                <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0 shadow-glow">
                                    <FiAward className="text-white text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-ink-900">Top Travel Platform 2025</p>
                                    <p className="text-xs text-ink-500">Global Travel Awards</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-gradient-hero relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
                <div className="container-page relative text-white">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-white to-brand-300 bg-clip-text text-transparent">
                                    {s.value}
                                </div>
                                <p className="mt-2 text-sm sm:text-base text-ink-300">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section bg-ink-50/50">
                <div className="container-page">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <span className="eyebrow">What we believe</span>
                        <h2 className="heading-lg text-ink-900 mt-4">
                            Four principles that guide every trip
                        </h2>
                        <p className="lead mt-4">
                            Everything we build — from search to checkout to your guide's welcome note — is shaped by these ideas.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="card-modern card-modern-hover p-6 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center mb-5 shadow-glow group-hover:scale-110 transition-transform">
                                    <Icon className="text-white text-xl" />
                                </div>
                                <h3 className="text-lg font-semibold text-ink-900 mb-2">{title}</h3>
                                <p className="text-sm text-ink-600 leading-relaxed">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story / Timeline */}
            <section className="section">
                <div className="container-page">
                    <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
                        <div className="lg:col-span-2">
                            <div className="lg:sticky lg:top-24">
                                <span className="eyebrow">Our story</span>
                                <h2 className="heading-lg text-ink-900 mt-4">
                                    From a small idea to a global community
                                </h2>
                                <p className="lead mt-4">
                                    What began as a side project in 2020 has grown into a platform used by thousands. Here's how we got here — and where we're going next.
                                </p>

                                <div className="mt-8 rounded-2xl overflow-hidden aspect-[4/3]">
                                    <img
                                        src="https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=800"
                                        alt="Our journey"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="relative">
                                <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-brand-500 via-brand-300 to-transparent" />
                                <div className="space-y-8">
                                    {milestones.map((m, i) => (
                                        <div key={i} className="relative pl-16">
                                            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center shadow-glow ring-4 ring-white">
                                                <FiTarget className="text-white text-sm" />
                                            </div>
                                            <div className="card-modern p-6 hover:shadow-soft-lg transition-shadow">
                                                <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-1">
                                                    {m.year}
                                                </p>
                                                <h3 className="text-xl font-semibold text-ink-900 mb-2">
                                                    {m.title}
                                                </h3>
                                                <p className="text-ink-600 leading-relaxed">{m.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature showcase */}
            <section className="section bg-ink-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
                <div className="container-page relative">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <span className="eyebrow bg-white/10 text-brand-300 ring-white/10">
                            Built for travelers
                        </span>
                        <h2 className="heading-lg text-white mt-4">
                            Everything you need in one place
                        </h2>
                        <p className="text-ink-300 lead mt-4">
                            Discovery, booking, payment, and storytelling — seamlessly connected.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 lg:col-span-2 min-h-[320px]">
                            <img
                                src="https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                alt="Plan"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                            <div className="relative h-full flex flex-col justify-end p-8">
                                <div className="inline-flex w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 items-center justify-center mb-4">
                                    <FiMap className="text-brand-300" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Curated destinations</h3>
                                <p className="text-ink-200 max-w-md">
                                    Browse 120+ destinations across six continents — each one handpicked by travelers, for travelers.
                                </p>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 min-h-[320px]">
                            <img
                                src="https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                alt="Guides"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
                            <div className="relative h-full flex flex-col justify-end p-8">
                                <div className="inline-flex w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 items-center justify-center mb-4">
                                    <FiUsers className="text-brand-300" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Expert local guides</h3>
                                <p className="text-ink-200">
                                    Every guide is vetted, rated, and rooted in their community.
                                </p>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 min-h-[320px]">
                            <img
                                src="https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                alt="Stories"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
                            <div className="relative h-full flex flex-col justify-end p-8">
                                <div className="inline-flex w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 items-center justify-center mb-4">
                                    <FiHeart className="text-brand-300" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Share your story</h3>
                                <p className="text-ink-200">
                                    Turn your trip into a story that inspires the next traveler.
                                </p>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 lg:col-span-2 min-h-[320px]">
                            <img
                                src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                alt="Secure"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                            <div className="relative h-full flex flex-col justify-end p-8">
                                <div className="inline-flex w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 items-center justify-center mb-4">
                                    <FiShield className="text-brand-300" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Secure from start to finish</h3>
                                <p className="text-ink-200 max-w-md">
                                    PCI-compliant payments via Stripe, verified guides, and real human support whenever you need it.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container-page">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-brand shadow-soft-lg">
                        <div className="absolute inset-0 bg-mesh opacity-20" />
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
                            style={{
                                backgroundImage:
                                    "url('https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1600')",
                            }}
                        />
                        <div className="relative p-8 sm:p-12 lg:p-16 text-center text-white">
                            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
                                {user ? "Your next journey, planned in minutes." : "Ready to plan your next journey?"}
                            </h2>
                            <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto mb-8">
                                {user
                                    ? "Pick your destination, connect with a local guide, and turn your trip into a story worth sharing."
                                    : "Join thousands of travelers discovering the world differently — one story at a time."}
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {user ? (
                                    <>
                                        <Link to="/trips" className="btn-modern btn-lg-modern bg-white hover:bg-ink-50 text-ink-900 shadow-soft-lg group">
                                            Browse Trips
                                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <Link to={dashboardLink} className="btn-modern btn-lg-modern bg-white/10 hover:bg-white/20 text-white backdrop-blur-md ring-1 ring-white/30">
                                            Go to Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/signup" className="btn-modern btn-lg-modern bg-white hover:bg-ink-50 text-ink-900 shadow-soft-lg group">
                                            Create Free Account
                                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <Link to="/trips" className="btn-modern btn-lg-modern bg-white/10 hover:bg-white/20 text-white backdrop-blur-md ring-1 ring-white/30">
                                            Browse Trips
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
