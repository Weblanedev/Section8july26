import { cn } from "@/lib/cn";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  label?: string;
  /** Light ring for dark/colored backgrounds */
  tone?: "default" | "light";
}

const sizeMap = {
  sm: 16,
  md: 32,
  lg: 48,
  xl: 72,
};

const strokeMap = {
  sm: 2,
  md: 2.5,
  lg: 2.5,
  xl: 3,
};

export function Spinner({
  size = "md",
  className,
  label = "Loading",
  tone = "default",
}: SpinnerProps) {
  const dimension = sizeMap[size];
  const stroke = strokeMap[size];
  const radius = (dimension - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * 0.22;

  const trackColor = tone === "light" ? "rgba(255,255,255,0.22)" : "currentColor";
  const trackOpacity = tone === "light" ? 1 : 0.18;
  const arcColor = tone === "light" ? "#FFFFFF" : "currentColor";

  return (
    <svg
      role="status"
      aria-label={label}
      width={dimension}
      height={dimension}
      viewBox={`0 0 ${dimension} ${dimension}`}
      className={cn(
        "spinner-ring",
        tone === "default" && "text-accent",
        className
      )}
    >
      <circle
        cx={dimension / 2}
        cy={dimension / 2}
        r={radius}
        fill="none"
        stroke={trackColor}
        strokeWidth={stroke}
        opacity={trackOpacity}
      />
      <circle
        cx={dimension / 2}
        cy={dimension / 2}
        r={radius}
        fill="none"
        stroke={arcColor}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${arc} ${circumference - arc}`}
      />
    </svg>
  );
}

export function SpinnerOverlay({
  message = "Loading...",
  showMessage = true,
}: {
  message?: string;
  showMessage?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-5 bg-background/75 backdrop-blur-md">
      <Spinner size="xl" />
      {showMessage && (
        <p className="text-sm font-medium text-muted animate-pulse">{message}</p>
      )}
    </div>
  );
}

/** Centered page/section loader with the large ring spinner */
export function SpinnerBlock({
  message = "Loading...",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[240px] flex-col items-center justify-center gap-5 py-16",
        className
      )}
    >
      <Spinner size="xl" />
      <p className="text-sm font-medium text-muted">{message}</p>
    </div>
  );
}
