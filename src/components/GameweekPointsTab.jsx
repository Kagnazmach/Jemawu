// src/components/GameweekPointsTab.jsx
import { useState } from "react";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { Card, SectionHeading, EmptyState, Input, PrimaryButton, SecondaryButton } from "./Atoms.jsx";
import { TOTAL_GAMEWEEKS } from "../lib/constants.js";

function ScoreForm({ manager, gw, existing, onSave, onClose }) {
  const [points, setPoints] = useState(existing?.points ?? 0);
  const [hits, setHits] = useState(existing?.hits ?? 0);

  const adjusted = Number(points) - Number(hits) * 4;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ points: Number(points), hits: Number(hits), adjusted });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate/40 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <SectionHeading>
          {manager.name} — GW{gw}
        </SectionHeading>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium text-slate/70">Raw points</label>
            <Input type="number" value={points} onChange={(e) => setPoints(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-slate/70">Transfer hits taken</label>
            <Input type="number" min={0} value={hits} onChange={(e) => setHits(e.target.value)} />
          </div>
          <p className="text-sm text-slate/60">Adjusted score: <strong>{adjusted}</strong></p>
          <div className="flex gap-2 pt-2">
            <PrimaryButton type="submit" className="flex-1">
              Save
            </PrimaryButton>
            <SecondaryButton type="button" onClick={onClose}>
              Cancel
            </SecondaryButton>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function GameweekPointsTab({ league, admin, leagueApi }) {
  const [gw, setGw] = useState(league.currentGameweek || 1);
  const [editingManager, setEditingManager] = useState(null);

  if (league.managers.length === 0) {
    return <EmptyState message="No managers yet. Sign in as administrator and create your first manager." />;
  }

  const gwScores = league.gwScores[gw] || {};

  const totalFor = (managerId) => {
    let total = 0;
    for (let g = 1; g <= gw; g++) {
      const s = (league.gwScores[g] || {})[managerId];
      if (s) total += s.adjusted ?? (s.points || 0) - (s.hits || 0) * 4;
    }
    return total;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <SectionHeading>Gameweek Points</SectionHeading>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setGw((g) => Math.max(1, g - 1))}
            className="p-2 rounded-lg bg-pitch/5 hover:bg-pitch/10 text-pitch"
            aria-label="Previous gameweek"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="font-semibold min-w-[110px] text-center">Gameweek {gw}</span>
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
              <th className="px-4 py-3">Manager</th>
              <th className="px-4 py-3 text-right">Points</th>
              <th className="px-4 py-3 text-right">Hits</th>
              <th className="px-4 py-3 text-right">Adjusted</th>
              <th className="px-4 py-3 text-right">Season total</th>
              {admin.isAdmin && <th className="px-4 py-3" />}
            </tr>
          </thead>
          <tbody>
            {league.managers.map((m) => {
              const s = gwScores[m.id];
              return (
                <tr key={m.id} className="border-b border-slate/5 last:border-0">
                  <td className="px-4 py-3 font-medium">{m.name}</td>
                  <td className="px-4 py-3 text-right">{s?.points ?? "—"}</td>
                  <td className="px-4 py-3 text-right">{s?.hits ?? "—"}</td>
                  <td className="px-4 py-3 text-right font-semibold text-pitch">{s?.adjusted ?? "—"}</td>
                  <td className="px-4 py-3 text-right">{totalFor(m.id)}</td>
                  {admin.isAdmin && (
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setEditingManager(m)}
                        className="p-1.5 rounded-lg hover:bg-pitch/10 text-pitch"
                        aria-label="Edit score"
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {editingManager && (
        <ScoreForm
          manager={editingManager}
          gw={gw}
          existing={gwScores[editingManager.id]}
          onSave={(scoreData) => {
            leagueApi.setGWScore(gw, editingManager.id, scoreData);
            setEditingManager(null);
          }}
          onClose={() => setEditingManager(null)}
        />
      )}
    </div>
  );
}
