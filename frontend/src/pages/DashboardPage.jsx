import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import CreateProjectModal from "../components/CreateProjectModal.jsx";
import CollaboratorsModal from "../components/CollaboratorsModal.jsx";
import { useNavigate } from "react-router-dom";
import { useLogto } from "@logto/react";
import { User, LogOut, ChevronUp } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function DashboardPage() {
  const [createOpen, setCreateOpen] = useState(false);

  const [collaboratorsOpen, setCollaboratorsOpen] =
    useState(false);

  const [workspaceMenuOpen, setWorkspaceMenuOpen] =
    useState(false);

  const [selectedWorkspace, setSelectedWorkspace] =
    useState("personal");

  const [workspaceModalOpen, setWorkspaceModalOpen] =
    useState(false);

  const [newWorkspaceName, setNewWorkspaceName] =
    useState("");

  const navigate = useNavigate();
  const { isAuthenticated, signIn } = useLogto();

  const handleCreateProjectClick = () => {
    if (isAuthenticated) {
      setCreateOpen(true);
    } else {
      signIn(`${window.location.origin}/callback`);
    }
  };

  const { userName } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { signOut } = useLogto();

  const initials = userName
    ? userName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const handleSignOut = () => {
    signOut(`${window.location.origin}/`);
  };

  const [workspaces, setWorkspaces] =
    useState([
      {
        id: "personal",
        name: "Personal",
      },
      {
        id: "Owners",
        name: "Owner Projects",
      },
      {
        id: "testing",
        name: "Testing",
      },
    ]);

  const [projects, setProjects] =
    useState([
      {
        id: 1,
        workspace: "personal",
        name: "Modern Villa",
        role: "Owner",
        updated: "today",
      },
      {
        id: 2,
        workspace: "personal",
        name: "Bellevue Residence",
        role: "Architect",
        updated: "2 days ago",
      },
      {
        id: 3,
        workspace: "Owners",
        name: "Owner Villa A",
        role: "Architect",
        updated: "yesterday",
      },
    ]);

  const currentWorkspace = workspaces.find(
    (w) => w.id === selectedWorkspace
  );

  const filteredProjects = projects.filter(
    (project) =>
      project.workspace === selectedWorkspace
  );

  const createWorkspace = () => {
    const name =
      newWorkspaceName.trim();

    if (!name) return;

    const workspace = {
      id: crypto.randomUUID(),
      name,
    };

    setWorkspaces((prev) => [
      ...prev,
      workspace,
    ]);

    setSelectedWorkspace(
      workspace.id
    );

    setNewWorkspaceName("");

    setWorkspaceModalOpen(false);
  };

  const createProject = ({
    name,
    role,
    projectType,
  }) => {
    const project = {
      id: crypto.randomUUID(),

      workspace:
        selectedWorkspace,

      name,

      role,

      updated: "just now",
    };

    setProjects((prev) => [
      project,
      ...prev,
    ]);

    setCreateOpen(false);

    if (projectType === "Feasibility Analysis") {
      navigate("/feasibility");
    } else {
      navigate(`/project/${project.id}`, { 
        state: { 
          projectType, 
          projectName: project.name 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <DashboardNavbar />

      <main className="mx-auto max-w-screen-2xl px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">

          {/* Desktop Sidebar */}
          <aside
            className="
              hidden
              lg:flex
              lg:w-64
              shrink-0
              flex-col
              justify-between
              border-r
              border-zinc-900
              pr-6
              min-h-[calc(100vh-8rem)]
            "
          >
            <div>
            <div className="mb-6">
              <h2
                className="
                  text-xs
                  uppercase
                  tracking-widest
                  text-zinc-500
                  font-medium
                "
              >
                Workspaces
              </h2>

              <p className="mt-2 text-xs text-zinc-600">
                {workspaces.length} workspaces
              </p>
            </div>

            <div className="space-y-1">
              {workspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() =>
                    setSelectedWorkspace(
                      workspace.id
                    )
                  }
                  className={`
                    relative
                    w-full
                    rounded-xl
                    px-4
                    py-3
                    text-left
                    transition
                    ${
                      selectedWorkspace ===
                      workspace.id
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-400 hover:bg-zinc-900/50"
                    }
                  `}
                >
                  {selectedWorkspace ===
                    workspace.id && (
                    <div
                      className="
                        absolute
                        left-0
                        top-2
                        bottom-2
                        w-1
                        rounded-full
                        bg-white
                      "
                    />
                  )}

                  {workspace.name}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setWorkspaceModalOpen(true)
              }
              className="
                mt-6
                rounded-xl
                py-3
                text-left
                text-zinc-500
                transition
                hover:text-white
              "
            >
              New Workspace
            </button>
            </div>

            {/* Profile Section at Bottom */}
            {isAuthenticated && (
              <div className="relative mt-8 shrink-0">
                {/* Pop-up Menu */}
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div
                      className="
                        absolute bottom-full left-0 mb-2 z-50
                        w-full rounded-xl
                        border border-zinc-800 bg-zinc-950
                        p-1 shadow-xl shadow-black/40
                      "
                    >
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/profile");
                        }}
                        className="
                          w-full flex items-center gap-3
                          rounded-lg px-3 py-2.5
                          text-sm text-zinc-300
                          transition hover:bg-zinc-900 hover:text-white
                        "
                      >
                        <User size={16} />
                        Profile
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="
                          mt-1 w-full flex items-center gap-3
                          rounded-lg px-3 py-2.5
                          text-sm text-zinc-300
                          transition hover:bg-zinc-900 hover:text-white
                        "
                      >
                        <LogOut size={16} />
                        Log out
                      </button>
                    </div>
                  </>
                )}

                {/* Profile Button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="
                    flex w-full items-center justify-between
                    rounded-xl p-2 -ml-2
                    transition hover:bg-zinc-900
                  "
                >
                  <div className="flex items-center gap-3 truncate">
                    <div
                      className="
                        flex h-8 w-8 shrink-0 items-center justify-center
                        rounded-full bg-zinc-800
                        text-xs font-medium text-white
                      "
                      title={userName}
                    >
                      {initials}
                    </div>
                    <span className="truncate text-sm font-medium text-zinc-300">
                      {userName || "User"}
                    </span>
                  </div>
                  <ChevronUp size={16} className="text-zinc-500 shrink-0" />
                </button>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <section className="flex-1">

            {/* Mobile Workspace Selector */}
            <div
              className="
                mb-6
                lg:hidden
              "
            >
              <div className="flex gap-3">
                <div className="relative flex-[1.8]">
                  <button
                    onClick={() =>
                      setWorkspaceMenuOpen(
                        !workspaceMenuOpen
                      )
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-zinc-800
                      bg-zinc-950
                      px-4
                      py-3
                      text-white
                    "
                  >
                    <span>
                      {currentWorkspace?.name}
                    </span>

                    <svg
                      className={`h-4 w-4 transition ${
                        workspaceMenuOpen
                          ? "rotate-180"
                          : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 7L10 12L15 7" />
                    </svg>
                  </button>

                  {workspaceMenuOpen && (
                    <div
                      className="
                        absolute
                        left-0
                        right-0
                        top-full
                        z-50
                        mt-2
                        overflow-hidden
                        rounded-xl
                        border
                        border-zinc-800
                        bg-zinc-950
                        shadow-2xl
                      "
                    >
                      {workspaces.map(
                        (workspace) => (
                          <button
                            key={workspace.id}
                            onClick={() => {
                              setSelectedWorkspace(
                                workspace.id
                              );
                              setWorkspaceMenuOpen(
                                false
                              );
                            }}
                            className={`
                              w-full
                              px-4
                              py-3
                              text-left
                              transition
                              ${
                                selectedWorkspace ===
                                workspace.id
                                  ? "bg-zinc-900 text-white"
                                  : "text-zinc-400 hover:bg-zinc-900"
                              }
                            `}
                          >
                            {workspace.name}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={() =>
                    setWorkspaceModalOpen(true)
                  }
                  className="
                    flex-1
                    rounded-xl
                    border
                    border-zinc-800
                    px-4
                    py-3
                    text-sm
                    text-zinc-300
                    hover:border-zinc-600
                  "
                >
                  New Workspace
                </button>
              </div>
            </div>

            {/* Header */}
            <div
              className="
                mb-8
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  {currentWorkspace?.name}
                </h1>

                <p className="mt-2 text-sm text-zinc-500">
                  {filteredProjects.length}{" "}
                  project
                  {filteredProjects.length !== 1
                    ? "s"
                    : ""}
                </p>
              </div>

              <button
                onClick={handleCreateProjectClick}
                className="
                  w-full
                  sm:w-auto
                  rounded-xl
                  border
                  border-zinc-800
                  px-4
                  py-3
                  text-zinc-300
                  font-medium
                  hover:border-zinc-600
                "
              >
                + New Project
              </button>
            </div>

            {filteredProjects.length === 0 ? (
              <div
                className="
                  rounded-3xl
                  border
                  border-zinc-800
                  bg-zinc-950
                  p-12
                  text-center
                "
              >
                <h3 className="text-xl text-white">
                  No projects yet
                </h3>

                <p className="mt-2 text-zinc-500">
                  Create your first project
                  in this workspace.
                </p>

                <button
                  onClick={handleCreateProjectClick}
                  className="
                    mt-6
                    rounded-xl
                    border
                    border-zinc-800
                    px-4
                    py-2
                    text-zinc-300
                    hover:border-zinc-600
                  "
                >
                  Create Project
                </button>
              </div>
            ) : (
              <div
                className="
                  grid
                  gap-6
                  sm:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {filteredProjects.map(
                  (project) => (
                    <ProjectCard
                      key={project.id}
                      name={project.name}
                      role={project.role}
                      updated={
                        project.updated
                      }
                      onOpen={() =>
                        navigate(
                          `/project/${project.id}`
                        )
                      }
                      onManageCollaborators={() =>
                        setCollaboratorsOpen(
                          true
                        )
                      }
                    />
                  )
                )}
              </div>
            )}
          </section>
        </div>
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

      {workspaceModalOpen && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/70
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-zinc-800
              bg-[#111111]
              p-6
            "
          >
            <h2 className="text-xl font-semibold text-white">
              Create Workspace
            </h2>

            <p className="mt-2 text-zinc-500">
              Organize projects into a new
              workspace.
            </p>

            <input
              value={newWorkspaceName}
              onChange={(e) =>
                setNewWorkspaceName(
                  e.target.value
                )
              }
              placeholder="Workspace name"
              className="
                mt-6
                w-full
                rounded-xl
                border
                border-zinc-800
                bg-zinc-950
                px-4
                py-3
                text-white
                outline-none
                focus:border-zinc-600
              "
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setWorkspaceModalOpen(
                    false
                  );

                  setNewWorkspaceName("");
                }}
                className="
                  rounded-xl
                  border
                  border-zinc-800
                  px-4
                  py-2
                  text-zinc-300
                "
              >
                Cancel
              </button>

              <button
                onClick={createWorkspace}
                disabled={
                  !newWorkspaceName.trim()
                }
                className="
                  rounded-xl
                  bg-white
                  px-4
                  py-2
                  text-black
                  disabled:opacity-50
                "
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      <CreateProjectModal
        open={createOpen}
        onClose={() =>
          setCreateOpen(false)
        }
        onCreate={createProject}
      />

      <CollaboratorsModal
        open={collaboratorsOpen}
        onClose={() =>
          setCollaboratorsOpen(false)
        }
      />
    </div>
  );
}