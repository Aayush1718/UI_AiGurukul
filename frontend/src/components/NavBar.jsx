import Button from "./Button";
import { useLogto } from "@logto/react";
import DashboardNavbar from "./DashboardNavbar";

export default function Navbar() {
  const { signIn, isAuthenticated } = useLogto();

  if (isAuthenticated) {
    return <DashboardNavbar />;
  }

  const handleSignIn = () => {
    signIn(`${window.location.origin}/callback`);
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
          <div className="hidden md:block h-4 w-px bg-zinc-800" />
          
          <div className="flex items-center gap-3">
            <Button onClick={handleSignIn}>
              Sign In
            </Button>

            <Button onClick={handleSignIn}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}