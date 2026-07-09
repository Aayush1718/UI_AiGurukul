import { useHandleSignInCallback } from "@logto/react";
import { useNavigate } from "react-router-dom";
import { useLogto } from "@logto/react";
import { supabase } from "../lib/supabaseClient";

export default function CallbackPage() {
  const navigate = useNavigate();
  const { getIdTokenClaims, getIdToken } = useLogto();

  const { isLoading } = useHandleSignInCallback(async () => {
    try {
      const claims = await getIdTokenClaims();
      const userId = claims?.sub;
      const email = claims?.email;

      const token = await getIdToken();
      if (!userId || !token) {
        navigate("/");
        return;
      }

      // Check if user already exists and has complete profile via secure backend
      let existingUser = null;
      try {
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          existingUser = await response.json();
        }
      } catch (err) {
        console.error("Error fetching profile via API:", err);
      }

      if (existingUser && existingUser.phone_number && existingUser.location) {
        // Returning user with complete profile
        navigate("/", { replace: true });
      } else {
        // New user or missing profile details — needs to complete profile
        navigate("/complete-profile", {
          replace: true,
          state: { userId, email, existingUser },
        });
      }
    } catch (err) {
      console.error("Callback error:", err);
      navigate("/", { replace: true });
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-5">
          {/* Animated ring */}
          <div className="relative h-16 w-16">
            <div
              className="
                absolute inset-0 rounded-full
                border-2 border-zinc-800
              "
            />
            <div
              className="
                absolute inset-0 rounded-full animate-spin
                border-2 border-transparent border-t-white
              "
            />
          </div>

          <div className="text-center">
            <p className="text-lg font-medium text-white">
              Signing you in
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Just a moment...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
