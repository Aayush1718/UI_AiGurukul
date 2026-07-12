import Navbar from "../components/NavBar.jsx";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";

export default function FeasibilityAnalysisPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-8 flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">
                Analysis Complete
              </span>
              <span className="text-muted-foreground text-sm font-medium">
                ID: FA-2026-X8
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Feasibility Analysis
            </h1>
            <p className="text-muted-foreground mt-2 text-base">
              Zoning, compliance, and environmental constraints for <span className="text-foreground font-medium">123</span>
            </p>
          </div>
          
          <div>
            <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted border border-border rounded-lg text-sm font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export PDF
            </button>
          </div>
        </div>

        {/* Verdict Banner */}
        <div className="bg-[#141414] border border-border/60 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xl md:text-2xl font-bold mb-3">Verdict: Highly Feasible</h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Based on local municipal codes (Zone R-3), this parcel supports residential development up to 3 stories. Environmental risk is low, and standard setbacks apply. The site geometry is favorable for both standard and custom floor plans.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end shrink-0 w-full md:w-auto">
            <span className="text-muted-foreground text-xs mb-2">Do you want to build?</span>
            <button 
              onClick={() => navigate('/project/new')}
              className="w-full md:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              Proceed to Site Plan
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Zoning Classification" 
            value="R-3" 
            subtext="Multi-Family Res" 
            subtextColor="text-emerald-400" 
          />
          <MetricCard 
            title="Max Allowable Height" 
            value="35" 
            unit="ft"
            subtext="Or 3 stories max" 
          />
          <MetricCard 
            title="Max Lot Coverage" 
            value="45" 
            unit="%"
            subtext="Standard limit applied" 
            subtextColor="text-orange-400" 
          />
          <MetricCard 
            title="Environmental Risk" 
            value="Low" 
            subtext="Not in flood zone" 
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          
          {/* Required Setbacks */}
          <div className="lg:col-span-1 flex flex-col">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              Required Setbacks
            </h3>
            
            <div className="bg-[#141414] border border-border/60 rounded-2xl overflow-hidden flex-1">
              <div className="flex justify-between items-center px-5 py-4 border-b border-border/60">
                <span className="text-muted-foreground font-medium text-sm">Boundary</span>
                <span className="text-muted-foreground font-medium text-sm">Distance</span>
              </div>
              <div className="flex justify-between items-center px-5 py-4 border-b border-border/60">
                <span className="text-sm">Front (Street)</span>
                <span className="text-sm text-indigo-300 font-medium">20 ft</span>
              </div>
              <div className="flex justify-between items-center px-5 py-4 border-b border-border/60">
                <span className="text-sm">Rear</span>
                <span className="text-sm text-indigo-300 font-medium">15 ft</span>
              </div>
              <div className="flex justify-between items-center px-5 py-4 border-b border-border/60">
                <span className="text-sm">Side (Interior)</span>
                <span className="text-sm text-indigo-300 font-medium">5 ft</span>
              </div>
              <div className="flex justify-between items-center px-5 py-4">
                <span className="text-sm">Side (Street)</span>
                <span className="text-sm text-indigo-300 font-medium">10 ft</span>
              </div>
            </div>
          </div>

          {/* Site Geometry Preview */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Site Geometry Preview
            </h3>
            
            <div className="bg-[#141414] border border-border/60 rounded-2xl overflow-hidden flex-1 relative min-h-[300px]">
              {/* Dotted Background Grid */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(circle, #4f4f56 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />
              
              {/* SVG Geometry */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <svg viewBox="0 0 400 300" className="w-full max-w-sm drop-shadow-xl overflow-visible">
                  {/* Property Line */}
                  <polygon 
                    points="50,50 350,80 320,250 80,280" 
                    fill="none" 
                    stroke="#4F46E5" 
                    strokeWidth="3" 
                    strokeDasharray="8 8"
                    className="opacity-80"
                  />
                  {/* Buildable Envelope */}
                  <polygon 
                    points="95,95 295,115 275,215 115,235" 
                    fill="#10B981" 
                    fillOpacity="0.1" 
                    stroke="#10B981" 
                    strokeWidth="4" 
                  />
                </svg>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm border border-border/60 p-3 rounded-xl flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-indigo-500 rounded"></div>
                  <span className="text-xs text-muted-foreground">Property Line</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-emerald-500 rounded"></div>
                  <span className="text-xs text-muted-foreground">Buildable Envelope</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

function MetricCard({ title, value, unit, subtext, subtextColor = "text-muted-foreground" }) {
  return (
    <div className="bg-[#141414] border border-border/60 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-colors">
      <div className="text-sm text-muted-foreground mb-4 font-medium">{title}</div>
      <div>
        <div className="text-3xl font-bold flex items-baseline gap-1">
          {value}
          {unit && <span className="text-xl text-muted-foreground font-medium">{unit}</span>}
        </div>
        <div className={`text-xs mt-1 font-medium ${subtextColor}`}>{subtext}</div>
      </div>
    </div>
  );
}
