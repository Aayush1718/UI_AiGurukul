import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import BuildingSidebar from "../components/BuildingSidebar.jsx";
import PlannerChat from "../components/PlannerChat.jsx";
import PlotDesigner from "../components/PlotDesigner.jsx";
import DrawingToolbar from "../components/DrawingToolbar.jsx";
import LibraryView from "../components/LibraryView.jsx";
import ArtifactsView from "../components/ArtifactsView.jsx";

export default function BuildingPage() {
  const location = useLocation();
  const projectName = location.state?.projectName || "Modern Villa";
  const projectType = location.state?.projectType || "Full Layout";

  const [mobileTab, setMobileTab] = useState("plot");
  const [showSidebar, setShowSidebar] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Chat");
  const [selectedView, setSelectedView] =
    useState("Site Plan");

  return (
    <div className="h-screen bg-background text-foreground overflow-hidden">

      {/* Desktop */}
      <div className="hidden lg:flex h-full min-h-0">
        <div
          className={`shrink-0 flex flex-col border-r border-border transition-all duration-300 overflow-hidden ${
            desktopSidebarOpen ? "w-64" : "w-[4.5rem]"
          }`}
        >
          <div className="border-b border-border px-4 py-5 flex items-center justify-between min-w-[4.5rem]">
            <h1 className={`text-xl font-semibold transition-all duration-300 truncate ${desktopSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 hidden'}`}>
              {projectName}
            </h1>
            <button 
              onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition shrink-0 mx-auto"
            >
              <Menu size={20} />
            </button>
          </div>

          <BuildingSidebar
            activeSection={activeSection}
            onSelect={setActiveSection}
            isExpanded={desktopSidebarOpen}
          />
        </div>

        {activeSection === "Library" && (
          <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-background">
            <LibraryView />
          </div>
        )}

        {activeSection === "Artifacts" && (
          <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-background">
            <ArtifactsView />
          </div>
        )}

        {activeSection === "Chat" && (
          <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-background">
            <DrawingToolbar
              selectedView={selectedView}
              setSelectedView={setSelectedView}
              projectType={projectType}
            />
            <PlotDesigner selectedView={selectedView} />
          </div>
        )}

        {activeSection === "Chat" && <PlannerChat projectType={projectType} />}
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex h-full flex-col">

        {/* Header */}
        <div className="border-b border-border p-4">
          <button
            onClick={() => setShowSidebar(true)}
            className="flex items-center gap-2 text-lg font-semibold"
          >
            {projectName} ▼
          </button>
        </div>

        {/* Tabs */}
        {activeSection === "Chat" && (
          <div className="flex border-b border-border">
            <button
              onClick={() => setMobileTab("plot")}
              className={`flex-1 py-3 text-sm ${
                mobileTab === "plot"
                  ? "border-b-2 border-violet-500"
                  : ""
              }`}
            >
              Site Plan
            </button>

            <button
              onClick={() => setMobileTab("planner")}
              className={`flex-1 py-3 text-sm ${
                mobileTab === "planner"
                  ? "border-b-2 border-violet-500"
                  : ""
              }`}
            >
              Planner
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-h-0 flex w-full">
          {activeSection === "Library" && <LibraryView />}
          {activeSection === "Artifacts" && <ArtifactsView />}
          {activeSection === "Chat" && (
            mobileTab === "plot" ? (
              <div className="flex-1 flex flex-col min-h-0 w-full">
                <DrawingToolbar
                  selectedView={selectedView}
                  setSelectedView={setSelectedView}
                  projectType={projectType}
                />

                <PlotDesigner
                  selectedView={selectedView}
                />
              </div>
            ) : (
              <PlannerChat projectType={projectType} />
            )
          )}
        </div>

        {/* Sidebar Drawer */}
        {showSidebar && (
          <div
            className="fixed inset-0 z-50 bg-black/60"
            onClick={() => setShowSidebar(false)}
          >
            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                h-[70vh]
                rounded-t-3xl
                bg-background
              "
              onClick={(e) => e.stopPropagation()}
            >
              <BuildingSidebar
                activeSection={activeSection}
                onSelect={setActiveSection}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
