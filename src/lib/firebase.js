// src/lib/firebase.js
//
// Firebase is initialized here with a hardcoded config (no .env file, per spec).
// Replace the placeholder values below with your real project's config from the
// Firebase Console -> Project Settings -> General -> "Your apps" -> SDK setup.
//
// IMPORTANT: `firebaseConfigured` is a BOOLEAN, never a function.
// Correct:   if (firebaseConfigured) { ... }
// Incorrect: if (firebaseConfigured()) { ... } <-- never do this

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDayt_xN-qkD1ZNB6uJ379y4p5Jpas5gCA",
  authDomain: "jemawu-app.firebaseapp.com",
  projectId: "jemawu-app",
  storageBucket: "jemawu-app.firebasestorage.app",
  messagingSenderId: "586091330370",
  appId: "1:586091330370:web:6ef5b4299f48a7466ee6db",
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
