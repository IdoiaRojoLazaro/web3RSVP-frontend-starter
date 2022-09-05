import { useEffect, useState } from "react";

export enum ThemeType {
  DARK = 'dark',
  LIGHT = 'light'
}

function useDarkMode() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.theme : ThemeType.LIGHT
  );
  const colorTheme = theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK;

  function handleTheme(ThemeType) {
    setTheme(ThemeType);
  }

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return {
    colorTheme, handleTheme
  };
}

export default useDarkMode;
