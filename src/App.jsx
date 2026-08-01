// src/App.jsx
import { useState } from "react";
import {
  Trophy,
  Users,
  ArrowRightLeft,
  Repeat,
  Award,
  Tag,
  CalendarDays,
  LogIn,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import JemawuLogo from "./assets/JemawuLogo.jsx";
import { useAdmin } from "./hooks/useAdmin.js";
import { useLeagueData } from "./hooks/useLeagueData.js";
import { firebaseConfigured } from "./lib/firebase.js";
import { TOTAL_GAMEWEEKS } from "./lib/constants.js";

import AdminLogin from "./components/AdminLogin.jsx";
import LeaderboardTab from "./components/LeaderboardTab.jsx";
import SquadsTab from "./components/SquadsTab.jsx";
import TransfersTab from "./components/TransfersTab.jsx";
import SubsTab from "./components/SubsTab.jsx";
import AwardsTab from "./components/AwardsTab.jsx";
import PlayerValuesTab from "./components/PlayerValuesTab.jsx";
import GameweekPointsTab from "./components/GameweekPointsTab.jsx";
import { SaveStatusPill, SkeletonGrid, Badge } from "./components/Atoms.jsx";

const TABS = [
  { key: "leaderboard", label: "Leaderboard", icon: Trophy },
  { key: "squads", label: "Squads", icon: Users },
  { key: "transfers", label: "Transfers", icon: ArrowRightLeft },
  { key: "subs", label: "Substitutions", icon: Repeat },
  { key: "awards", label: "Awards", icon: Award },
  { key: "values", label: "Player Values", icon: Tag },
  { key: "gwpoints", label: "Gameweek Points", icon: CalendarDays },
];

export default function App() {
  const admin = useAdmin();
  const league = useLeagueData();
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [loginOpen, setLoginOpen] = useState(false);

  const leagueApi = {
    addManager: league.addManager,
    updateManager: league.updateManager,
    deleteManager: league.deleteManager,
    addTransfer: league.addTransfer,
    updateTransfer: league.updateTransfer,
    deleteTransfer: league.deleteTransfer,
    setGWScore: league.setGWScore,
    setCurrentGameweek: league.setCurrentGameweek,
    updateAwards: league.updateAwards,
  };

  const renderTab = () => {
    if (league.loading) return <SkeletonGrid count={4} />;
    switch (activeTab) {
      case "leaderboard":
        return <LeaderboardTab league={league.data} />;
      case "squads":
        return <SquadsTab league={league.data} admin={admin} leagueApi={leagueApi} />;
      case "transfers":
        return <TransfersTab league={league.data} admin={admin} leagueApi={leagueApi} />;
      case "subs":
        return <SubsTab league={league.data} admin={admin} leagueApi={leagueApi} saveStatus={league.saveStatus} />;
      case "awards":
        return <AwardsTab league={league.data} admin={admin} leagueApi={leagueApi} />;
      case "values":
        return <PlayerValuesTab />;
      case "gwpoints":
        return <GameweekPointsTab league={league.data} admin={admin} leagueApi={leagueApi} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="flag-accent" />
      <header className="bg-cream border-b border-slate/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <JemawuLogo />

          <div className="flex items-center gap-3">
            <SaveStatusPill status={league.saveStatus} />

            {admin.isAdmin && (
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  onClick={() => league.setCurrentGameweek(Math.max(1, (league.data.currentGameweek || 1) - 1))}
                  className="p-1.5 rounded-lg hover:bg-pitch/10 text-pitch"
                  aria-label="Previous current gameweek"
                >
                  <ChevronLeft size={16} />
                </button>
                <Badge tone="pitch">GW {league.data.currentGameweek || 1}</Badge>
                <button
                  onClick={() =>
                    league.setCurrentGameweek(Math.min(TOTAL_GAMEWEEKS, (league.data.currentGameweek || 1) + 1))
                  }
                  className="p-1.5 rounded-lg hover:bg-pitch/10 text-pitch"
                  aria-label="Next current gameweek"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {admin.isAdmin ? (
              <button
                onClick={admin.logout}
                className="flex items-center gap-1.5 text-sm font-semibold text-red hover:underline"
              >
                <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-1.5 text-sm font-semibold text-pitch hover:underline"
              >
                <LogIn size={16} /> <span className="hidden sm:inline">Admin</span>
              </button>
            )}
          </div>
        </div>

        <nav className="max-w-6xl mx-auto px-4 pb-2 flex gap-1 overflow-x-auto scrollbar-thin">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                activeTab === key ? "bg-pitch text-cream" : "text-slate/60 hover:bg-pitch/5"
              }`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </nav>
      </header>

      {!firebaseConfigured && (
        <div className="bg-gold/20 text-slate text-xs text-center py-1.5 px-4">
          Running in local demo mode — Firebase isn't configured yet, so data is stored in this browser only. See
          README.md to connect Firestore for live multi-device sync.
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-6">{renderTab()}</main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate/40">
        <span className="amharic">ጀማዉ FPL</span> — built for Ethiopian Fantasy Premier League communities.
      </footer>

      {loginOpen && <AdminLogin admin={admin} onClose={() => setLoginOpen(false)} />}
    </div>
  );
}
