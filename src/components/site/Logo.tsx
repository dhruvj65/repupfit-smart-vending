import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-2", className)}
      aria-label="RepUpFit home"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-[-12deg]">
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5 14l7-7 7 7" />
          <path d="M5 20l7-7 7 7" />
        </svg>
      </span>
      <span className="font-display text-lg font-extrabold uppercase tracking-tight">
        RepUp<span className="text-primary">Fit</span>
      </span>
    </Link>
  );
}
