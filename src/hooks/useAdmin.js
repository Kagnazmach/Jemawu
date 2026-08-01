// src/hooks/useAdmin.js
//
// Exposes: isAdmin, checking, error, login(email, password), logout(), mode
//
// mode === "firebase" when Firebase is configured (firebaseConfigured === true,
//   never called as a function -- see src/lib/firebase.js).
// mode === "local" otherwise, using a lightweight local-only session so the
//   admin experience still works before Firebase credentials are wired up.
//
// The admin session is never dropped while authenticated: Firebase's default
// browser persistence keeps the user signed in across refreshes, and the
// local fallback mirrors that with a persisted flag in localStorage.

import { useEffect, useState, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, firebaseConfigured } from "../lib/firebase.js";

const LOCAL_SESSION_KEY = "jemawu_fpl_local_admin";
const LOCAL_ADMIN_EMAIL = "admin@jemawu.local";
const LOCAL_ADMIN_PASSWORD = "jemawu-admin"; // change before real deployment

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(null);
  const mode = firebaseConfigured ? "firebase" : "local";

  useEffect(() => {
    if (mode === "firebase") {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsAdmin(Boolean(user));
        setChecking(false);
      });
      return () => unsubscribe();
    } else {
      try {
        const stored = window.localStorage.getItem(LOCAL_SESSION_KEY);
        setIsAdmin(stored === "true");
      } catch {
        setIsAdmin(false);
      }
      setChecking(false);
    }
  }, [mode]);

  const login = useCallback(
    async (email, password) => {
      setError(null);
      setChecking(true);
      try {
        if (mode === "firebase") {
          await signInWithEmailAndPassword(auth, email, password);
          // onAuthStateChanged will flip isAdmin + checking.
          return true;
        } else {
          if (email === LOCAL_ADMIN_EMAIL && password === LOCAL_ADMIN_PASSWORD) {
            window.localStorage.setItem(LOCAL_SESSION_KEY, "true");
            setIsAdmin(true);
            setChecking(false);
            return true;
          }
          throw new Error(
            "Invalid credentials. In local mode, use the demo admin account shown below."
          );
        }
      } catch (err) {
        setError(err.message || "Login failed.");
        setChecking(false);
        return false;
      }
    },
    [mode]
  );

  const logout = useCallback(async () => {
    if (mode === "firebase") {
      await signOut(auth);
    } else {
      window.localStorage.removeItem(LOCAL_SESSION_KEY);
      setIsAdmin(false);
    }
  }, [mode]);

  return { isAdmin, checking, error, login, logout, mode, LOCAL_ADMIN_EMAIL, LOCAL_ADMIN_PASSWORD };
}
