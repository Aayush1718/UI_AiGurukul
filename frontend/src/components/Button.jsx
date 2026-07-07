export default function Button({
  children,
  variant = "primary",
  className = "",
}) {

  return (
    <button
      className={`
        rounded-xl
        px-4
        py-2
        text-sm
        font-medium
        transition-all
        duration-200 border border-zinc-700 text-white hover:border-zinc-500
        ${className}
      `}
    >
      {children}
    </button>
  );
}