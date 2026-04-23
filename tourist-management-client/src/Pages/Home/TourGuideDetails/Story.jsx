import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { BallTriangle } from "react-loader-spinner";

const Story = ({ email }) => {
    const axiosPublic = useAxiosPublic();

    const {
        data: specificStoriess = [],
        isPending: isLoading,
        error,
    } = useQuery({
        queryKey: ["specificStoriess", email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/storie/${email}`);
            return res.data;
        },
    });

    return (
        <section className="section-sm bg-white">
            <div className="container-page">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <span className="eyebrow">From this guide</span>
                    <h2 className="heading-lg mt-4">Their stories</h2>
                    <p className="lead mt-4">Explore this guide's personal journeys and experiences.</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-16">
                        <BallTriangle height={80} width={80} radius={5} color="#10b981" visible={true} />
                    </div>
                ) : error ? (
                    <p className="text-center text-red-500">Something went wrong.</p>
                ) : specificStoriess.length === 0 ? (
                    <div className="text-center py-12 text-ink-500">No stories yet from this guide.</div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {specificStoriess.map((story) => (
                            <article key={story._id} className="card-modern card-modern-hover group">
                                <div className="relative overflow-hidden aspect-[4/3]">
                                    <img
                                        src={story.images?.[0]}
                                        alt={story.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-base font-semibold line-clamp-1 mb-2 group-hover:text-brand-700 transition-colors">
                                        {story.title}
                                    </h3>
                                    <p className="text-sm text-ink-600 leading-relaxed line-clamp-3">
                                        {story.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Story;
