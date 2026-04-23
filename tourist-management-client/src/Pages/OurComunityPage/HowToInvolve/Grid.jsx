const Grid = () => {
    const data = [
        {
            step: "01",
            title: "Sign up and discover",
            description: "Register as a traveler or a guide in just a few clicks.",
            imageUrl: "https://etimg.etb2bimg.com/photo/94676301.cms",
        },
        {
            step: "02",
            title: "Choose your role",
            description: "Decide whether you want to travel as a tourist or lead as a guide.",
            imageUrl: "https://images.squarespace-cdn.com/content/v1/5a3bb03b4c326d76de73ddaa/1613133428233-NEPK9JBTH4M4QSQ0VN9F/The+Common+Wanderer-5244.jpg",
        },
        {
            step: "03",
            title: "Select packages",
            description: "Pick from carefully curated packages tailored to your needs.",
            imageUrl: "https://i.ibb.co.com/wL9WBFY/time-to-travel-wooden-sign-beach-background-49509295.webp",
        },
        {
            step: "04",
            title: "Add your story",
            description: "Share your unique travel experiences and inspire others to explore the world.",
            imageUrl: "https://www.hindustantimes.com/ht-img/img/2023/12/18/1600x900/Insta_1702871839024_1702871847203.png",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.map((item, index) => (
                <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 min-h-[260px] md:min-h-[300px]"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />

                    <div className="relative h-full flex flex-col justify-end p-7">
                        <span className="text-brand-400 text-sm font-bold tracking-widest mb-2">
                            STEP {item.step}
                        </span>
                        <h3 className="text-white text-2xl font-bold mb-2">
                            {item.title}
                        </h3>
                        <p className="text-ink-300 text-sm leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Grid;
