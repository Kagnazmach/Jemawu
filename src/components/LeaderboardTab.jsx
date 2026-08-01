// src/components/LeaderboardTab.jsx
import { useMemo, useState } from "react";
import { ArrowUp, ArrowDown, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, SectionHeading, EmptyState, Badge } from "./Atoms.jsx";
import { TOTAL_GAMEWEEKS } from "../lib/constants.js";

function computeStandingsUpTo(league, gw) {
  const totals = {};
  league.managers.forEach((m) => {
    totals[m.id] = { managerId: m.id, name: m.name, teamName: m.teamName, points: 0, gwPoints: 0, hits: 0 };
  });
  for (let g = 1; g <= gw; g++) {
    const gwScores = league.gwScores[g] || {};
    Object.entries(gwScores).forEach(([managerId, s]) => {
      if (!totals[managerId]) return;
      const adjusted = s.adjusted ?? (s.points || 0) - (s.hits || 0) * 4;
      totals[managerId].points += adjusted;
      if (g === gw) {
        totals[managerId].gwPoints = adjusted;
        totals[managerId].hits = s.hits || 0;
      }
    });
  }
  return Object.values(totals).sort((a, b) => b.points - a.points);
}

export default function LeaderboardTab({ league }) {
  const [gw, setGw] = useState(league.currentGameweek || 1);

  const standings = useMemo(() => computeStandingsUpTo(league, gw), [league, gw]);
  const prevStandings = useMemo(
    () => (gw > 1 ? computeStandingsUpTo(league, gw - 1) : []),
    [league, gw]
  );

  const prevRank = (managerId) => {
    const idx = prevStandings.findIndex((s) => s.managerId === managerId);
    return idx === -1 ? null : idx + 1;
  };

  if (league.managers.length === 0) {
    return (
      <EmptyState message="No managers yet. Sign in as administrator and create your first manager." />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <SectionHeading>Leaderboard</SectionHeading>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setGw((g) => Math.max(1, g - 1))}
            className="p-2 rounded-lg bg-pitch/5 hover:bg-pitch/10 text-pitch"
            aria-label="Previous gameweek"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="font-semibold text-slate min-w-[110px] text-center">Gameweek {gw}</span>
          <button
            onClick={() => setGw((g) => Math.min(TOTAL_GAMEWEEKS, g + 1))}
            className="p-2 rounded-lg bg-pitch/5 hover:bg-pitch/10 text-pitch"
            aria-label="Next gameweek"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate/10 text-left text-slate/60 uppercase text-xs tracking-wide">
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Manager</th>
              <th className="px-4 py-3 text-right">GW Pts</th>
              <th className="px-4 py-3 text-right">Hits</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(standings) ? standings : []).map((s, i) => {
              const rank = i + 1;
              const prior = prevRank(s.managerId);
              let change = null;
              if (prior !== null) {
                if (rank < prior) change = "up";
                else if (rank > prior) change = "down";
                else change = "same";
              }
              return (
                <tr key={s.managerId} className="border-b border-slate/5 last:border-0">
                  <td className="px-4 py-3 font-semibold">
                    <div className="flex items-center gap-1.5">
                      {rank}
                      {change === "up" && <ArrowUp size={14} className="text-pitch" />}
                      {change === "down" && <ArrowDown size={14} className="text-red" />}
                      {change === "same" && <Minus size={14} className="text-muted" />}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{s.name}</div>
                    {s.teamName && <div className="text-xs text-slate/50">{s.teamName}</div>}
                  </td>
                  <td className="px-4 py-3 text-right">{s.gwPoints}</td>
                  <td className="px-4 py-3 text-right">
                    {s.hits > 0 ? <Badge tone="red">-{s.hits * 4}</Badge> : "-"}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-pitch">{s.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
