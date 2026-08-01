// src/components/SquadsTab.jsx
import { useState } from "react";
import { Plus, Pencil, Trash2, Shirt } from "lucide-react";
import { Card, SectionHeading, EmptyState, PrimaryButton, DangerButton, SecondaryButton, Badge } from "./Atoms.jsx";
import ManagerForm from "./ManagerForm.jsx";
import { getPlayerById, squadValue, remainingBudget, formatMoney } from "../lib/model.js";
import { POSITIONS, POSITION_LABELS } from "../lib/constants.js";

export default function SquadsTab({ league, admin, leagueApi }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (manager) => {
    setEditing(manager);
    setFormOpen(true);
  };

  const handleSave = (payload) => {
    if (editing) {
      leagueApi.updateManager(editing.id, payload);
    } else {
      leagueApi.addManager(payload);
    }
    setFormOpen(false);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionHeading>Squads</SectionHeading>
        {admin.isAdmin && (
          <PrimaryButton onClick={openNew} className="flex items-center gap-1.5">
            <Plus size={16} /> Add manager
          </PrimaryButton>
        )}
      </div>

      {league.managers.length === 0 ? (
        <EmptyState message="No managers yet. Sign in as administrator and create your first manager." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {(Array.isArray(league?.managers) ? league.managers : []).map((m) => {
            const value = squadValue(m.squad || []);
            const remaining = remainingBudget(m.squad || []);
            const isOpen = expanded === m.id;
            return (
              <Card key={m.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-pitch">{m.name}</div>
                    {m.teamName && <div className="text-sm text-slate/60">{m.teamName}</div>}
                  </div>
                  {admin.isAdmin && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => openEdit(m)}
                        className="p-1.5 rounded-lg hover:bg-pitch/10 text-pitch"
                        aria-label="Edit manager"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(m)}
                        className="p-1.5 rounded-lg hover:bg-red/10 text-red"
                        aria-label="Delete manager"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-3 text-sm">
                  <Badge tone="gold">{formatMoney(value)} value</Badge>
                  <Badge tone="pitch">{formatMoney(remaining)} left</Badge>
                  <Badge tone="muted">{(m.squad || []).length}/15</Badge>
                </div>

                <button
                  onClick={() => setExpanded(isOpen ? null : m.id)}
                  className="flex items-center gap-1.5 text-sm font-medium text-pitch mt-3 hover:underline"
                >
                  <Shirt size={14} /> {isOpen ? "Hide squad" : "View squad"}
                </button>

                {isOpen && (
                  <div className="mt-3 space-y-2">
                    {POSITIONS.map((pos) => {
                      const players = (m.squad || [])
                        .map(getPlayerById)
                        .filter((p) => p && p.position === pos);
                      if (players.length === 0) return null;
                      return (
                        <div key={pos}>
                          <div className="text-xs uppercase tracking-wide text-slate/50 font-semibold mb-1">
                            {POSITION_LABELS[pos]}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {players.map((p) => (
                              <span key={p.id} className="text-xs bg-pitch/5 px-2 py-1 rounded-lg">
                                {p.name} <span className="text-slate/40">({p.club})</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {formOpen && (
        <ManagerForm manager={editing} onSave={handleSave} onCancel={() => setFormOpen(false)} />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-slate/40 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <p className="mb-4 amharic">
              Delete <strong>{confirmDelete.name}</strong>? This can't be undone.
            </p>
            <div className="flex gap-2">
              <DangerButton
                className="flex-1"
                onClick={() => {
                  leagueApi.deleteManager(confirmDelete.id);
                  setConfirmDelete(null);
                }}
              >
                Delete
              </DangerButton>
              <SecondaryButton onClick={() => setConfirmDelete(null)}>Cancel</SecondaryButton>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
