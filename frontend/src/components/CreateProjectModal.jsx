import { useState } from "react";

export default function CreateProjectModal({
  open,
  onClose,
  onCreate,
})  {
  const [role, setRole] = useState("Client");

  const [projectName, setProjectName] =
    useState("");

  const [location, setLocation] =
    useState("");

  if (!open) return null;

  const roles = [
    {
      title: "Client",
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
    if (!projectName.trim()) return;

    onCreate({
      name: projectName,
      role,
      location,
    });

    setProjectName("");
    setLocation("");
    setRole("Client");
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
          border-zinc-800
          bg-zinc-950
          shadow-2xl
          p-6
        "
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Create New Project
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Start a new residential project.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
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
                border-zinc-800
                bg-zinc-900
                px-4
                py-3
                text-white
                outline-none
                focus:border-zinc-600
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
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
                border-zinc-800
                bg-zinc-900
                px-4
                py-3
                text-white
                outline-none
                focus:border-zinc-600
              "
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-3 block text-sm text-zinc-400">
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
                      ? "border-white bg-zinc-900"
                      : "border-zinc-800 hover:border-zinc-600"
                  }
                `}
              >
                <h4 className="font-medium text-white">
                  {item.title}
                </h4>

                <p className="mt-1 text-xs text-zinc-500">
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
              text-zinc-400
              hover:text-white
            "
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={!projectName.trim()}
            className="
              rounded-xl
              bg-white
              px-5
              py-2
              font-medium
              text-black
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