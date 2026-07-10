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

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 text-sm text-zinc-400 bg-[#050505]">
        <div className="w-full px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                HouseAI
              </h2>
              <p className="text-zinc-500 leading-relaxed pr-4">
                AI-powered feasibility analysis and intelligent residential
                design for modern construction projects.
              </p>
            </div>
            
            <div>
              <h3 className="text-zinc-200 font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition">Updates</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-zinc-200 font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Team</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-zinc-200 font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-6 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} HouseAI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}