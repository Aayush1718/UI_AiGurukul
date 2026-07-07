export default function DashboardNavbar() {
  return (
    <header className="border-b border-zinc-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <h1 className="text-lg font-semibold">
          HouseAI
        </h1>

        <button
          className="
            flex items-center gap-3
            rounded-3xl
            border border-zinc-800
            bg-zinc-900
            px-3 py-2
            transition
            hover:border-zinc-700
          "
        >
          <div
            className="
              flex h-8 w-8 items-center justify-center
              rounded-full
              bg-zinc-800
              text-sm font-medium
            "
          >
            A
          </div>

          <span className="text-sm text-zinc-300">
            Aayush
          </span>
        </button>
      </div>
    </header>
  );
}