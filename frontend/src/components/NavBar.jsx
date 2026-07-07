import Button from "./Button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div>
          <h1 className="text-lg font-semibold">
            HouseAI
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/signin">
            <Button >
              Sign In
            </Button>
          </Link>

          <Link to="/signup">
            <Button >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}