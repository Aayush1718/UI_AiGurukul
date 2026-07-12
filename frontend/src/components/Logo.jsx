export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-violet-500 text-sm font-bold text-violet-500">
        Ai
      </div>
      <div className="flex flex-col text-[10px] font-bold uppercase leading-none tracking-[0.2em] text-violet-500 mt-0.5">
        <span>Ai</span>
        <span>GuruKul</span>
      </div>
    </div>
  );
}
