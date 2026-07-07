import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <AuthCard>
        <h1 className="text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-2 text-zinc-400">
          Sign up to continue
        </p>

        <form className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="UserName"
            className="
              w-full rounded-xl border border-zinc-800
              bg-zinc-900 px-4 py-3 text-white
              outline-none focus:border-zinc-600
            "
          />
          <input
            type="email"
            placeholder="Email"
            className="
              w-full rounded-xl border border-zinc-800
              bg-zinc-900 px-4 py-3 text-white
              outline-none focus:border-zinc-600
            "
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full rounded-xl border border-zinc-800
              bg-zinc-900 px-4 py-3 text-white
              outline-none focus:border-zinc-600
            "
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="
              w-full rounded-xl border border-zinc-800
              bg-zinc-900 px-4 py-3 text-white
              outline-none focus:border-zinc-600
            "
          />       

          <button
            className="
              w-full rounded-xl bg-white
              py-3 font-medium text-black
              transition hover:bg-zinc-200
            "
          >
            Sign Up
          </button>
        </form>
      </AuthCard>
    </div>
  );
}