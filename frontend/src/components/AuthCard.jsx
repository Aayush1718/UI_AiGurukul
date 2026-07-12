export default function AuthCard({ children }) {
  return (
    <div
      className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-border
        bg-card
        p-8
        md:p-10
      "
    >
      {children}
    </div>
  );
}
