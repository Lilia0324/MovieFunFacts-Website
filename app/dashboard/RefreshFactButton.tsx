"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function RefreshFactButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      onClick={onClick}
      disabled={isPending}
      aria-label="Refresh fun fact"
      aria-busy={isPending}
      className={[
        "inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-white/90 transition",
        "hover:bg-white/15 active:scale-[.99] cursor-pointer",
        isPending ? "cursor-not-allowed opacity-70" : "",
      ].join(" ")}
    >
      {/* Icon: Rotate while loading */}
      <svg viewBox="0 0 24 24" className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} aria-hidden>
        {/* A simple “refresh/ring” icon */}
        <path
          fill="currentColor"
          d="M12 6V3L8 7l4 4V8c2.76 0 5 2.24 5 5a5 5 0 0 1-9.9 1h-2.1A7 7 0 0 0 19 13c0-3.87-3.13-7-7-7z"
        />
      </svg>

      {/* Text: Switch while loading */}
      <span className="tabular-nums">
        {isPending ? "Loading…" : "Refresh"}
      </span>

      {/* Accessibility: Real-time hint for screen readers */}
      <span className="sr-only" aria-live="polite">
        {isPending ? "Refreshing the fact…" : "Ready to refresh"}
      </span>
    </button>
  );
}
