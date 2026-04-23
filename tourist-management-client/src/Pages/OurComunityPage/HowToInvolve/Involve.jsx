import Grid from "./Grid";

const Involve = () => {
    return (
        <section className="section bg-ink-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
            <div className="container-page relative">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <span className="eyebrow bg-white/10 text-brand-300 ring-white/10">
                        Get involved
                    </span>
                    <h2 className="heading-lg text-white mt-4">
                        How to join the journey
                    </h2>
                    <p className="text-ink-300 lead mt-4">
                        Joining JourneySync is simple and rewarding. Create your profile, explore opportunities around the globe, and start crafting your own story.
                    </p>
                </div>
                <Grid />
            </div>
        </section>
    );
};

export default Involve;
