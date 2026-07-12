import { useState, useEffect, useRef } from "react";

export default function ThemeControls() {
  const [isDark, setIsDark] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("neutral");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Initialize theme from localStorage or system preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDark(initDark);
    if (initDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const savedColor = localStorage.getItem("primaryColor") || "neutral";
    setPrimaryColor(savedColor);
    document.documentElement.setAttribute("data-theme", savedColor);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleColorChange = (color) => {
    setPrimaryColor(color);
    localStorage.setItem("primaryColor", color);
    document.documentElement.setAttribute("data-theme", color);
    setDropdownOpen(false);
  };

  const colors = [
    { name: "blue", class: "bg-blue-500" },
    { name: "green", class: "bg-emerald-500" },
    { name: "orange", class: "bg-orange-500" },
    { name: "rose", class: "bg-rose-500" },
    { name: "sky", class: "bg-sky-500" },
    { name: "yellow", class: "bg-yellow-400" },
    { name: "slate", class: "bg-slate-500" },
    { name: "neutral", class: "bg-neutral-500" },
  ];

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Color Palette Dropdown */}
      <div className="relative flex items-center" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          title="Choose Theme Color"
        >
          <i className="ri-palette-line text-xl"></i>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-12 w-48 bg-popover text-popover-foreground rounded-xl shadow-xl border border-border z-50 overflow-hidden p-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Theme Color
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorChange(color.name)}
                  className={`w-7 h-7 rounded-full ${
                    color.class
                  } ring-2 ring-offset-2 ring-offset-background hover:scale-110 transition-transform ${
                    primaryColor === color.name
                      ? "ring-foreground"
                      : "ring-transparent"
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Theme Switcher */}
      <button
        onClick={toggleTheme}
        className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <i className={`${isDark ? "ri-sun-line" : "ri-moon-line"} text-xl`}></i>
      </button>
    </div>
  );
}
