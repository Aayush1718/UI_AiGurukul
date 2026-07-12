import { useState } from "react";

export default function CreateProjectModal({
  open,
  onClose,
  onCreate,
})  {
  const [role, setRole] = useState("Owner");

  const [projectName, setProjectName] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [projectType, setProjectType] =
    useState("Feasibility Analysis");

  if (!open) return null;

  const projectTypes = [
    {
      title: "Feasibility Analysis",
      description: "Analyze feasibility",
    },
    {
      title: "Site Plan",
      description: "Plan your site",
    },
    {
      title: "Full Layout",
      description: "Generate layout",
    },
  ];

  if (!open) return null;

  const roles = [
    {
      title: "Owner",
      description: "Owns project",
    },
    {
      title: "Architect",
      description: "Verifies designs",
    },
    {
      title: "Reviewer",
      description: "Reviews Compliance",
    },
  ];

  const handleCreate = () => {
    const finalName = projectName.trim() || "Untitled Project";

    onCreate({
      name: finalName,
      role,
      location,
      projectType,
    });

    setProjectName("");
    setLocation("");
    setRole("Owner");
    setProjectType("Feasibility Analysis");
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-3xl
          rounded-3xl
          border
          border-border
          bg-card
          shadow-2xl
          p-6
        "
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Create New Project
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Start a new residential project.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-muted-foreground">
              Project Name
            </label>

            <input
                value={projectName}
                onChange={(e) =>
                  setProjectName(e.target.value)
                }
              placeholder="Modern Villa"
              className="
                w-full
                rounded-xl
                border
                border-border
                bg-muted
                px-4
                py-3
                text-foreground
                outline-none
                focus:border-zinc-600
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted-foreground">
              Location
            </label>

            <input
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="Location"
              className="
                w-full
                rounded-xl
                border
                border-border
                bg-muted
                px-4
                py-3
                text-foreground
                outline-none
                focus:border-zinc-600
              "
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-3 block text-sm text-muted-foreground">
            Project Type
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {projectTypes.map((item) => (
              <button
                key={item.title}
                onClick={() => setProjectType(item.title)}
                className={`
                  rounded-2xl
                  border
                  p-4
                  text-left
                  transition

                  ${
                    projectType === item.title
                      ? "border-white bg-muted"
                      : "border-border hover:border-primary"
                  }
                `}
              >
                <h4 className="font-medium text-foreground">
                  {item.title}
                </h4>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-3 block text-sm text-muted-foreground">
            Choose Role
          </label>

          <div className="grid grid-cols-3 gap-3">
            {roles.map((item) => (
              <button
                key={item.title}
                onClick={() => setRole(item.title)}
                className={`
                  rounded-2xl
                  border
                  p-4
                  text-left
                  transition

                  ${
                    role === item.title
                      ? "border-white bg-muted"
                      : "border-border hover:border-primary"
                  }
                `}
              >
                <h4 className="font-medium text-foreground">
                  {item.title}
                </h4>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              rounded-xl
              px-4
              py-2
              text-muted-foreground
              hover:text-foreground
            "
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="
              rounded-xl
              bg-primary
              px-5
              py-2
              font-medium
              text-primary-foreground
              hover:bg-zinc-200
            "
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}
