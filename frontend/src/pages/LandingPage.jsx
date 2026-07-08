import Navbar from "../components/NavBar.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import { useNavigate } from "react-router-dom";
import { useLogto } from "@logto/react";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, signIn } = useLogto();

  const handleBuildClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      signIn(`${window.location.origin}/callback`);
    }
  };

  const handleFeasibilityClick = () => {
    if (isAuthenticated) {
      navigate("/feasibility");
    } else {
      signIn(`${window.location.origin}/callback`);
    }
  };

  return (
    <div className="h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar />

      <main
        className="
          flex-1
          mx-auto
          max-w-7xl
          w-full
          px-4
          md:px-6
          flex
          flex-col
        "
      >
        {/* Hero */}

        <section
          className="
            flex
            flex-col
            items-center
            justify-center
            text-center
            py-8
            md:py-10
          "
        >
          <div className="mx-auto max-w-4xl">
            <h1
              className="
                text-4xl
                md:text-5xl
                lg:text-6xl
                font-bold
                tracking-tight
              "
            >
              Plan. Analyze. Build.
            </h1>

            <p
              className="
                mt-4
                text-base
                md:text-lg
                text-zinc-400
                max-w-2xl
                mx-auto
              "
            >
              AI-powered feasibility analysis and intelligent residential
              design for modern construction projects.
            </p>
          </div>
        </section>

        {/* Actions */}

        <section className="flex-1 pb-6">
          <div
            className="
              h-full
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-6
            "
          >
            <FeatureCard
              title="Feasibility Analysis"
              description="Analyze zoning regulations, setbacks, constraints and overall project feasibility before construction begins."
              onClick={handleFeasibilityClick}
            />

            <FeatureCard
              title="Build Your House"
              description="Generate floor plans, layouts and optimized residential designs tailored to your requirements."
              onClick={handleBuildClick}
            />
          </div>
        </section>
      </main>
    </div>
  );
}