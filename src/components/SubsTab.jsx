// src/components/SubsTab.jsx
import { useMemo, useState } from "react";
import { ArrowRightLeft, Save } from "lucide-react";
import { Card, SectionHeading, EmptyState, Select, PrimaryButton, Badge, SaveStatusPill } from "./Atoms.jsx";
import { getPlayerById, validateFormation, applyAutoSubstitutions } from "../lib/model.js";

export default function SubsTab({ league, admin, leagueApi, saveStatus }) {
  const managersWithSquad = league.managers.filter((m) => (m.squad || []).length === 15);
  const [managerId, setManagerId] = useState(managersWithSquad[0]?.id || "");
  const manager = league.managers.find((m) => m.id === managerId);

  const [startingXI, setStartingXI] = useState(manager?.startingXI?.length === 11 ? manager.startingXI : []);
  const [bench, setBench] = useState(manager?.bench?.length === 4 ? manager.bench : []);
  const [notPlaying, setNotPlaying] = useState(new Set());
  const [preview, setPreview] = useState(null);

  const squadPlayers = (manager?.squad || []).map(getPlayerById).filter(Boolean);

  const toggleXI = (id) => {
    setStartingXI((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 11) return prev;
      return [...prev, id];
    });
    setBench((prev) => prev.filter((x) => x !== id));
  };

  const toggleBench = (id) => {
    setBench((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
    setStartingXI((prev) => prev.filter((x) => x !== id));
  };

  const formationCheck = useMemo(() => validateFormation(startingXI), [startingXI]);

  const togglePlayed = (id) => {
    setNotPlaying((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const runPreview = () => {
    const playedSet = new Set(
      [...startingXI, ...bench].filter((id) => !notPlaying.has(id))
    );
    const result = applyAutoSubstitutions(startingXI, bench, playedSet);
    setPreview(result);
  };

  const saveFormation = () => {
    leagueApi.updateManager(manager.id, { startingXI, bench });
  };

  if (managersWithSquad.length === 0) {
    return <EmptyState message="No manager has a complete 15-player squad yet. Build squads first from the Squads tab." />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <SectionHeading>Substitutions</SectionHeading>
        <SaveStatusPill status={saveStatus} />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Select
          value={managerId}
          onChange={(e) => {
            setManagerId(e.target.value);
            setPreview(null);
            const m = league.managers.find((x) => x.id === e.target.value);
            setStartingXI(m?.startingXI?.length === 11 ? m.startingXI : []);
            setBench(m?.bench?.length === 4 ? m.bench : []);
            setNotPlaying(new Set());
          }}
          className="w-56"
        >
          {managersWithSquad.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </Select>
        {formationCheck.formation && (
          <Badge tone={formationCheck.valid ? "pitch" : "red"}>
            Formation {formationCheck.formation}
          </Badge>
        )}
      </div>

      <Card className="mb-4">
        <h3 className="font-semibold text-slate mb-2">1. Pick starting XI ({startingXI.length}/11) and bench ({bench.length}/4)</h3>
        <p className="text-xs text-slate/50 mb-3">Tap a player to add to XI, tap again to move to bench.</p>
        <div className="grid sm:grid-cols-2 gap-1.5">
          {squadPlayers.map((p) => {
            const inXI = startingXI.includes(p.id);
            const onBench = bench.includes(p.id);
            return (
              <div
                key={p.id}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                  inXI ? "bg-pitch text-cream" : onBench ? "bg-gold/30" : "bg-slate/5"
                }`}
              >
                <span>
                  {p.name} <span className="opacity-60">({p.position})</span>
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => toggleXI(p.id)}
                    className={`text-xs px-2 py-0.5 rounded-full ${inXI ? "bg-cream text-pitch" : "bg-white/70"}`}
                  >
                    XI
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleBench(p.id)}
                    className={`text-xs px-2 py-0.5 rounded-full ${onBench ? "bg-slate text-cream" : "bg-white/70"}`}
                  >
                    Bench
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {!formationCheck.valid && startingXI.length === 11 && (
          <div className="text-xs text-red mt-3 space-y-0.5">
            {formationCheck.errors.map((e, i) => (
              <div key={i}>{e}</div>
            ))}
          </div>
        )}
        {admin.isAdmin && (
          <PrimaryButton
            className="mt-3 flex items-center gap-1.5"
            disabled={!formationCheck.valid || bench.length !== 4}
            onClick={saveFormation}
          >
            <Save size={14} /> Save formation
          </PrimaryButton>
        )}
      </Card>

      {formationCheck.valid && bench.length === 4 && (
        <Card>
          <h3 className="font-semibold text-slate mb-2">2. Preview mode: mark who didn't play</h3>
          <p className="text-xs text-slate/50 mb-3">
            Toggle any player who blanked (0 minutes) this gameweek, then run the official auto-substitution logic.
          </p>
          <div className="grid sm:grid-cols-2 gap-1.5 mb-3">
            {[...startingXI, ...bench].map((id) => {
              const p = getPlayerById(id);
              const isBench = bench.includes(id);
              const didNotPlay = notPlaying.has(id);
              return (
                <button
                  type="button"
                  key={id}
                  onClick={() => togglePlayed(id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left ${
                    didNotPlay ? "bg-red/10 text-red" : "bg-slate/5"
                  }`}
                >
                  <span>
                    {p?.name} {isBench && <span className="text-xs opacity-60">(bench)</span>}
                  </span>
                  <span className="text-xs">{didNotPlay ? "Did not play" : "Played"}</span>
                </button>
              );
            })}
          </div>
          <PrimaryButton onClick={runPreview} className="flex items-center gap-1.5">
            <ArrowRightLeft size={14} /> Run auto-substitutions
          </PrimaryButton>

          {preview && (
            <div className="mt-4 border-t border-slate/10 pt-3">
              <h4 className="font-semibold text-sm mb-2">Result</h4>
              {preview.subsMade.length === 0 ? (
                <p className="text-sm text-slate/60">No substitutions needed.</p>
              ) : (
                <ul className="text-sm space-y-1">
                  {preview.subsMade.map((s, i) => (
                    <li key={i}>
                      <span className="text-red">{getPlayerById(s.out)?.name}</span> →{" "}
                      <span className="text-pitch font-medium">{getPlayerById(s.in)?.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
