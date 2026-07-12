import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";

const stages = [
  "Requirements",
  "Site Plan",
  "Floor Plan",
  "Roof Plan",
  "Window Plan",
  "Door Plan",
  "Compliance",
  "Final Package",
];

export default function DrawingToolbar({
  selectedView,
  setSelectedView,
  projectType = "Full Layout",
  onToggleSidebar,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const availableStages =
    projectType === "Site Plan"
      ? ["Site Plan"]
      : stages;

  const currentIndex =
    availableStages.indexOf(selectedView);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const getStatus = (index) => {
    if (index < currentIndex)
      return "completed";

    if (index === currentIndex)
      return "current";

    return "pending";
  };

  return (
    <div className="border-b border-border px-4 md:px-6 py-4 flex items-center gap-4">
      <div
        ref={dropdownRef}
        className="relative"
      >
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="
            flex
            w-full
            md:w-[280px]
            items-center
            justify-between
            rounded-xl
            border
            border-border
            bg-muted
            px-4
            py-3
            text-left
            transition
            hover:border-zinc-700
          "
        >
          <div>
            {/* <p className="text-xs text-muted-foreground">
              Current View
            </p> */}

            <p className="text-sm font-medium text-foreground">
              {selectedView}
            </p>
          </div>

          <ChevronDown
            size={18}
            className={`transition ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div
            className="
              absolute
              left-0
              top-full
              z-50
              mt-2
              w-full
              md:w-[320px]
              overflow-hidden
              rounded-2xl
              border
              border-border
              bg-card
              shadow-2xl
            "
          >
            <div className="p-2">
              {availableStages.map(
                (stage, index) => {
                  const status =
                    getStatus(index);

                  return (
                    <button
                      key={stage}
                      onClick={() => {
                        setSelectedView(
                          stage
                        );
                        setOpen(false);
                      }}
                      className={`
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        transition
                        ${
                          selectedView ===
                          stage
                            ? "bg-muted"
                            : "hover:bg-muted/60"
                        }
                      `}
                    >
                      <div className="w-4 flex justify-center">
                        {status ===
                          "completed" && (
                          <span className="text-green-400">
                            ✓
                          </span>
                        )}

                        {status ===
                          "current" && (
                          <span className="text-foreground">
                            ●
                          </span>
                        )}

                        {status ===
                          "pending" && (
                          <span className="text-muted-foreground">
                            ○
                          </span>
                        )}
                      </div>

                      <span
                        className={`
                          text-sm
                          ${
                            selectedView ===
                            stage
                              ? "text-foreground"
                              : "text-foreground"
                          }
                        `}
                      >
                        {stage}
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
