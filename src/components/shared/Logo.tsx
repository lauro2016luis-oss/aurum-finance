"use client";

interface LogoProps {
  variant?: "full" | "icon";
  theme?: "dark" | "light";
  size?: number;
  className?: string;
}

/**
 * AurumCash logo — inline SVG, crisp at any size.
 *
 * variant="icon"  → badge mark only (square, use size for px width)
 * variant="full"  → icon + wordmark lockup (size = badge height, wordmark scales)
 *
 * theme="dark"    → gold icon on dark bg + light wordmark  (sidebar, dark cards)
 * theme="light"   → gold icon on dark bg + dark wordmark   (header on light bg)
 */
export function Logo({ variant = "full", theme = "dark", size = 36, className }: LogoProps) {
  const wordColor  = theme === "dark"  ? "#F5F0E8" : "#1C1A14";
  const subColor   = theme === "dark"  ? "#8A8070" : "#9A9588";

  // Icon is always the same (dark badge + gold mark)
  const IconMark = ({ s }: { s: number }) => {
    const r = s / 40; // scale ratio
    return (
      <svg
        width={s}
        height={s}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id={`gold-${s}`} x1="20" y1="3" x2="20" y2="37" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#EDD45C"/>
            <stop offset="55%"  stopColor="#D4AF37"/>
            <stop offset="100%" stopColor="#9A6E0A"/>
          </linearGradient>
          <linearGradient id={`bg-${s}`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#252018"/>
            <stop offset="100%" stopColor="#14100A"/>
          </linearGradient>
        </defs>

        {/* Badge */}
        <rect width="40" height="40" rx="10" fill={`url(#bg-${s})`}/>
        <rect
          x="0.6" y="0.6" width="38.8" height="38.8" rx="9.4"
          fill="none"
          stroke={`url(#gold-${s})`}
          strokeWidth="0.6"
          strokeOpacity="0.35"
        />

        {/*
          Geometric A — two tapered legs meeting at apex (y=8),
          feet at y=33, base width 18px centred on x=20.
          Crossbar at y=23–25.5, with an arrow-tip pointing right.
        */}

        {/* Left leg — tapered trapezoid */}
        <path
          d="M11.5 33 L18.8 8 L21.2 8 L15 33 Z"
          fill={`url(#gold-${s})`}
        />
        {/* Right leg */}
        <path
          d="M28.5 33 L21.2 8 L18.8 8 L25 33 Z"
          fill={`url(#gold-${s})`}
        />

        {/* Crossbar body */}
        <path
          d="M15.5 23 H26 V25.5 H15.5 Z"
          fill={`url(#gold-${s})`}
        />
        {/* Arrow tip — right-pointing chevron */}
        <path
          d="M26 23 L30.5 24.25 L26 25.5 Z"
          fill={`url(#gold-${s})`}
        />

        {/* Apex diamond accent */}
        <path
          d="M20 5.5 L21.6 7.8 L20 9.2 L18.4 7.8 Z"
          fill={`url(#gold-${s})`}
          opacity="0.85"
        />
      </svg>
    );
  };

  if (variant === "icon") {
    return <IconMark s={size} />;
  }

  // Full lockup
  const gap   = Math.round(size * 0.33);
  const nameSize = Math.round(size * 0.47);
  const subSize  = Math.round(size * 0.24);

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", gap, lineHeight: 1 }}
    >
      <IconMark s={size} />
      <span
        style={{
          fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 700,
          fontSize: nameSize,
          letterSpacing: "-0.02em",
          color: wordColor,
          lineHeight: 1,
        }}
      >
        AurumCash
      </span>
    </div>
  );
}
