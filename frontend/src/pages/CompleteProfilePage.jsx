import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, email } = location.state || {};

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // If no userId in state, redirect to home
  if (!userId) {
    navigate("/", { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name.");
      return;
    }

    setSaving(true);
    try {
      const { error: dbError } = await supabase.from("users").insert({
        user_id: userId,
        email: email || null,
        name: trimmed,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      });

      if (dbError) {
        console.error("Supabase insert error:", dbError);
        setError("Something went wrong. Please try again.");
        setSaving(false);
        return;
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Profile save error:", err);
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-8">
      {/* Subtle radial glow behind the card */}
      <div
        className="
          pointer-events-none fixed inset-0
          bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]
        "
      />

      <div
        className="
          relative z-10 w-full max-w-md
          rounded-3xl border border-zinc-800
          bg-zinc-950/80 backdrop-blur-xl
          p-6 sm:p-8 md:p-10
          shadow-[0_0_80px_-20px_rgba(255,255,255,0.06)]
        "
      >
        {/* Icon */}
        <div
          className="
            mx-auto mb-6 flex h-14 w-14 items-center justify-center
            rounded-2xl bg-zinc-900 border border-zinc-800
          "
        >
          <svg
            className="h-7 w-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Complete Your Profile
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            One last step — tell us your name.
          </p>
        </div>

        {/* Email badge */}
        {email && (
          <div
            className="
              mb-6 flex items-center gap-2
              rounded-xl bg-zinc-900/60 border border-zinc-800
              px-4 py-3
            "
          >
            <svg
              className="h-4 w-4 shrink-0 text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <span className="text-sm text-zinc-400 truncate">{email}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="profile-name"
              className="block text-sm font-medium text-zinc-300 mb-2"
            >
              Full Name
            </label>
            <input
              id="profile-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              className="
                w-full rounded-xl border border-zinc-800
                bg-zinc-900/60 px-4 py-3 text-white
                placeholder:text-zinc-600
                outline-none
                transition-all duration-200
                focus:border-zinc-600 focus:ring-1 focus:ring-zinc-700
              "
            />
          </div>

          {/* Error message */}
          {error && (
            <div
              className="
                flex items-center gap-2 rounded-xl
                bg-red-950/40 border border-red-900/50
                px-4 py-3
              "
            >
              <svg
                className="h-4 w-4 shrink-0 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <span className="text-sm text-red-300">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="
              w-full rounded-xl bg-white
              py-3 font-medium text-black
              transition-all duration-200
              hover:bg-zinc-200 active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            "
          >
            {saving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-black" />
                <span>Saving...</span>
              </>
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Privacy note */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          Your information is stored securely and never shared.
        </p>
      </div>
    </div>
  );
}
