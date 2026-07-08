import { useRef, useState } from "react";

const INITIAL_POINTS = [
  { id: 1, x: 80, y: 80 },
  { id: 2, x: 350, y: 80 },
  { id: 3, x: 350, y: 300 },
  { id: 4, x: 80, y: 300 },
];

export default function PlotDesigner() {
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [selectedId, setSelectedId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);

  const svgRef = useRef(null);

  const getCoordinates = (clientX, clientY) => {
    const rect = svgRef.current.getBoundingClientRect();

    return {
      x: Math.max(
        10,
        Math.min(rect.width - 10, clientX - rect.left)
      ),
      y: Math.max(
        10,
        Math.min(rect.height - 10, clientY - rect.top)
      ),
    };
  };

  const handlePointerMove = (clientX, clientY) => {
    if (draggingId === null) return;

    const { x, y } = getCoordinates(
      clientX,
      clientY
    );

    setPoints((prev) =>
      prev.map((point) =>
        point.id === draggingId
          ? { ...point, x, y }
          : point
      )
    );
  };

  const stopDragging = () => {
    setDraggingId(null);
  };

  const addPoint = () => {
    let longestEdgeIndex = 0;
    let longestLength = 0;

    for (let i = 0; i < points.length; i++) {
      const next = (i + 1) % points.length;

      const dx =
        points[next].x - points[i].x;

      const dy =
        points[next].y - points[i].y;

      const len = dx * dx + dy * dy;

      if (len > longestLength) {
        longestLength = len;
        longestEdgeIndex = i;
      }
    }

    const next =
      (longestEdgeIndex + 1) % points.length;

    const midpoint = {
      id: Date.now(),
      x:
        (points[longestEdgeIndex].x +
          points[next].x) /
        2,
      y:
        (points[longestEdgeIndex].y +
          points[next].y) /
        2,
    };

    const updated = [...points];

    updated.splice(
      longestEdgeIndex + 1,
      0,
      midpoint
    );

    setPoints(updated);
  };

  const deletePoint = (id) => {
    if (points.length <= 3) return;

    setPoints((prev) =>
      prev.filter((p) => p.id !== id)
    );

    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const updatePoint = (
    id,
    field,
    value
  ) => {
    setPoints((prev) =>
      prev.map((point) =>
        point.id === id
          ? {
              ...point,
              [field]:
                Number(value) || 0,
            }
          : point
      )
    );
  };

  const resetPlot = () => {
    setPoints(INITIAL_POINTS);
    setSelectedId(null);
    setDraggingId(null);
  };

  const polygonPoints = points
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

  return (
    <div
      className="
        flex
        flex-1
        flex-col
        min-h-0
        min-w-0
        p-3 md:p-6
      "
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <h2 className="font-semibold">
            Plot Designer
          </h2>

          {selectedId !== null && (
            <div
              className="
                rounded-lg
                border
                border-blue-900
                bg-blue-950/40
                px-3
                py-1
                text-xs
                text-blue-400
              "
            >
              Selected: P
              {points.findIndex(
                (p) => p.id === selectedId
              ) + 1}
            </div>
          )}
        </div>

        <div
          className="
            flex
            flex-wrap
            justify-end
            gap-2
            shrink
          "
        >
          <button
            onClick={addPoint}
            className="
              rounded-xl
              border
              border-zinc-800
              px-3 py-2 md:px-4
              hover:border-zinc-600
            "
          >
            + Point
          </button>

          <button
            onClick={resetPlot}
            className="
              rounded-xl
              border
              border-zinc-800
              px-3 py-2 md:px-4
              hover:border-zinc-600
            "
          >
            Reset
          </button>
        </div>
      </div>

      <div
        className="
          mt-6
          flex-1
          min-h-0
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-950
          relative
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            inset-0
            opacity-20
            bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)]
            bg-[size:40px_40px]
          "
        />

        <svg
          ref={svgRef}
          className="
            absolute
            inset-0
            h-full
            w-full
            touch-none
          "
          onMouseMove={(e) =>
            handlePointerMove(
              e.clientX,
              e.clientY
            )
          }
          onTouchMove={(e) =>
            handlePointerMove(
              e.touches[0].clientX,
              e.touches[0].clientY
            )
          }
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onTouchEnd={stopDragging}
        >
          <polygon
            points={polygonPoints}
            fill="rgba(255,255,255,0.05)"
            stroke="white"
            strokeWidth="2"
          />

          {points.map((point) => (
          <g key={point.id}>
            <circle
              cx={point.x}
              cy={point.y}
              r={16}
              fill="transparent"
              className="cursor-pointer"
              onMouseDown={() => {
                setDraggingId(point.id);
                setSelectedId(point.id);
              }}
              onTouchStart={() => {
                setDraggingId(point.id);
                setSelectedId(point.id);
              }}
            />

            <circle
              cx={point.x}
              cy={point.y}
              r={
                selectedId === point.id
                  ? 10
                  : 7
              }
              fill={
                selectedId === point.id
                  ? "#60a5fa"
                  : "white"
              }
              className="pointer-events-none"
            />
          </g>
        ))}
        </svg>
      </div>

      <div
        className="
          mt-4
          h-40 md:h-44
          shrink-0
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          p-4
          flex
          flex-col
          overflow-hidden
        "
      >
        <h3
          className="
            mb-3
            text-sm
            text-zinc-400
          "
        >
          Coordinates
        </h3>

        <div
          className="
            flex-1
            overflow-y-auto
            space-y-2
            pr-2
          "
        >
          {points.map((point, idx) => (
            <div
              key={point.id}
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <div className="w-8 text-sm">
                P{idx + 1}
              </div>

              <input
                type="number"
                value={Math.round(point.x)}
                onChange={(e) =>
                  updatePoint(
                    point.id,
                    "x",
                    e.target.value
                  )
                }
                className="
                  w-24 md:w-20
                  rounded-lg
                  border
                  border-zinc-700
                  bg-zinc-950
                  px-2
                  py-1
                  text-sm
                "
              />

              <input
                type="number"
                value={Math.round(point.y)}
                onChange={(e) =>
                  updatePoint(
                    point.id,
                    "y",
                    e.target.value
                  )
                }
                className="
                  w-24 md:w-20
                  rounded-lg
                  border
                  border-zinc-700
                  bg-zinc-950
                  px-2
                  py-1
                  text-sm
                "
              />

              <button
                onClick={() =>
                  deletePoint(point.id)
                }
                disabled={
                  points.length <= 3
                }
                className="
                  rounded-lg
                  border
                  border-red-900
                  px-2
                  py-1
                  text-xs
                  text-red-400
                  hover:bg-red-950/30
                  disabled:opacity-40
                "
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

