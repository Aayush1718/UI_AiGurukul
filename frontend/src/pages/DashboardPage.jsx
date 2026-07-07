import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import ProjectCard from "../components/ProjectCard";
import CreateProjectModal from "../components/CreateProjectModal";
import CollaboratorsModal from "../components/CollaboratorsModal";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [collaboratorsOpen, setCollaboratorsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <DashboardNavbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Projects
            </h1>

            <p className="mt-1 text-zinc-500">
              Manage and collaborate on your projects.
            </p>
          </div>

          <button
            onClick={() => setCreateOpen(true)}
            className="
              rounded-xl
              px-4
              py-2
              text-zinc-300
              font-medium
              border
              border-zinc-800
              hover:border-zinc-600
            "
          >
            + New Project
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            name="Modern Villa"
            role="Client"
            updated="today"
            onOpen={() => navigate("/project/1")}
            onManageCollaborators={() =>
              setCollaboratorsOpen(true)
            }
          />

          <ProjectCard
            name="Bellevue Residence"
            role="Architect"
            updated="2 days ago"
            onOpen={() => navigate("/project/1")}
            onManageCollaborators={() =>
              setCollaboratorsOpen(true)
            }
          />
        </div>
      </main>

      <CreateProjectModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      <CollaboratorsModal
        open={collaboratorsOpen}
        onClose={() => setCollaboratorsOpen(false)}
      />
    </div>
  );
}