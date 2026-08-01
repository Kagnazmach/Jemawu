// src/hooks/useLeagueData.js
import { useCallback, useEffect, useRef, useState } from "react";
import {
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, firebaseConfigured } from "../lib/firebase.js";

const LOCAL_KEY = "jemawu_fpl_league_data";
const LEAGUE_DOC_PATH = ["leagues", "jfpl"];

const emptyLeague = () => ({
  managers: [],
  transfers: [],
  gwScores: {},
  awards: {
    manager_of_the_month: [],
    highest_gw_score: [],
    best_transfer: [],
    most_improved: [],
    season_champion: null,
    hall_of_fame: [],
    custom: [],
  },
  currentGameweek: 1,
  lastUpdated: null,
});

const normalizeLeague = (raw) => {
  if (!raw) return emptyLeague();
  return {
    ...raw,
    managers: Array.isArray(raw.managers) ? raw.managers : [],
    transfers: Array.isArray(raw.transfers) ? raw.transfers : [],
    awards: {
      manager_of_the_month: Array.isArray(raw.awards?.manager_of_the_month) ? raw.awards.manager_of_the_month : [],
      highest_gw_score: Array.isArray(raw.awards?.highest_gw_score) ? raw.awards.highest_gw_score : [],
      best_transfer: Array.isArray(raw.awards?.best_transfer) ? raw.awards.best_transfer : [],
      most_improved: Array.isArray(raw.awards?.most_improved) ? raw.awards.most_improved : [],
      season_champion: raw.awards?.season_champion || null,
      hall_of_fame: Array.isArray(raw.awards?.hall_of_fame) ? raw.awards.hall_of_fame : [],
      custom: Array.isArray(raw.awards?.custom) ? raw.awards.custom : [],
    },
    gwScores: typeof raw.gwScores === 'object' && raw.gwScores !== null ? raw.gwScores : {},
    currentGameweek: raw.currentGameweek || 1,
    lastUpdated: raw.lastUpdated || null,
  };
};

function loadLocal() {
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return emptyLeague();
    const parsed = JSON.parse(raw);
    return normalizeLeague(parsed);
  } catch {
    return emptyLeague();
  }
}

function saveLocal(data) {
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}

export function useLeagueData() {
  const [data, setData] = useState(firebaseConfigured ? null : loadLocal());
  const [loading, setLoading] = useState(firebaseConfigured);
  const [saveStatus, setSaveStatus] = useState("idle");
  const saveTimeout = useRef(null);

  useEffect(() => {
    if (!firebaseConfigured) return;
    const ref = doc(db, ...LEAGUE_DOC_PATH);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setData(normalizeLeague(snap.data()));
        } else {
          setData(emptyLeague());
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firestore snapshot error:", err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const flashSaved = useCallback(() => {
    setSaveStatus("saved");
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => setSaveStatus("idle"), 1800);
  }, []);

  const persist = useCallback(
    async (updater) => {
      setSaveStatus("saving");
      try {
        if (firebaseConfigured) {
          const ref = doc(db, ...LEAGUE_DOC_PATH);
          const base = normalizeLeague(data || emptyLeague());
          const next = updater(base);
          await setDoc(ref, { ...next, lastUpdated: serverTimestamp() }, { merge: false });
        } else {
          setData((prev) => {
            const base = normalizeLeague(prev || emptyLeague());
            const next = { ...updater(base), lastUpdated: new Date().toISOString() };
            saveLocal(next);
            return next;
          });
        }
        flashSaved();
      } catch (err) {
        console.error("Failed to save league data:", err);
        setSaveStatus("error");
      }
    },
    [data, flashSaved]
  );

  const addManager = useCallback(
    (manager) =>
      persist((league) => ({
        ...league,
        managers: [...league.managers, { id: crypto.randomUUID(), squad: [], startingXI: [], bench: [], ...manager }],
      })),
    [persist]
  );

  const updateManager = useCallback(
    (managerId, patch) =>
      persist((league) => ({
        ...league,
        managers: league.managers.map((m) => (m.id === managerId ? { ...m, ...patch } : m)),
      })),
    [persist]
  );

  const deleteManager = useCallback(
    (managerId) =>
      persist((league) => ({
        ...league,
        managers: league.managers.filter((m) => m.id !== managerId),
      })),
    [persist]
  );

  const addTransfer = useCallback(
    (transfer) =>
      persist((league) => ({
        ...league,
        transfers: [
          ...league.transfers,
          { id: crypto.randomUUID(), timestamp: new Date().toISOString(), ...transfer },
        ],
      })),
    [persist]
  );

  const updateTransfer = useCallback(
    (transferId, patch) =>
      persist((league) => ({
        ...league,
        transfers: league.transfers.map((t) => (t.id === transferId ? { ...t, ...patch } : t)),
      })),
    [persist]
  );

  const deleteTransfer = useCallback(
    (transferId) =>
      persist((league) => ({
        ...league,
        transfers: league.transfers.filter((t) => t.id !== transferId),
      })),
    [persist]
  );

  const setGWScore = useCallback(
    (gw, managerId, scoreData) =>
      persist((league) => ({
        ...league,
        gwScores: {
          ...league.gwScores,
          [gw]: {
            ...(league.gwScores[gw] || {}),
            [managerId]: { ...scoreData },
          },
        },
      })),
    [persist]
  );

  const setCurrentGameweek = useCallback(
    (gw) => persist((league) => ({ ...league, currentGameweek: gw })),
    [persist]
  );

  const updateAwards = useCallback(
    (patch) =>
      persist((league) => ({
        ...league,
        awards: { ...league.awards, ...patch },
      })),
    [persist]
  );

  return {
    data: data || emptyLeague(),
    loading,
    saveStatus,
    addManager,
    updateManager,
    deleteManager,
    addTransfer,
    updateTransfer,
    deleteTransfer,
    setGWScore,
    setCurrentGameweek,
    updateAwards,
  };
}
