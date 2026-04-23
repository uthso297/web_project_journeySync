import { Link } from "react-router-dom";
import useSpecificStory from "../../../../Hooks/useSpecificStory";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { BallTriangle } from "react-loader-spinner";
import Swal from "sweetalert2";
import { FiEdit2, FiTrash2, FiEdit3, FiPlus } from "react-icons/fi";

const ManageStoriesUser = () => {
    const [specificStories, isLoading, refetch] = useSpecificStory();
    const axiosSecure = useAxiosSecure();

    const handleDelete = (storyId) => {
        Swal.fire({
            title: "Delete story?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/stories/${storyId}`).then((res) => {
                    if (res.data.deletedCount >= 1) refetch();
                });
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="heading-md">Manage your stories</h1>
                    <p className="muted mt-1">Edit, update, or remove your shared journeys.</p>
                </div>
                <Link to="/dashboard/addstory" className="btn-primary-modern">
                    <FiPlus /> New Story
                </Link>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <BallTriangle height={80} width={80} radius={5} color="#10b981" visible={true} />
                </div>
            ) : specificStories.length === 0 ? (
                <div className="card-modern p-12 text-center">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-brand-50 items-center justify-center mb-4">
                        <FiEdit3 className="text-brand-600 text-2xl" />
                    </div>
                    <h3 className="heading-sm mb-2">No stories yet</h3>
                    <p className="text-ink-500 mb-6">Share your first travel story and inspire others.</p>
                    <Link to="/dashboard/addstory" className="btn-primary-modern">
                        <FiPlus /> Add your first story
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specificStories.map((story) => (
                        <article
                            key={story._id}
                            className="card-modern card-modern-hover group flex flex-col"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
                                {story.images?.[0] && (
                                    <img
                                        src={story.images[0]}
                                        alt={story.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}
                                {story.images?.length > 1 && (
                                    <span className="absolute top-3 right-3 badge-modern bg-black/60 text-white ring-black/20">
                                        +{story.images.length - 1}
                                    </span>
                                )}
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-base font-semibold text-ink-900 line-clamp-1 mb-2">
                                    {story.title}
                                </h3>
                                <p className="text-sm text-ink-600 line-clamp-3 leading-relaxed flex-1">
                                    {story.description}
                                </p>
                                <div className="flex gap-2 mt-5 pt-4 border-t border-ink-100">
                                    <Link
                                        to={`/dashboard/editstory/${story._id}`}
                                        className="flex-1 btn-secondary-modern !py-2 !text-xs"
                                    >
                                        <FiEdit2 /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(story._id)}
                                        className="flex-1 btn-danger-modern !py-2 !text-xs"
                                    >
                                        <FiTrash2 /> Delete
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageStoriesUser;
