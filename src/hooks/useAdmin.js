// src/hooks/useAdmin.js
import { useEffect, useState, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, firebaseConfigured } from "../lib/firebase.js";

const LOCAL_SESSION_KEY = "jemawu_fpl_local_admin";
const LOCAL_ADMIN_EMAIL = "admin@jemawu.local";
const LOCAL_ADMIN_PASSWORD = "jemawu-admin";

// Only this email gets admin rights in Firebase mode
const ADMIN_EMAIL = "abelomah@gmail.com";

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const mode = firebaseConfigured ? "firebase" : "local";

  useEffect(() => {
    if (mode === "firebase") {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        // Only abelomah@gmail.com is admin
        setIsAdmin(Boolean(user && user.email === ADMIN_EMAIL));
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
          return true;
        } else {
          if (email === LOCAL_ADMIN_EMAIL && password === LOCAL_ADMIN_PASSWORD) {
            window.localStorage.setItem(LOCAL_SESSION_KEY, "true");
            setIsAdmin(true);
            setChecking(false);
            return true;
          }
          throw new Error("Invalid credentials.");
        }
      } catch (err) {
        setError(err.message || "Login failed.");
        setChecking(false);
        return false;
      }
    },
    [mode]
  );

  const loginWithGoogle = useCallback(async () => {
    setError(null);
    setChecking(true);
    try {
      if (mode === "firebase") {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        return true;
      }
      throw new Error("Google sign-in only available in Firebase mode.");
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
      setChecking(false);
      return false;
    }
  }, [mode]);

  const logout = useCallback(async () => {
    if (mode === "firebase") {
      await signOut(auth);
    } else {
      window.localStorage.removeItem(LOCAL_SESSION_KEY);
      setIsAdmin(false);
    }
  }, [mode]);

  return { isAdmin, checking, error, login, loginWithGoogle, logout, mode, user, LOCAL_ADMIN_EMAIL, LOCAL_ADMIN_PASSWORD };
}
