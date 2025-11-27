import { createContext, useState } from "react"

const ThemeContext = createContext({
    isLogged: "dark" as 'light' | 'dark',
    handleToggleTheme: () => { }
})
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>("dark");
    const handleToggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }
    return (
        <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export { ThemeProvider, ThemeContext };

//change to login provider
