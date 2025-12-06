import { createContext, useEffect, useState } from "react"

const ThemeContext = createContext({
    theme: "dark" as 'light' | 'dark',
    handleToggleTheme: () => { }
})
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : "light";
    });
    const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    console.log("theme", theme);

    }

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export { ThemeProvider, ThemeContext };
