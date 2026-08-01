// src/components/Atoms.jsx
// Small, reusable presentational building blocks shared across tabs.

import { Loader2, Inbox } from "lucide-react";

export function Card({ children, className = "" }) {
  return <div className={`card p-5 ${className}`}>{children}</div>;
}

export function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-gold text-slate font-semibold px-4 py-2 rounded-xl hover:brightness-95 active:brightness-90 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-pitch text-cream font-semibold px-4 py-2 rounded-xl hover:brightness-110 active:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function DangerButton({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-red text-cream font-semibold px-4 py-2 rounded-xl hover:brightness-110 active:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ children, tone = "pitch" }) {
  const tones = {
    pitch: "bg-pitch text-cream",
    gold: "bg-gold text-slate",
    red: "bg-red text-cream",
    muted: "bg-slate/10 text-slate",
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Input(props) {
  return (
    <input
      className="w-full px-3 py-2 rounded-lg border border-slate/15 bg-white focus:outline-none focus:ring-2 focus:ring-gold"
      {...props}
    />
  );
}

export function Select({ children, ...props }) {
  return (
    <select
      className="w-full px-3 py-2 rounded-lg border border-slate/15 bg-white focus:outline-none focus:ring-2 focus:ring-gold"
      {...props}
    >
      {children}
    </select>
  );
}

export function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate/70">
      <Loader2 className="animate-spin" size={32} />
      <p className="amharic">{label}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card p-5 animate-pulse-soft">
      <div className="h-4 w-1/3 bg-slate/10 rounded mb-3" />
      <div className="h-3 w-full bg-slate/10 rounded mb-2" />
      <div className="h-3 w-2/3 bg-slate/10 rounded" />
    </div>
  );
}

export function SkeletonGrid({ count = 4 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function EmptyState({ message }) {
  return (
    <div className="card p-10 flex flex-col items-center text-center gap-3 text-slate/70">
      <Inbox size={32} className="text-muted" />
      <p className="amharic max-w-sm">{message}</p>
    </div>
  );
}

export function SaveStatusPill({ status }) {
  if (status === "idle") return null;
  const map = {
    saving: { text: "Saving...", tone: "muted" },
    saved: { text: "Saved", tone: "gold" },
    error: { text: "Save failed", tone: "red" },
  };
  const cfg = map[status];
  if (!cfg) return null;
  return <Badge tone={cfg.tone}>{cfg.text}</Badge>;
}

export function SectionHeading({ children }) {
  return <h2 className="heading-xl text-xl text-pitch mb-4">{children}</h2>;
}
