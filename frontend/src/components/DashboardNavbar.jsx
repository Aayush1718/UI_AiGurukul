import { useLogto } from "@logto/react";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function DashboardNavbar() {
  const navigate = useNavigate();
  const { signOut, getIdTokenClaims, getIdToken } = useLogto();
  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchName = async () => {
      try {
        const claims = await getIdTokenClaims();
        if (claims?.sub) {
          const token = await getIdToken();
          if (token) {
            const res = await fetch("/api/profile", {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
              const data = await res.json();
              if (data?.name) {
                setUserName(data.name);
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch user name:", err);
      }
    };

    fetchName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initials = userName
    ? userName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const handleSignOut = () => {
    signOut(`${window.location.origin}/`);
  };
  return (
    <header className="border-b border-zinc-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <h1 className="text-lg font-semibold">
          HouseAI
        </h1>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="
              flex items-center gap-3
              rounded-3xl
              border border-zinc-800
              bg-zinc-900
              px-3 py-2
              transition
              hover:border-zinc-700
            "
          >
            <div
              className="
                flex h-8 w-8 items-center justify-center
                rounded-full
                bg-zinc-800
                text-sm font-medium
              "
            >
              {initials}
            </div>

            <span className="hidden sm:inline text-sm text-zinc-300 max-w-[120px] truncate">
              {userName || "User"}
            </span>

            {/* Chevron */}
            <svg
              className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <>
              {/* Backdrop to close on click outside */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div
                className="
                  absolute right-0 top-full mt-2 z-50
                  w-56 rounded-xl
                  border border-zinc-800 bg-zinc-950
                  p-1 shadow-xl shadow-black/40
                "
              >
                {/* User info */}
                <div className="px-3 py-2.5 border-b border-zinc-800">
                  <p className="text-sm font-medium text-white truncate">
                    {userName || "User"}
                  </p>
                </div>

                {/* Profile Link */}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/profile");
                  }}
                  className="
                    mt-1 w-full flex items-center gap-2
                    rounded-lg px-3 py-2.5
                    text-sm text-zinc-400
                    transition hover:bg-zinc-900 hover:text-white
                  "
                >
                  <svg
                    className="h-4 w-4"
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
                  Profile
                </button>

                {/* Sign out */}
                <button
                  onClick={handleSignOut}
                  className="
                    mt-1 w-full flex items-center gap-2
                    rounded-lg px-3 py-2.5
                    text-sm text-zinc-400
                    transition hover:bg-zinc-900 hover:text-white
                  "
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}