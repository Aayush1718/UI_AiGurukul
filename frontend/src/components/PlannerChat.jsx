export default function PlannerChat() {
  return (
    <div
      className="
        flex
        h-full
        w-full
        flex-col
        overflow-hidden
        min-h-0

        lg:w-[420px]
        lg:max-w-[420px]
        lg:shrink-0
        lg:border-l
        lg:border-zinc-900
      "
    >
      <div className="hidden md:block border-b border-zinc-900 p-4">
        <h2 className="font-semibold">
          Planner Agent
        </h2>

        <div className=" mt-4 flex min-w-0 gap-3">
          <button className="shrink-0 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm hover:border-zinc-600">            
            Upload DXF
          </button>

          <button className="shrink-0 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm hover:border-zinc-600">            
            Upload CAD
          </button>
        </div>
      </div>

      <div
        className="
          flex-1
          min-h-0
          overflow-x-hidden
          overflow-y-auto
          p-4
          space-y-4
        "
      >
        <div className="max-w-[90%] break-words rounded-2xl bg-zinc-900 p-4 text-sm">
          Hello. Describe your project and upload a DXF if available.
        </div>

        <div className="ml-auto max-w-[90%] break-words rounded-2xl bg-violet-600 p-4 text-sm">
          I need a 3 BHK house with a garage.
        </div>

        <div className="max-w-[90%] break-words rounded-2xl bg-zinc-900 p-4 text-sm">
          Understood. Starting site analysis...
        </div>
      </div>

      <div className="border-t border-zinc-900 p-4">
        <div className="flex min-w-0 gap-2">
          <button
            className="
              shrink-0
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              px-3
              hover:border-zinc-600
            "
          >
            📎
          </button>
          <input
            placeholder="Message planner..."
            className="
              min-w-0
              flex-1
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              px-4
              py-3
              outline-none
              focus:border-zinc-600
            "
          />

          <button
            className="
              shrink-0
              rounded-xl
              border
              border-zinc-700
              px-4
              hover:border-zinc-500
            "
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}