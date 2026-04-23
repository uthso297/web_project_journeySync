import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import usePackage from "../../../Hooks/usePackage";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FiGrid, FiList, FiArrowRight, FiMapPin } from "react-icons/fi";

const PackagesTrips = () => {
  const [packages, loading] = usePackage();
  const [viewMode, setViewMode] = useState("slider");
  const [sortOrder, setSortOrder] = useState("low-to-high");

  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: { perView: 3, spacing: 20 },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 2, spacing: 16 } },
      "(max-width: 640px)": { slides: { perView: 1.1, spacing: 12 } },
    },
  });

  const sortPackages = (pkgs) => {
    if (viewMode === "table") {
      return [...pkgs].sort((a, b) =>
        sortOrder === "low-to-high" ? a.price - b.price : b.price - a.price
      );
    }
    return pkgs;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <BallTriangle height={80} width={80} radius={5} color="#10b981" visible={true} />
      </div>
    );
  }

  const sortedPackages = sortPackages(packages);

  return (
    <section className="section-sm bg-ink-50/50">
      <div className="container-page">
        <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <h2 className="heading-md">All trip packages</h2>
            <p className="muted mt-1">{packages.length} experiences available</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {viewMode === "table" && (
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="input-modern !py-2 !text-sm w-auto"
              >
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            )}
            <div className="inline-flex p-1 bg-white rounded-xl ring-1 ring-ink-200 shadow-soft">
              <button
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  viewMode === "slider"
                    ? "bg-brand-600 text-white shadow-soft"
                    : "text-ink-600 hover:text-ink-900"
                }`}
                onClick={() => setViewMode("slider")}
              >
                <FiGrid /> Cards
              </button>
              <button
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  viewMode === "table"
                    ? "bg-brand-600 text-white shadow-soft"
                    : "text-ink-600 hover:text-ink-900"
                }`}
                onClick={() => setViewMode("table")}
              >
                <FiList /> Table
              </button>
            </div>
          </div>
        </div>

        {viewMode === "slider" ? (
          <div ref={sliderRef} className="keen-slider" key={sortedPackages.length}>
            {sortedPackages.map((pkg) => (
              <div key={pkg._id} className="keen-slider__slide">
                <div className="card-modern card-modern-hover group h-full">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={pkg.photos?.[5] || pkg.photos?.[0]}
                      alt={pkg.tripTitle}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 badge-modern bg-white/90 backdrop-blur text-ink-800 ring-white/60">
                      <FiMapPin /> {pkg.tourType}
                    </span>
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand-600 text-white text-sm font-bold shadow-glow">
                      ${pkg.price}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-brand-700 transition-colors">
                      {pkg.tripTitle}
                    </h3>
                    <p className="muted mt-1">{pkg.tourType}</p>
                    <Link
                      to={`/tourPackages/${pkg._id}`}
                      className="mt-4 btn-primary-modern w-full group/btn"
                    >
                      Book Now
                      <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-modern overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-modern">
                <thead>
                  <tr>
                    <th>Package</th>
                    <th>Type</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPackages.map((pkg) => (
                    <tr key={pkg._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={pkg.photos?.[5] || pkg.photos?.[0]}
                            alt={pkg.tripTitle}
                            className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                          />
                          <span className="font-medium text-ink-900 line-clamp-1">
                            {pkg.tripTitle}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="badge-info">{pkg.tourType}</span>
                      </td>
                      <td className="text-right font-semibold text-ink-900">
                        ${pkg.price}
                      </td>
                      <td className="text-right">
                        <Link to={`/tourPackages/${pkg._id}`} className="btn-primary-modern !px-4 !py-1.5">
                          Book
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesTrips;
