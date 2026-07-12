import { useLogto } from "@logto/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ThemeControls from "./ThemeControls";
export default function DashboardNavbar() {
  const navigate = useNavigate();
  const { signOut, isAuthenticated, signIn } = useLogto();
  const { userName } = useUser();
  const handleSignOut = () => {
    signOut(`${window.location.origin}/`);
  };

  return (
    <header className="border-b border-border">
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          HouseAI
        </h1>

        <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition hidden md:block">Team</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition hidden md:block">Blog</a>
          <ThemeControls />
          
          {/* User menu or Sign In */}
        {!isAuthenticated && (
          <button
            onClick={() => signIn(`${window.location.origin}/callback`)}
            className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted hover:text-foreground"
          >
            Sign In
          </button>
        )}
        </div>
      </div>
    </header>
  );
}
