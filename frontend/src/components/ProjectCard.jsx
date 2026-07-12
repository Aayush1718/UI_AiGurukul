export default function ProjectCard({
  name,
  role,
  updated,
  onManageCollaborators,
  onOpen
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-6
      "
    >
      <h3 className="text-xl font-semibold text-foreground">
        {name}
      </h3>

      <div className="mt-3">
        <span className="rounded-full border border-border px-3 py-1 text-xs text-foreground">
          {role}
        </span>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Updated {updated}
      </p>

      <div className="mt-6 flex gap-2">
        <button
          onClick={onOpen}
          className="
            flex-1
            rounded-xl
            border
            border-border
            py-2
            text-foreground
            hover:border-primary
          "
        >
          Open
        </button>

        <button
          onClick={onManageCollaborators}
          className="
            flex-1
            rounded-xl
            border
            border-border
            py-2
            text-foreground
            hover:border-primary
          "
        >
          Team
        </button>
      </div>
    </div>
  );
}
