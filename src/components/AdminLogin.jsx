// src/components/AdminLogin.jsx
import { useState } from "react";
import { Lock, X } from "lucide-react";
import { Card, Input, PrimaryButton, SecondaryButton } from "./Atoms.jsx";

export default function AdminLogin({ admin, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await admin.login(email, password);
    setSubmitting(false);
    if (ok) onClose();
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    const ok = await admin.loginWithGoogle();
    setSubmitting(false);
    if (ok) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate/40 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate/50 hover:text-slate"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-full bg-pitch flex items-center justify-center">
            <Lock size={16} className="text-gold" />
          </div>
          <h2 className="heading-xl text-lg text-pitch">Administrator Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium text-slate/70">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate/70">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {admin.error && <p className="text-red text-sm">{admin.error}</p>}

          {admin.mode === "local" && (
            <p className="text-xs text-slate/50 amharic">
              Firebase isn't configured yet, so this is running in local demo mode. Sign in with{" "}
              <strong>{admin.LOCAL_ADMIN_EMAIL}</strong> / <strong>{admin.LOCAL_ADMIN_PASSWORD}</strong>.
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <PrimaryButton type="submit" disabled={submitting} className="flex-1">
              {submitting ? "Signing in..." : "Sign in"}
            </PrimaryButton>
            <SecondaryButton type="button" onClick={onClose}>
              Cancel
            </SecondaryButton>
          </div>
        </form>

        {admin.mode === "firebase" && (
          <>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-slate/20"></div>
              <span className="text-xs text-slate/50">or</span>
              <div className="flex-1 h-px bg-slate/20"></div>
            </div>
            <button
              onClick={handleGoogleSignIn}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate/20 bg-white hover:bg-slate/5 transition-colors text-sm font-medium text-slate disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {submitting ? "Signing in..." : "Sign in with Google"}
            </button>
          </>
        )}
      </Card>
    </div>
  );
}
