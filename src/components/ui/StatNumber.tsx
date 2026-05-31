interface StatNumberProps {
  label: string;
  value: string;
  description?: string;
  emphasized?: boolean;
  align?: "left" | "center";
}

export function StatNumber({ label, value, description, emphasized = true, align = "left" }: StatNumberProps) {
  const justify = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${justify}`}>
      <span className="hud-label">{label}</span>
      <span
        className={`font-display font-bold mt-2 ${emphasized ? "text-mars-orange" : "text-text-primary"}`}
        style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1 }}
      >
        {value}
      </span>
      {description && (
        <span className="text-text-tertiary text-xs mt-2 max-w-[18rem]">{description}</span>
      )}
    </div>
  );
}
