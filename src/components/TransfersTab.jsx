import { useState } from "react";

export default function TransfersTab({ league, admin, leagueApi }) {
  const [error, setError] = useState(null);

  try {
    const safeLeague = league || {};
    const safeManagers = Array.isArray(safeLeague.managers) ? safeLeague.managers : [];
    const safeTransfers = Array.isArray(safeLeague.transfers) ? safeLeague.transfers : [];
    const safeAdmin = admin || {};

    return (
      <div style={{ padding: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Transfers</h2>
        
        <div style={{ background: '#f0f0f0', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 12 }}>
          <p><strong>Debug Info:</strong></p>
          <p>Managers: {safeManagers.length} (type: {typeof safeLeague.managers})</p>
          <p>Transfers: {safeTransfers.length} (type: {typeof safeLeague.transfers})</p>
          <p>Admin: {safeAdmin.isAdmin ? 'Yes' : 'No'}</p>
        </div>

        {safeTransfers.length === 0 ? (
          <p style={{ color: '#666' }}>No transfers recorded yet.</p>
        ) : (
          <ul>
            {safeTransfers.map((t, i) => (
              <li key={t.id || i}>GW{t.gw}: {t.managerId} — out {t.playerOut}, in {t.playerIn}</li>
            ))}
          </ul>
        )}
      </div>
    );
  } catch (err) {
    return (
      <div style={{ padding: 20, color: 'red' }}>
        <h2>Error in TransfersTab</h2>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>{err.message}</pre>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 10, marginTop: 10 }}>{err.stack}</pre>
      </div>
    );
  }
}
