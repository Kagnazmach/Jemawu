// src/assets/JemawuLogo.jsx
import { CircleDot } from "lucide-react";

export default function JemawuLogo({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-pitch shrink-0">
        <CircleDot className="text-gold" size={22} />
        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-red border-2 border-cream" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="heading-xl text-lg text-pitch tracking-wide">
            <span className="amharic">ጀማዉ</span> FPL
          </div>
          <div className="text-[11px] uppercase tracking-widest text-slate/60 font-medium">
            Fantasy Premier League Manager
          </div>
        </div>
      )}
    </div>
  );
}
