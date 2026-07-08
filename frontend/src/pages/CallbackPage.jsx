import { useHandleSignInCallback } from "@logto/react";
import { useNavigate } from "react-router-dom";
import { useLogto } from "@logto/react";
import { supabase } from "../lib/supabaseClient";

export default function CallbackPage() {
  const navigate = useNavigate();
  const { getIdTokenClaims } = useLogto();

  const { isLoading } = useHandleSignInCallback(async () => {
    try {
      const claims = await getIdTokenClaims();
      const userId = claims?.sub;
      const email = claims?.email;

      if (!userId) {
        navigate("/");
        return;
      }

      // Check if user already exists in Supabase
      const { data: existingUser } = await supabase
        .from("users")
        .select("user_id")
        .eq("user_id", userId)
        .single();

      if (existingUser) {
        // Returning user — update last_login
        await supabase
          .from("users")
          .update({ last_login: new Date().toISOString() })
          .eq("user_id", userId);
        navigate("/dashboard", { replace: true });
      } else {
        // New user — needs to complete profile
        navigate("/complete-profile", {
          replace: true,
          state: { userId, email },
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
