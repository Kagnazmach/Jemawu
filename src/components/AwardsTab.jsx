// src/components/AwardsTab.jsx
import { useState } from "react";
import { Award, Plus, Trash2, Star } from "lucide-react";
import { Card, SectionHeading, EmptyState, Select, Input, PrimaryButton, SecondaryButton, Badge } from "./Atoms.jsx";

const FIXED_AWARDS = [
  { key: "manager_of_the_month", label: "Manager of the Month", multi: true },
  { key: "highest_gw_score", label: "Highest GW Score", multi: true },
  { key: "best_transfer", label: "Best Transfer", multi: true },
  { key: "most_improved", label: "Most Improved", multi: true },
  { key: "season_champion", label: "Season Champion", multi: false },
];

function AwardEditor({ awardKey, label, multi, value, managers, onSave, onClose }) {
  const [managerId, setManagerId] = useState(managers[0]?.id || "");
  const [note, setNote] = useState("");

  const handleAdd = () => {
    if (!managerId) return;
    const entry = { managerId, note, awardedAt: new Date().toISOString() };
    if (multi) {
      onSave(awardKey, [...(value || []), entry]);
    } else {
      onSave(awardKey, entry);
    }
    setNote("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate/40 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <SectionHeading>{label}</SectionHeading>
        <div className="space-y-3">
          <Select value={managerId} onChange={(e) => setManagerId(e.target.value)}>
            {managers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </Select>
          <Input placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
          <div className="flex gap-2">
            <PrimaryButton onClick={handleAdd} className="flex-1">
              Award
            </PrimaryButton>
            <SecondaryButton onClick={onClose}>Done</SecondaryButton>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function AwardsTab({ league, admin, leagueApi }) {
  const [editingKey, setEditingKey] = useState(null);
  const [customName, setCustomName] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);

  const managerName = (id) => league.managers.find((m) => m.id === id)?.name || "Unknown";

  const handleSaveAward = (key, value) => {
    leagueApi.updateAwards({ [key]: value });
  };

  const addCustomAward = () => {
    if (!customName.trim()) return;
    const next = [...(league.awards.custom || []), { key: crypto.randomUUID(), name: customName.trim(), entries: [] }];
    leagueApi.updateAwards({ custom: next });
    setCustomName("");
    setShowCustomForm(false);
  };

  const removeCustomAward = (key) => {
    leagueApi.updateAwards({ custom: (league.awards.custom || []).filter((a) => a.key !== key) });
  };

  const addHallOfFame = () => {
    const managerId = league.managers[0]?.id;
    if (!managerId) return;
    leagueApi.updateAwards({
      hall_of_fame: [...(league.awards.hall_of_fame || []), { managerId, season: new Date().getFullYear().toString() }],
    });
  };

  if (league.managers.length === 0) {
    return <EmptyState message="No managers yet. Sign in as administrator and create your first manager." />;
  }

  return (
    <div>
      <SectionHeading>Awards</SectionHeading>

      <div className="grid sm:grid-cols-2 gap-4">
        {FIXED_AWARDS.map(({ key, label, multi }) => {
          const value = league.awards[key];
          const entries = multi ? value || [] : value ? [value] : [];
          return (
            <Card key={key}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-1.5">
                  <Award size={16} className="text-gold" /> {label}
                </h3>
                {admin.isAdmin && (
                  <button
                    onClick={() => setEditingKey(key)}
                    className="text-xs text-pitch font-medium hover:underline"
                  >
                    Add
                  </button>
                )}
              </div>
              {entries.length === 0 ? (
                <p className="text-sm text-slate/50">Not yet awarded.</p>
              ) : (
                <ul className="space-y-1 text-sm">
                  {entries.map((e, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Badge tone="gold">{managerName(e.managerId)}</Badge>
                      {e.note && <span className="text-slate/60">{e.note}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          );
        })}

        <Card>
          <h3 className="font-semibold flex items-center gap-1.5 mb-2">
            <Star size={16} className="text-gold" /> Hall of Fame
          </h3>
          {(league.awards.hall_of_fame || []).length === 0 ? (
            <p className="text-sm text-slate/50">No inductees yet.</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {(league.awards.hall_of_fame || []).map((e, i) => (
                <li key={i}>
                  <Badge tone="gold">{managerName(e.managerId)}</Badge> <span className="text-slate/50">{e.season}</span>
                </li>
              ))}
            </ul>
          )}
          {admin.isAdmin && (
            <button onClick={addHallOfFame} className="text-xs text-pitch font-medium hover:underline mt-2">
              Induct manager
            </button>
          )}
        </Card>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="heading-xl text-lg text-pitch">Custom Awards</h3>
          {admin.isAdmin && (
            <PrimaryButton onClick={() => setShowCustomForm(true)} className="flex items-center gap-1.5">
              <Plus size={16} /> New award
            </PrimaryButton>
          )}
        </div>

        {(league.awards.custom || []).length === 0 ? (
          <p className="text-sm text-slate/50">No custom awards created yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {(league.awards.custom || []).map((award) => (
              <Card key={award.key}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{award.name}</h4>
                  {admin.isAdmin && (
                    <button onClick={() => removeCustomAward(award.key)} className="text-red">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <p className="text-sm text-slate/50">No recipients yet.</p>
              </Card>
            ))}
          </div>
        )}

        {showCustomForm && (
          <div className="fixed inset-0 z-50 bg-slate/40 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="w-full max-w-sm">
              <SectionHeading>New custom award</SectionHeading>
              <Input
                placeholder="Award name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2 mt-3">
                <PrimaryButton onClick={addCustomAward} className="flex-1">
                  Create
                </PrimaryButton>
                <SecondaryButton onClick={() => setShowCustomForm(false)}>Cancel</SecondaryButton>
              </div>
            </Card>
          </div>
        )}
      </div>

      {editingKey && (
        <AwardEditor
          awardKey={editingKey}
          label={FIXED_AWARDS.find((a) => a.key === editingKey)?.label}
          multi={FIXED_AWARDS.find((a) => a.key === editingKey)?.multi}
          value={league.awards[editingKey]}
          managers={league.managers}
          onSave={handleSaveAward}
          onClose={() => setEditingKey(null)}
        />
      )}
    </div>
  );
}
