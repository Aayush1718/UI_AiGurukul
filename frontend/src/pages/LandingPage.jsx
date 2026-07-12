import Navbar from "../components/NavBar.jsx";
import { useNavigate } from "react-router-dom";
import { useLogto } from "@logto/react";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, signIn } = useLogto();

  const handleStartDesigningClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      signIn(`${window.location.origin}/callback`);
    }
  };

  return (
    <div className="landing landing-body">
      <Navbar />

      <main className="main-container">
        {/* Hero Section */}
        <section className="ui-section ui-section--hero mt-20">
          <div className="ui-badge animate-enter">
            <span className="ui-badge-dot"></span>
            Introducing AgenticArch
          </div>
          <h1 className="heading-xl animate-enter delay-1">
            Build Your Dream Home<br />Faster Than Ever.
          </h1>
          <p className="text-muted animate-enter delay-2">
            Make Customizable Home Architecture In Your Desired Way.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-enter delay-3 mt-12">
            <button 
              onClick={handleStartDesigningClick}
              className="ui-button ui-button--default ui-button--lg"
            >
              Start Designing
            </button>
          </div>
          
          {/* Browser Mockup */}
          <div className="browser-mockup-wrapper animate-enter delay-4">
            <div className="browser-mockup">
              <div className="browser-mockup-header relative flex items-center px-4 py-3 border-b border-border bg-muted/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="browser-mockup-url absolute left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-mono bg-background border border-border rounded-md shadow-sm text-muted-foreground w-64 text-center">
                  aigurukul.dev/dashboard
                </div>
              </div>
              <div className="relative overflow-hidden bg-background rounded-b-xl h-[500px]">
                {/* Mockup content inside */}
                <div className="absolute top-0 left-0 w-full h-full bg-zinc-50 border-0 flex items-center justify-center">
                   <span className="text-muted text-sm">[ Dashboard Image Placeholder ]</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="ui-section ui-section--bordered">
          <div className="text-center mb-20">
            <p className="text-muted text-sm uppercase tracking-widest font-semibold mb-4">Features</p>
            <h2 className="heading-lg">AI-Powered Architecture</h2>
            <p className="text-muted mt-4 max-w-2xl mx-auto">
              Design, analyze, and build your project with intelligent AI agents guiding every step.
            </p>
          </div>
          <div className="ui-grid">
            <div className="ui-card">
              <div className="ui-card-icon"><i className="ri-map-pin-line"></i></div>
              <h3 className="ui-card-title">Feasibility</h3>
              <p className="ui-card-desc">Instantly evaluate zoning, FAR, setbacks, and regulations.</p>
            </div>
            <div className="ui-card">
              <div className="ui-card-icon"><i className="ri-draft-line"></i></div>
              <h3 className="ui-card-title">Planning</h3>
              <p className="ui-card-desc">Generate optimized site layouts and project strategies.</p>
            </div>
            <div className="ui-card">
              <div className="ui-card-icon"><i className="ri-pencil-ruler-2-line"></i></div>
              <h3 className="ui-card-title">Design</h3>
              <p className="ui-card-desc">Create intelligent floor plans and building layouts.</p>
            </div>
            <div className="ui-card">
              <div className="ui-card-icon"><i className="ri-shield-check-line"></i></div>
              <h3 className="ui-card-title">Compliance</h3>
              <p className="ui-card-desc">Validate designs against local building codes.</p>
            </div>
            <div className="ui-card">
              <div className="ui-card-icon"><i className="ri-eye-line"></i></div>
              <h3 className="ui-card-title">Visualization</h3>
              <p className="ui-card-desc">Explore projects through plans, models, and reports.</p>
            </div>
            <div className="ui-card">
              <div className="ui-card-icon"><i className="ri-team-line"></i></div>
              <h3 className="ui-card-title">Collaboration</h3>
              <p className="ui-card-desc">Work seamlessly with clients, architects, and teams.</p>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="ui-section ui-section--bordered">
          <div className="text-center mb-16">
            <p className="text-muted text-sm uppercase tracking-widest font-semibold mb-4">Capabilities</p>
            <h2 className="heading-lg">Everything in One Platform</h2>
            <p className="text-muted mt-4 max-w-2xl mx-auto">
              A complete AI-native workspace for residential design from concept to final documentation.
            </p>
          </div>
          <div className="component-grid">
            <div className="component-card p-6 text-center flex flex-col justify-center h-full">
              <span className="font-bold text-lg mb-2">Projects</span>
              <span className="text-muted text-sm">Organize every project in one centralized workspace.</span>
            </div>
            <div className="component-card p-6 text-center flex flex-col justify-center h-full">
              <span className="font-bold text-lg mb-2">Conversation</span>
              <span className="text-muted text-sm">Chat naturally with specialized AI agents.</span>
            </div>
            <div className="component-card p-6 text-center flex flex-col justify-center h-full">
              <span className="font-bold text-lg mb-2">Analysis</span>
              <span className="text-muted text-sm">Perform zoning and feasibility assessments instantly.</span>
            </div>
            <div className="component-card p-6 text-center flex flex-col justify-center h-full">
              <span className="font-bold text-lg mb-2">Generation</span>
              <span className="text-muted text-sm">Produce site plans, layouts, and design options.</span>
            </div>
            <div className="component-card p-6 text-center flex flex-col justify-center h-full">
              <span className="font-bold text-lg mb-2">Optimization</span>
              <span className="text-muted text-sm">Improve designs using AI recommendations.</span>
            </div>
            <div className="component-card p-6 text-center flex flex-col justify-center h-full">
              <span className="font-bold text-lg mb-2">Reports</span>
              <span className="text-muted text-sm">Generate professional feasibility and design reports.</span>
            </div>
            <div className="component-card p-6 text-center flex flex-col justify-center h-full">
              <span className="font-bold text-lg mb-2">Versions</span>
              <span className="text-muted text-sm">Track every revision and restore previous iterations.</span>
            </div>
            <div className="component-card p-6 text-center flex flex-col justify-center h-full">
              <span className="font-bold text-lg mb-2">Files</span>
              <span className="text-muted text-sm">Manage drawings, CAD files, PDFs, and project assets.</span>
            </div>
            <div className="component-card p-6 text-center flex flex-col justify-center h-full">
              <span className="font-bold text-lg mb-2">Sharing</span>
              <span className="text-muted text-sm">Collaborate securely with clients and team members.</span>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="ui-section ui-section--bordered">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <p className="text-muted text-sm uppercase tracking-widest font-semibold mb-4">How It Works</p>
              <h2 className="heading-lg">Simple Three-Step Workflow</h2>
              <p className="text-muted text-base mt-6">
                From idea to complete architectural package through an AI-guided process.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 text-xs font-bold">1</div>
                  <div>
                    <span className="text-sm font-bold block">Describe</span>
                    <span className="text-muted text-sm">Tell the AI about your project requirements.</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 text-xs font-bold">2</div>
                  <div>
                    <span className="text-sm font-bold block">Analyze</span>
                    <span className="text-muted text-sm">AI evaluates zoning, constraints, and feasibility.</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 text-xs font-bold">3</div>
                  <div>
                    <span className="text-sm font-bold block">Generate</span>
                    <span className="text-muted text-sm">Create site plans, layouts, and design concepts.</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 text-xs font-bold">4</div>
                  <div>
                    <span className="text-sm font-bold block">Refine</span>
                    <span className="text-muted text-sm">Modify designs through natural conversation.</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 text-xs font-bold">5</div>
                  <div>
                    <span className="text-sm font-bold block">Review</span>
                    <span className="text-muted text-sm">Compare versions, reports, and recommendations.</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 text-xs font-bold">6</div>
                  <div>
                    <span className="text-sm font-bold block">Deliver</span>
                    <span className="text-muted text-sm">Export drawings, reports, and project documentation.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="ui-section text-center py-32 flex flex-col items-center">
          <h2 className="heading-lg">Start Designing Today</h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Start Designing Your Future Home You Wish For.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <button 
              onClick={handleStartDesigningClick} 
              className="ui-button ui-button--default ui-button--lg"
            >
              Start Designing
            </button>
          </div>
        </section>
      </main>

      <footer className="ui-footer">
        <div className="main-container">
          <div className="ui-footer-top" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between', width: '100%' }}>
            {/* Left Column */}
            <div className="ui-footer-brand flex flex-col gap-4" style={{ flex: 1, minWidth: '250px' }}>
              <div className="ui-nav-logo flex items-center gap-2">
                <span className="font-bold">AiGurukul</span>
              </div>
              <p className="text-muted text-sm">
                Make Customizable Home Architecture In Your Desired Way.
              </p>
              <div className="text-muted text-sm mt-4">Built By AiGurukul.</div>
            </div>
            
            {/* Right Column */}
            <div className="ui-footer-links flex flex-col gap-4" style={{ flex: 1, minWidth: '250px' }}>
              <h3 className="font-bold text-lg mb-2">CONTACT US</h3>
              <p className="text-muted text-sm mb-4">
                <span className="font-semibold block mb-1">Any Questions Or Comments?</span>
                Contact Us If You Want To Know More.
              </p>
              <div className="flex flex-col gap-3 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <i className="ri-map-pin-line text-xl"></i>
                  <span>BITS Pilani - Pilani Campus, Rajasthan, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-building-line text-xl"></i>
                  <span>Indian School of Business, Hyderabad, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-mail-line text-xl"></i>
                  <span>Vidyaang.Ai@Gmail.Com</span>
                </div>
              </div>
            </div>

            <div className="ui-footer-social flex flex-col gap-4" style={{ flex: 1, minWidth: '250px' }}>
                <a href="#" className="text-muted text-sm hover:text-foreground">AiGurukul</a>
                <a href="#" className="text-muted text-sm hover:text-foreground">AiGurukul Foundation</a>
                <a href="#" className="text-muted text-sm hover:text-foreground">AiGurukul YouTube</a>
                
                <div className="flex gap-4 mt-6">
                    <a href="#" className="text-xl text-muted hover:text-foreground transition-colors"><i className="ri-youtube-fill"></i></a>
                    <a href="#" className="text-xl text-muted hover:text-foreground transition-colors"><i className="ri-linkedin-fill"></i></a>
                    <a href="#" className="text-xl text-muted hover:text-foreground transition-colors"><i className="ri-twitter-x-line"></i></a>
                    <a href="#" className="text-xl text-muted hover:text-foreground transition-colors"><i className="ri-instagram-line"></i></a>
                </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}