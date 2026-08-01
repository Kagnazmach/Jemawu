// src/components/PlayerValuesTab.jsx
import { useMemo, useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import { Card, SectionHeading, Select, Badge } from "./Atoms.jsx";
import { PLAYERS, POSITIONS, POSITION_LABELS, CLUBS } from "../lib/constants.js";
import { formatMoney } from "../lib/model.js";

export default function PlayerValuesTab() {
  const [query, setQuery] = useState("");
  const [posFilter, setPosFilter] = useState("ALL");
  const [clubFilter, setClubFilter] = useState("ALL");
  const [sortKey, setSortKey] = useState("points");
  const [sortDir, setSortDir] = useState("desc");

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const rows = useMemo(() => {
    let list = PLAYERS.filter((p) => {
      if (posFilter !== "ALL" && p.position !== posFilter) return false;
      if (clubFilter !== "ALL" && p.club !== clubFilter) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (typeof a[sortKey] === "string") return a[sortKey].localeCompare(b[sortKey]) * dir;
      return (a[sortKey] - b[sortKey]) * dir;
    });
    return list;
  }, [query, posFilter, clubFilter, sortKey, sortDir]);

  const SortHeader = ({ label, sortField, className = "" }) => (
    <th className={`px-4 py-3 cursor-pointer select-none ${className}`} onClick={() => toggleSort(sortField)}>
      <span className="inline-flex items-center gap-1">
        {label}
        <ArrowUpDown size={12} className={sortKey === sortField ? "text-gold" : "text-slate/30"} />
      </span>
    </th>
  );

  return (
    <div>
      <SectionHeading>Player Values</SectionHeading>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/40" />
          <input
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate/15 bg-white focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="Search players..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Select value={posFilter} onChange={(e) => setPosFilter(e.target.value)} className="w-40">
          <option value="ALL">All positions</option>
          {POSITIONS.map((p) => (
            <option key={p} value={p}>
              {POSITION_LABELS[p]}
            </option>
          ))}
        </Select>
        <Select value={clubFilter} onChange={(e) => setClubFilter(e.target.value)} className="w-48">
          <option value="ALL">All clubs</option>
          {CLUBS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate/10 text-left text-slate/60 uppercase text-xs tracking-wide">
              <SortHeader label="Player" sortField="name" />
              <SortHeader label="Club" sortField="club" />
              <th className="px-4 py-3">Pos</th>
              <SortHeader label="Price" sortField="price" className="text-right" />
              <SortHeader label="Points" sortField="points" className="text-right" />
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 100).map((p) => (
              <tr key={p.id} className="border-b border-slate/5 last:border-0 hover:bg-pitch/5">
                <td className="px-4 py-2.5 font-medium">{p.name}</td>
                <td className="px-4 py-2.5 text-slate/60">{p.club}</td>
                <td className="px-4 py-2.5">
                  <Badge tone="muted">{p.position}</Badge>
                </td>
                <td className="px-4 py-2.5 text-right font-semibold">{formatMoney(p.price)}</td>
                <td className="px-4 py-2.5 text-right">{p.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="p-6 text-center text-sm text-slate/50">No players match your filters.</div>}
        {rows.length > 100 && (
          <div className="p-3 text-center text-xs text-slate/40">Showing first 100 of {rows.length} matches — refine your search for more.</div>
        )}
      </Card>
    </div>
  );
}
