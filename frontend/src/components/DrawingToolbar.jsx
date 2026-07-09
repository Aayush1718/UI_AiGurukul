import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

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
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentIndex =
    stages.indexOf(selectedView);

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
    <div className="border-b border-zinc-900 px-4 md:px-6 py-4">
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
            border-zinc-800
            bg-zinc-900
            px-4
            py-3
            text-left
            transition
            hover:border-zinc-700
          "
        >
          <div>
            {/* <p className="text-xs text-zinc-500">
              Current View
            </p> */}

            <p className="text-sm font-medium text-white">
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
              border-zinc-800
              bg-zinc-950
              shadow-2xl
            "
          >
            <div className="p-2">
              {stages.map(
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
                            ? "bg-zinc-900"
                            : "hover:bg-zinc-900/60"
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
                          <span className="text-white">
                            ●
                          </span>
                        )}

                        {status ===
                          "pending" && (
                          <span className="text-zinc-600">
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
                              ? "text-white"
                              : "text-zinc-300"
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