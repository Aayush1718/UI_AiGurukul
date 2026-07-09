const sections = [
  "Chat",
  "Conversations",
  "Overview",
  "Files",
  "Drawings",
  "Reports",
];

export default function BuildingSidebar({
  activeSection,
  onSelect,
}) {
  return (
    <div className="flex-1 p-4">
      <div className="space-y-1">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => onSelect(section)}
            className={`w-full rounded-xl px-4 py-3 text-left transition ${
              activeSection === section
                ? "bg-zinc-900 text-white"
                : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
            }`}
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  );
}