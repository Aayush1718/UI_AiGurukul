import { useState } from "react";
import BuildingSidebar from "../components/BuildingSidebar.jsx";
import PlannerChat from "../components/PlannerChat.jsx";
import PlotDesigner from "../components/PlotDesigner.jsx";
import DrawingToolbar from "../components/DrawingToolbar.jsx";

export default function BuildingPage() {
  const [mobileTab, setMobileTab] = useState("plot");
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSection, setActiveSection] =
    useState("Drawings");
  const [selectedView, setSelectedView] =
    useState("Site Plan");
  return (
    <div className="h-screen bg-[#0A0A0A] text-white overflow-hidden">

      {/* Desktop */}
      <div className="hidden lg:flex h-full min-h-0">
        <div className="w-64 shrink-0 flex flex-col border-r border-zinc-900">
          <div className="border-b border-zinc-900 px-6 py-5">
            <h1 className="text-2xl font-semibold">
              Modern Villa
            </h1>
          </div>

          <BuildingSidebar
            activeSection={activeSection}
            onSelect={setActiveSection}
          />
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <DrawingToolbar
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />

          <PlotDesigner
            selectedView={selectedView}
          />
        </div>

        <PlannerChat />
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex h-full flex-col">

        {/* Header */}
        <div className="border-b border-zinc-900 p-4">
          <button
            onClick={() => setShowSidebar(true)}
            className="flex items-center gap-2 text-lg font-semibold"
          >
            Modern Villa ▼
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-900">
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

        {/* Content */}
        <div className="flex-1 min-h-0 flex">
          {mobileTab === "plot" ? (
            <div className="flex-1 flex flex-col min-h-0">
              <DrawingToolbar
                selectedView={selectedView}
                setSelectedView={setSelectedView}
              />

              <PlotDesigner
                selectedView={selectedView}
              />
            </div>
          ) : (
            <PlannerChat />
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
                bg-[#0A0A0A]
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