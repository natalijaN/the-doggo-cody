"use client";

import useDarkMode from "@/src/hooks/useDarkMode";

export default function ThemeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div
      onClick={toggleDarkMode}
      className="ml-5 p-2 rounded-full border dark:border-white border-black transition"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <button className=" text-black dark:text-white dark:bg-red-900 rounded-lg">
          ☀️
        </button>
      ) : (
        <button className=" text-black dark:text-white dark:bg-red-900 rounded-lg">
          🌙
        </button>
      )}
    </div>
  );
}
