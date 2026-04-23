const SectionTitle = ({ heading, description, eyebrow, align = "center", light = false }) => {
  const alignment = align === "left" ? "text-left" : "text-center mx-auto";
  const headingColor = light ? "text-white" : "text-ink-900";
  const descColor = light ? "text-ink-300" : "text-ink-600";

  return (
    <div className={`max-w-3xl mb-12 ${alignment}`}>
      {eyebrow && (
        <span className="eyebrow mb-4">{eyebrow}</span>
      )}
      <h2 className={`heading-lg ${headingColor}`}>{heading}</h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
