// src/components/ManagerForm.jsx
import { useMemo, useState } from "react";
import { Search, X, Check } from "lucide-react";
import { Card, Input, Select, PrimaryButton, SecondaryButton, Badge, SectionHeading } from "./Atoms.jsx";
import { PLAYERS, POSITIONS, POSITION_LABELS, CLUBS, SQUAD_COMPOSITION } from "../lib/constants.js";
import { validateSquad, squadValue, remainingBudget, positionCounts, formatMoney, getPlayerById } from "../lib/model.js";

export default function ManagerForm({ manager, onSave, onCancel }) {
  const [name, setName] = useState(manager?.name || "");
  const [teamName, setTeamName] = useState(manager?.teamName || "");
  const [squad, setSquad] = useState(manager?.squad || []);
  const [query, setQuery] = useState("");
  const [posFilter, setPosFilter] = useState("ALL");
  const [clubFilter, setClubFilter] = useState("ALL");

  const validation = useMemo(() => validateSquad(squad), [squad]);
  const value = useMemo(() => squadValue(squad), [squad]);
  const remaining = useMemo(() => remainingBudget(squad), [squad]);
  const counts = useMemo(() => positionCounts(squad), [squad]);

  const filtered = useMemo(() => {
    return PLAYERS.filter((p) => {
      if (posFilter !== "ALL" && p.position !== posFilter) return false;
      if (clubFilter !== "ALL" && p.club !== clubFilter) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    }).slice(0, 60);
  }, [query, posFilter, clubFilter]);

  const toggle = (id) => {
    setSquad((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), teamName: teamName.trim(), squad });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate/40 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-thin relative">
        <button onClick={onCancel} className="absolute top-4 right-4 text-slate/50 hover:text-slate" aria-label="Close">
          <X size={20} />
        </button>
        <SectionHeading>{manager ? "Edit Manager" : "New Manager"}</SectionHeading>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate/70">Manager name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium text-slate/70">Team name (optional)</label>
              <Input value={teamName} onChange={(e) => setTeamName(e.target.value)} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-between bg-pitch/5 rounded-xl p-3">
            <div className="flex flex-wrap gap-3 text-sm">
              {POSITIONS.map((pos) => (
                <span key={pos} className={counts[pos] === SQUAD_COMPOSITION[pos] ? "text-pitch font-semibold" : "text-red font-semibold"}>
                  {pos} {counts[pos]}/{SQUAD_COMPOSITION[pos]}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span>Value: {formatMoney(value)}</span>
              <span className={remaining < 0 ? "text-red" : "text-pitch"}>Remaining: {formatMoney(remaining)}</span>
            </div>
          </div>

          {!validation.valid && squad.length > 0 && (
            <div className="text-xs text-red space-y-0.5">
              {validation.errors.map((e, i) => (
                <div key={i}>{e}</div>
              ))}
            </div>
          )}

          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="relative flex-1 min-w-[160px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/40" />
                <input
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate/15 bg-white focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Search players..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Select value={posFilter} onChange={(e) => setPosFilter(e.target.value)} className="w-32">
                <option value="ALL">All positions</option>
                {POSITIONS.map((p) => (
                  <option key={p} value={p}>
                    {POSITION_LABELS[p]}
                  </option>
                ))}
              </Select>
              <Select value={clubFilter} onChange={(e) => setClubFilter(e.target.value)} className="w-40">
                <option value="ALL">All clubs</option>
                {CLUBS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>

            <div className="max-h-72 overflow-y-auto scrollbar-thin border border-slate/10 rounded-xl divide-y divide-slate/5">
              {filtered.map((p) => {
                const selected = squad.includes(p.id);
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => toggle(p.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-gold/10 transition ${
                      selected ? "bg-gold/20" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {selected && <Check size={14} className="text-pitch" />}
                      <span className="font-medium">{p.name}</span>
                      <span className="text-slate/50">{p.club}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Badge tone="muted">{p.position}</Badge>
                      <span className="font-semibold">{formatMoney(p.price)}</span>
                    </span>
                  </button>
                );
              })}
              {filtered.length === 0 && <div className="p-4 text-sm text-slate/50 text-center">No players match.</div>}
            </div>
          </div>

          {squad.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {squad.map((id) => {
                const p = getPlayerById(id);
                if (!p) return null;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 bg-pitch text-cream text-xs px-2 py-1 rounded-full"
                  >
                    {p.name}
                    <button type="button" onClick={() => toggle(id)} aria-label={`Remove ${p.name}`}>
                      <X size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          <div className="flex gap-2 pt-2 sticky bottom-0 bg-cream pb-1">
            <PrimaryButton type="submit" disabled={!validation.valid} className="flex-1">
              Save manager
            </PrimaryButton>
            <SecondaryButton type="button" onClick={onCancel}>
              Cancel
            </SecondaryButton>
          </div>
        </form>
      </Card>
    </div>
  );
}
