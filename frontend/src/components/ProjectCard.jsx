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
        border-zinc-800
        bg-zinc-950
        p-6
      "
    >
      <h3 className="text-xl font-semibold text-white">
        {name}
      </h3>

      <div className="mt-3">
        <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
          {role}
        </span>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        Updated {updated}
      </p>

      <div className="mt-6 flex gap-2">
        <button
          onClick={onOpen}
          className="
            flex-1
            rounded-xl
            border
            border-zinc-800
            py-2
            text-zinc-300
            hover:border-zinc-600
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
            border-zinc-800
            py-2
            text-zinc-300
            hover:border-zinc-600
          "
        >
          Team
        </button>
      </div>
    </div>
  );
}