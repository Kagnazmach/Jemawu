// src/lib/model.js
//
// Pure functions implementing FPL squad rules, budget enforcement, and the
// official auto-substitution algorithm. No React or Firebase imports here --
// keep this file testable in isolation.

import { BUDGET, SQUAD_COMPOSITION, SQUAD_SIZE, PLAYERS } from "./constants.js";

export function getPlayerById(id) {
  return PLAYERS.find((p) => p.id === id) || null;
}

export function squadValue(playerIds) {
  return playerIds.reduce((sum, id) => {
    const p = getPlayerById(id);
    return sum + (p ? p.price : 0);
  }, 0);
}

export function remainingBudget(playerIds) {
  return round2(BUDGET - squadValue(playerIds));
}

export function positionCounts(playerIds) {
  const counts = { GKP: 0, DEF: 0, MID: 0, FWD: 0 };
  playerIds.forEach((id) => {
    const p = getPlayerById(id);
    if (p && counts[p.position] !== undefined) counts[p.position] += 1;
  });
  return counts;
}

// Validates a full 15-player squad against composition + budget rules.
// Returns { valid: boolean, errors: string[] }
export function validateSquad(playerIds) {
  const errors = [];
  const uniqueIds = new Set(playerIds);

  if (playerIds.length !== SQUAD_SIZE) {
    errors.push(`Squad must have exactly ${SQUAD_SIZE} players (has ${playerIds.length}).`);
  }
  if (uniqueIds.size !== playerIds.length) {
    errors.push("Squad contains duplicate players.");
  }

  const counts = positionCounts(playerIds);
  Object.entries(SQUAD_COMPOSITION).forEach(([pos, required]) => {
    if (counts[pos] !== required) {
      errors.push(`Need exactly ${required} ${pos}, found ${counts[pos]}.`);
    }
  });

  const value = squadValue(playerIds);
  if (value > BUDGET + 1e-9) {
    errors.push(`Squad costs £${value.toFixed(1)}m, over the £${BUDGET.toFixed(1)}m budget.`);
  }

  const clubCounts = {};
  playerIds.forEach((id) => {
    const p = getPlayerById(id);
    if (!p) return;
    clubCounts[p.club] = (clubCounts[p.club] || 0) + 1;
  });
  Object.entries(clubCounts).forEach(([club, count]) => {
    if (count > 3) {
      errors.push(`Max 3 players per club exceeded for ${club} (${count}).`);
    }
  });

  return { valid: errors.length === 0, errors };
}

// Validates a starting XI + formation from within a valid 15-man squad.
// startingIds: array of 11 player ids. benchIds: array of 4 player ids (ordered).
export function validateFormation(startingIds) {
  const errors = [];
  if (startingIds.length !== 11) {
    errors.push(`Starting XI must have exactly 11 players (has ${startingIds.length}).`);
  }
  const counts = positionCounts(startingIds);
  if (counts.GKP !== 1) errors.push(`Starting XI must have exactly 1 goalkeeper (has ${counts.GKP}).`);
  if (counts.DEF < 3) errors.push(`Starting XI must have at least 3 defenders (has ${counts.DEF}).`);
  if (counts.FWD < 1) errors.push(`Starting XI must have at least 1 forward (has ${counts.FWD}).`);
  if (counts.DEF + counts.MID + counts.FWD !== 10) {
    errors.push("Outfield players must total exactly 10.");
  }
  return { valid: errors.length === 0, errors, formation: `${counts.DEF}-${counts.MID}-${counts.FWD}` };
}

// Official FPL auto-substitution logic.
//
// gwPointsById: map of playerId -> points scored that gameweek (0 or a
//   sentinel like null/undefined signals "did not play" for these purposes;
//   callers should pass 0 for an actual 0-point return and null/undefined
//   only when the player did not appear at all, if that distinction matters
//   to the caller -- this function treats both as "did not play" unless
//   `played` info is supplied separately via playedSet).
// startingXI: array of 11 player ids
// bench: ORDERED array of 4 player ids, bench[0] is first reserve GK or outfield
//   per FPL rules the benched goalkeeper only substitutes for the starting GK.
// playedSet: Set of player ids who actually played (appeared) this gameweek.
//   Players not in this set are treated as non-players and substituted out.
//
// Returns { finalXI: number[], subsMade: {out, in}[], benchGK: number, benchOutfield: number[] }
export function applyAutoSubstitutions(startingXI, bench, playedSet) {
  const subsMade = [];
  let finalXI = [...startingXI];

  const didPlay = (id) => playedSet.has(id);

  // Separate bench into GK and outfield reserves, preserving order.
  const benchGK = bench.find((id) => getPlayerById(id)?.position === "GKP");
  const benchOutfield = bench.filter((id) => id !== benchGK);

  // 1. Goalkeeper substitution: if starting GK didn't play, sub in bench GK.
  const startingGK = finalXI.find((id) => getPlayerById(id)?.position === "GKP");
  if (startingGK && !didPlay(startingGK) && benchGK && didPlay(benchGK)) {
    finalXI = finalXI.map((id) => (id === startingGK ? benchGK : id));
    subsMade.push({ out: startingGK, in: benchGK });
  }

  // 2. Outfield substitutions, in bench priority order, only if the
  //    resulting formation stays valid (>=3 DEF, >=1 FWD, exactly 1 GKP,
  //    11 total).
  const nonPlayingOutfield = finalXI.filter(
    (id) => id !== (subsMade[0]?.in ?? startingGK) && getPlayerById(id)?.position !== "GKP" && !didPlay(id)
  );

  nonPlayingOutfield.forEach((outId) => {
    for (const inId of benchOutfield) {
      if (subsMade.some((s) => s.in === inId)) continue; // already used
      if (!didPlay(inId)) continue; // reserve didn't play either
      const trialXI = finalXI.map((id) => (id === outId ? inId : id));
      const check = validateFormation(trialXI);
      if (check.valid) {
        finalXI = trialXI;
        subsMade.push({ out: outId, in: inId });
        break;
      }
    }
  });

  return { finalXI, subsMade, benchGK, benchOutfield };
}

export function round2(n) {
  return Math.round(n * 100) / 100;
}

export function formatMoney(n) {
  return `£${n.toFixed(1)}m`;
}
