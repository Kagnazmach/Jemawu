// src/lib/firebase.js
//
// Firebase is initialized here with a hardcoded config (no .env file, per spec).
// Replace the placeholder values below with your real project's config from the
// Firebase Console -> Project Settings -> General -> "Your apps" -> SDK setup.
//
// IMPORTANT: `firebaseConfigured` is a BOOLEAN, never a function.
// Correct:   if (firebaseConfigured) { ... }
// Incorrect: if (firebaseConfigured()) { ... }   <-- never do this

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_PROJECT.firebaseapp.com",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_PROJECT.appspot.com",
  messagingSenderId: "REPLACE_WITH_SENDER_ID",
  appId: "REPLACE_WITH_APP_ID",
};

// Detect whether the placeholders above have actually been replaced.
const looksConfigured =
  firebaseConfig.apiKey &&
  !firebaseConfig.apiKey.startsWith("REPLACE_WITH") &&
  firebaseConfig.projectId &&
  !firebaseConfig.projectId.startsWith("REPLACE_WITH");

export const firebaseConfigured = Boolean(looksConfigured);

let app = null;
let auth = null;
let db = null;

if (firebaseConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };
