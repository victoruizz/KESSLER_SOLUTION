interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionTitle({ eyebrow, title, description, align = "left" }: SectionTitleProps) {
  const wrapper = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${wrapper} gap-3 max-w-2xl`}>
      {eyebrow && <span className="hud-label text-mars-orange">{eyebrow}</span>}
      <h2 className="font-display text-3xl md:text-4xl tracking-wide text-text-primary uppercase">
        {title}
      </h2>
      {description && <p className="text-text-secondary text-sm md:text-base leading-relaxed">{description}</p>}
    </div>
  );
}
