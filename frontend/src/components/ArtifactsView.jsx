import { FileCode2, Download, ExternalLink, Sparkles, LayoutTemplate, MessageSquareCode } from "lucide-react";
import { useState } from "react";

const MOCK_ARTIFACTS = [
  { id: 1, name: "Feasibility_Report_v1.pdf", type: "Report", status: "Generated", date: "Today, 11:30 AM", description: "Comprehensive analysis of site viability and zoning constraints." },
  { id: 2, name: "Initial_Floor_Plan.dxf", type: "CAD", status: "Generated", date: "Yesterday", description: "2D schematic layout exported for AutoCAD." },
  { id: 3, name: "Energy_Efficiency_Summary.md", type: "Document", status: "Generated", date: "Oct 24, 2023", description: "Breakdown of sustainable materials and estimated energy footprint." },
];

export default function ArtifactsView() {
  const [artifacts, setArtifacts] = useState(MOCK_ARTIFACTS);

  const getIcon = (type) => {
    switch (type) {
      case 'Report': return <LayoutTemplate className="text-emerald-400" size={24} />;
      case 'CAD': return <FileCode2 className="text-blue-400" size={24} />;
      default: return <MessageSquareCode className="text-violet-400" size={24} />;
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b border-border px-4 md:px-6 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            Artifacts <Sparkles size={18} className="text-violet-500" />
          </h2>
          <p className="text-sm text-muted-foreground mt-1 hidden sm:block">AI-generated reports, exports, and final outputs.</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="space-y-4">
          {artifacts.map(artifact => (
            <div key={artifact.id} className="group relative flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-border bg-muted/50 p-5 transition hover:border-zinc-700 hover:bg-muted/80">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-card border border-border shadow-inner">
                {getIcon(artifact.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-zinc-100">{artifact.name}</h3>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                    {artifact.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{artifact.description}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="uppercase tracking-wider">{artifact.type}</span>
                  <span className="h-1 w-1 rounded-full bg-zinc-700"></span>
                  <span>{artifact.date}</span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                <button className="flex flex-1 sm:flex-none justify-center items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm font-medium text-foreground transition hover:bg-zinc-700 hover:text-foreground">
                  <ExternalLink size={16} />
                  View
                </button>
                <button className="flex flex-1 sm:flex-none justify-center items-center gap-2 rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 transition hover:bg-primary">
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {artifacts.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
              <Sparkles size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground">No artifacts generated yet</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">Interact with the AI planner to generate reports, plans, and exports.</p>
          </div>
        )}
      </div>
    </div>
  );
}
