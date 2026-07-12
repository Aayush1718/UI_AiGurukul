export default function FeatureCard({
  title,
  description,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className="
        h-full
        min-h-[220px]
        cursor-pointer
        rounded-3xl
        border
        border-border
        bg-card
        p-8
        md:p-10
        transition-all
        duration-300
        hover:border-primary
        hover:-translate-y-1
      "
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            {title}
          </h2>

          <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-8 text-sm font-medium text-muted-foreground">
          Get Started →
        </div>
      </div>
    </div>
  );
}
