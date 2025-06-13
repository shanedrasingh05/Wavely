import { useContext, useState } from "react";
import { ThemeContext } from "../ThemeContext";

function Toggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const handleChange = (mode) => {
    setTheme(mode);
    setOpen(false);
  };

  return (
    <div className="">
      {/* <h1 className="text-2xl mb-6">🌗 Theme Switcher</h1> */}

      <div className="relative inline-block text-left">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-xl"
        >
          {theme == "light" ? '☀️' : '🌙'}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow">
            <button
              onClick={() => handleChange("light")}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Light
            </button>
            <button
              onClick={() => handleChange("dark")}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Dark
            </button>
            <button
              onClick={() => handleChange("system")}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              System
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Toggle;
