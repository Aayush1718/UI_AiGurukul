export default function AuthCard({ children }) {
  return (
    <div
      className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950
        p-8
        md:p-10
      "
    >
      {children}
    </div>
  );
}