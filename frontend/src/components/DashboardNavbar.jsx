import { useLogto } from "@logto/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
export default function DashboardNavbar() {
  const navigate = useNavigate();
  const { signOut, isAuthenticated, signIn } = useLogto();
  const { userName } = useUser();
  const handleSignOut = () => {
    signOut(`${window.location.origin}/`);
  };

  return (
    <header className="border-b border-zinc-900">
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
        <h1 className="text-xl font-bold tracking-tight text-white">
          HouseAI
        </h1>

        <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition hidden md:block">Team</a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition hidden md:block">Blog</a>
          
          {/* User menu or Sign In */}
        {!isAuthenticated && (
          <button
            onClick={() => signIn(`${window.location.origin}/callback`)}
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
          >
            Sign In
          </button>
        )}
        </div>
      </div>
    </header>
  );
}