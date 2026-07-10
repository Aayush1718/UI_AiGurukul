import { useState } from "react";
import { useLogto } from "@logto/react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { User, LogOut, ChevronUp, MessageSquare, Library, LayoutTemplate, LayoutDashboard } from "lucide-react";

const sections = [
  { name: "Chat", icon: MessageSquare },
  { name: "Library", icon: Library },
  { name: "Artifacts", icon: LayoutTemplate },
];

export default function BuildingSidebar({
  activeSection,
  onSelect,
  isExpanded = true,
}) {
  const navigate = useNavigate();
  const { signOut, isAuthenticated } = useLogto();
  const { userName } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  return (
    <div className={`flex-1 flex flex-col justify-between min-h-0 ${isExpanded ? 'p-4' : 'px-2 py-4'}`}>
      <div className="space-y-2 overflow-y-auto overflow-x-hidden">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.name}
              onClick={() => onSelect(section.name)}
              title={section.name}
              className={`w-full flex items-center ${isExpanded ? 'gap-3 px-4' : 'justify-center px-0'} rounded-xl py-3 text-left transition ${
                activeSection === section.name
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
              }`}
            >
              <Icon size={20} className="shrink-0" />
              {isExpanded && <span className="truncate">{section.name}</span>}
            </button>
          );
        })}
      </div>

      <div className="shrink-0 mt-4 space-y-4">
        {/* Workspace Button */}
        <button
          onClick={() => navigate("/")}
          title="Workspace"
          className={`
            w-full flex items-center ${isExpanded ? 'gap-3 px-4' : 'justify-center px-0'} 
            rounded-xl py-3 text-left transition text-zinc-400 hover:bg-zinc-900/50 hover:text-white
          `}
        >
          <LayoutDashboard size={20} className="shrink-0" />
          {isExpanded && <span className="truncate">Workspace</span>}
        </button>

        {/* Profile Section at Bottom */}
        {isAuthenticated && (
          <div className="relative">
          {/* Pop-up Menu */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div
                className={`
                  absolute bottom-full mb-2 z-50
                  ${isExpanded ? 'left-0 w-full' : 'left-full ml-2 w-48'}
                  rounded-xl
                  border border-zinc-800 bg-zinc-950
                  p-1 shadow-xl shadow-black/40
                `}
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
            className={`
              flex w-full items-center ${isExpanded ? 'justify-between px-2' : 'justify-center px-0'}
              rounded-xl py-2
              transition hover:bg-zinc-900
            `}
          >
            <div className={`flex items-center ${isExpanded ? 'gap-3' : 'gap-0'} truncate`}>
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
              {isExpanded && (
                <span className="truncate text-sm font-medium text-zinc-300">
                  {userName || "User"}
                </span>
              )}
            </div>
            {isExpanded && <ChevronUp size={16} className="text-zinc-500 shrink-0" />}
          </button>
        </div>
        )}
      </div>
    </div>
  );
}