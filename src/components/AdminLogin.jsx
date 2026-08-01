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
      </Card>
    </div>
  );
}
