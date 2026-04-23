import React from 'react';
import { FiArrowUpRight, FiClock } from 'react-icons/fi';

const posts = [
    {
        img: "https://ceoworld.biz/wp-content/uploads/2024/04/Adventure-Tourism.jpg",
        category: "Adventure",
        title: "The Ultimate Guide to Adventure Travel",
        excerpt: "Explore the world's most thrilling destinations and learn how to plan your next adventure trip. From exotic jungles to arctic expeditions — we've got you covered.",
        readTime: "6 min read",
    },
    {
        img: "https://static.wanderon.in/wp-content/uploads/2024/10/street-foods-in-india.jpg",
        category: "Food & Culture",
        title: "A Local's Guide to the Best Street Food",
        excerpt: "Experience the best street food around the world with tips from locals! Discover mouthwatering dishes and where to find them on your next trip.",
        readTime: "4 min read",
    },
    {
        img: "https://www.muchbetteradventures.com/magazine/content/images/size/w2000/2020/01/02173546/GettyImages-1155613712-1.jpg",
        category: "Solo Travel",
        title: "Top 10 Hidden Gems for Solo Travelers",
        excerpt: "Looking to explore off-the-beaten-path destinations? Check out our list of hidden gems that are perfect for solo adventurers seeking unique experiences.",
        readTime: "8 min read",
    },
];

const Blog = () => {
    return (
        <section className="section bg-white">
            <div className="container-page">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <span className="eyebrow">From the blog</span>
                    <h2 className="heading-lg mt-4">Travel insights & inspiration</h2>
                    <p className="lead mt-4">
                        Stories, tips, and insights from fellow travelers to guide your next journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, idx) => (
                        <article key={idx} className="card-modern card-modern-hover group cursor-pointer">
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={post.img}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <span className="absolute top-4 left-4 badge-modern bg-white/90 backdrop-blur text-ink-800 ring-white/60">
                                    {post.category}
                                </span>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-xs text-ink-500 mb-3">
                                    <FiClock /> {post.readTime}
                                </div>
                                <h3 className="text-lg font-semibold text-ink-900 mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-ink-600 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                                    Read article
                                    <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
