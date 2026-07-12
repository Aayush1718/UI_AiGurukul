const steps = [
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

export default function ProgressTracker() {
  return (
    <div className="flex flex-wrap gap-3">
      {steps.map((step) => (
        <div
          key={step.name}
          className={`
            rounded-full
            px-4
            py-2
            text-sm
            border

            ${
              step.status === "completed"
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : step.status === "current"
                ? "border-white bg-primary text-primary-foreground"
                : "border-border bg-muted text-muted-foreground"
            }
          `}
        >
          {step.status === "completed" && "✓ "}
          {step.status === "current" && "◉ "}
          {step.status === "pending" && "○ "}

          {step.name}
        </div>
      ))}
    </div>
  );
}
