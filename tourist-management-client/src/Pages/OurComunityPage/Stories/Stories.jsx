import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from "swiper/modules";
import useStory from '../../../Hooks/useStory';
import { BallTriangle } from 'react-loader-spinner';

const Stories = () => {
    const [stories, loading] = useStory();

    return (
        <section id="stories" className="section bg-ink-50/50">
            <div className="container-page">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <span className="eyebrow">Traveler voices</span>
                    <h2 className="heading-lg mt-4">Stories from our travelers</h2>
                    <p className="lead mt-4">
                        Inspiring journeys, challenges, and triumphs from explorers who embraced the world's diverse cultures.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <BallTriangle height={80} width={80} radius={5} color="#10b981" visible={true} />
                    </div>
                ) : (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        className="pb-14"
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                    >
                        {stories.map((tourist, index) => (
                            <SwiperSlide key={index}>
                                <article className="card-modern card-modern-hover group h-full">
                                    <div className="relative overflow-hidden aspect-[4/3]">
                                        <img
                                            src={tourist.images?.[0]}
                                            alt={tourist.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold line-clamp-1 mb-2 group-hover:text-brand-700 transition-colors">
                                            {tourist.title}
                                        </h3>
                                        <p className="text-sm text-ink-600 leading-relaxed line-clamp-4">
                                            {tourist.description}
                                        </p>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
};

export default Stories;
