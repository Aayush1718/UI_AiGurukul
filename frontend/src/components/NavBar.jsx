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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div>
          <h1 className="text-lg font-semibold">
            HouseAI
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleSignIn}>
            Sign In
          </Button>

          <Button onClick={handleSignIn}>
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}