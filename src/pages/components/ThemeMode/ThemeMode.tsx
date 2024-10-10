import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { useEffect, useState } from "react";

export const ThemeMode = () => {
  const [theme, setTheme] = useState<string>("light");

  const changeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }

  useEffect(() => {
    if(theme === 'dark') {
        document.querySelector('header')?.classList.add('dark')
    } else {
        document.querySelector('header')?.classList.remove('dark')
    }
  }, [theme])

  return (
    <button
      className="flex items-center justify-center"
      onClick={changeTheme}
    >
      {theme === 'light' && <MdOutlineDarkMode size={25}/>}
      {theme === 'dark' && <MdDarkMode size={25}/>}
    </button>
  );
};
