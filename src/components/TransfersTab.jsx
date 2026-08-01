// src/components/TransfersTab.jsx
import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, SectionHeading, EmptyState, PrimaryButton, SecondaryButton, DangerButton, Select, Input } from "./Atoms.jsx";
import { PLAYERS, TOTAL_GAMEWEEKS } from "../lib/constants.js";
import { getPlayerById } from "../lib/model.js";

function TransferForm({ managers, transfer, onSave, onCancel }) {
  const safeManagers = Array.isArray(managers) ? managers : [];
  const [managerId, setManagerId] = useState(transfer?.managerId || safeManagers[0]?.id || "");
  const [playerOut, setPlayerOut] = useState(transfer?.playerOut || "");
  const [playerIn, setPlayerIn] = useState(transfer?.playerIn || "");
  const [gw, setGw] = useState(transfer?.gw || 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!managerId || !playerOut || !playerIn) return;
    onSave({ managerId, playerOut: Number(playerOut), playerIn: Number(playerIn), gw: Number(gw) });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate/40 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <SectionHeading>{transfer ? "Edit transfer" : "Record transfer"}</SectionHeading>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium text-slate/70">Manager</label>
            <Select value={managerId} onChange={(e) => setManagerId(e.target.value)}>
              {safeManagers.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate/70">Player out</label>
              <Select value={playerOut} onChange={(e) => setPlayerOut(e.target.value)}>
                <option value="">Select...</option>
                {PLAYERS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate/70">Player in</label>
              <Select value={playerIn} onChange={(e) => setPlayerIn(e.target.value)}>
                <option value="">Select...</option>
                {PLAYERS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate/70">Gameweek</label>
            <Input type="number" min={1} max={TOTAL_GAMEWEEKS} value={gw} onChange={(e) => setGw(e.target.value)} />
          </div>
          <div className="flex gap-2 pt-2">
            <PrimaryButton type="submit" className="flex-1">Save</PrimaryButton>
            <SecondaryButton type="button" onClick={onCancel}>Cancel</SecondaryButton>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function TransfersTab({ league, admin, leagueApi }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const safeLeague = league || {};
  const safeManagers = Array.isArray(safeLeague.managers) ? safeLeague.managers : [];
  const safeTransfers = Array.isArray(safeLeague.transfers) ? safeLeague.transfers : [];
  const safeAdmin = admin || {};

  const managerName = (id) => safeManagers.find((m) => m.id === id)?.name || "Unknown manager";

  const sorted = useMemo(
    () => [...safeTransfers].sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0)),
    [safeTransfers]
  );

  const handleSave = (payload) => {
    if (editing) {
      leagueApi.updateTransfer(editing.id, payload);
    } else {
      leagueApi.addTransfer(payload);
    }
    setFormOpen(false);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionHeading>Transfers</SectionHeading>
        {safeAdmin.isAdmin && safeManagers.length > 0 && (
          <PrimaryButton
            onClick={() => { setEditing(null); setFormOpen(true); }}
            className="flex items-center gap-1.5"
          >
            <Plus size={16} /> Record transfer
          </PrimaryButton>
        )}
      </div>

      {sorted.length === 0 ? (
        <EmptyState message="No transfers recorded yet." />
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate/10 text-left text-slate/60 uppercase text-xs tracking-wide">
                <th className="px-4 py-3">Manager</th>
                <th className="px-4 py-3">Out</th>
                <th className="px-4 py-3">In</th>
                <th className="px-4 py-3">GW</th>
                <th className="px-4 py-3">When</th>
                {safeAdmin.isAdmin && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody>
              {sorted.map((t) => (
                <tr key={t.id} className="border-b border-slate/5 last:border-0">
                  <td className="px-4 py-3 font-medium">{managerName(t.managerId)}</td>
                  <td className="px-4 py-3 text-red">{getPlayerById(t.playerOut)?.name || "-"}</td>
                  <td className="px-4 py-3 text-pitch">{getPlayerById(t.playerIn)?.name || "-"}</td>
                  <td className="px-4 py-3">{t.gw}</td>
                  <td className="px-4 py-3 text-slate/50">{new Date(t.timestamp || Date.now()).toLocaleDateString()}</td>
                  {safeAdmin.isAdmin && (
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5 justify-end">
                        <button onClick={() => { setEditing(t); setFormOpen(true); }} className="p-1.5 rounded-lg hover:bg-pitch/10 text-pitch" aria-label="Edit transfer"><Pencil size={14} /></button>
                        <button onClick={() => setConfirmDelete(t)} className="p-1.5 rounded-lg hover:bg-red/10 text-red" aria-label="Delete transfer"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {formOpen && (
        <TransferForm
          managers={safeManagers}
          transfer={editing}
          onSave={handleSave}
          onCancel={() => setFormOpen(false)}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-slate/40 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <p className="mb-4">This transfer record will be permanently deleted. Continue?</p>
            <div className="flex gap-2">
              <DangerButton className="flex-1" onClick={() => { leagueApi.deleteTransfer(confirmDelete.id); setConfirmDelete(null); }}>Delete</DangerButton>
              <SecondaryButton onClick={() => setConfirmDelete(null)}>Cancel</SecondaryButton>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
