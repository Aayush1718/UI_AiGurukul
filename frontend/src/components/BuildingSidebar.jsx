const stages = [
  {
    name: "Requirements",
    status: "completed",
  },
  {
    name: "Site Plan",
    status: "completed",
  },
  {
    name: "Floor Plan",
    status: "current",
  },
  {
    name: "Roof Plan",
    status: "pending",
  },
  {
    name: "Window Plan",
    status: "pending",
  },
  {
    name: "Door Plan",
    status: "pending",
  },
  {
    name: "Compliance",
    status: "pending",
  },
  {
    name: "Final Package",
    status: "pending",
  },
];

export default function BuildingSidebar() {
  return (
    <div
      className="
        flex-1
        min-h-0
        overflow-y-auto
        p-4
      "
    >
      <div className="mb-6">
        <h2 className="text-sm text-zinc-500">
          Planning Progress
        </h2>
      </div>

      <div className="space-y-2">
        {stages.map((stage) => (
          <button
            key={stage.name}
            className={`
              w-full
              rounded-xl
              border
              px-4
              py-3
              text-left
              transition

              ${
                stage.status === "completed"
                  ? "border-green-500/20 bg-green-500/10"
                  : stage.status === "current"
                  ? "border-zinc-700 bg-zinc-900"
                  : "border-transparent hover:bg-zinc-900"
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span>
                {stage.status === "completed"
                  ? "✓"
                  : stage.status === "current"
                  ? "◉"
                  : "○"}
              </span>

              <span>{stage.name}</span>
            </div>

            {stage.status === "current" && (
              <p className="mt-1 text-xs text-zinc-500">
                Generating...
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}