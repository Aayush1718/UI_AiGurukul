import { useLogto } from "@logto/react";
import DashboardNavbar from "./DashboardNavbar";
import ThemeControls from "./ThemeControls";

export default function Navbar() {
  const { signIn, isAuthenticated } = useLogto();

  if (isAuthenticated) {
    return <DashboardNavbar />;
  }

  const handleSignIn = () => {
    signIn(`${window.location.origin}/callback`);
  };

  return (
    <nav className="ui-nav ui-nav--bordered">
        <div className="ui-nav-content flex items-center justify-between w-full mx-auto px-4 md:px-8">
            <div className="flex justify-start">
                <a href="/" className="ui-nav-logo flex items-center gap-2">
                    <span className="font-bold">AiGurukul</span>
                </a>
            </div>
            <div className="ui-nav-links hidden md:flex flex-1 justify-center gap-8">
                <a href="#features">Features</a>
                <a href="#capabilities">Capabilities</a>
                <a href="#how-it-works">How It Works</a>
            </div>
            <div className="flex justify-end items-center gap-2 md:gap-4">
                <ThemeControls />
                <button 
                  onClick={handleSignIn} 
                  className="ui-button ui-button--ghost hidden sm:inline-flex"
                >
                  Sign up
                </button>
                <button 
                  onClick={handleSignIn} 
                  className="ui-button ui-button--default text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2"
                >
                  Start Designing
                </button>
            </div>
        </div>
    </nav>
  );
}