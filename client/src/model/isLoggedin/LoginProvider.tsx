import React, { createContext, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router"
const experationName = "login_expiration"
const LoginContext = createContext({
    isLoggedIn: true,
    handleLogin: () => { },
    handleLogout: () => { }
})
const LoginProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const location = useLocation();

    const [isLoggedIn, setLoggedIn] = useState(() => {

        const expiration = localStorage.getItem(experationName);
        if (!expiration) return false;

        // check if token expired
        const now = new Date().getTime();
        return now < Number(expiration);
    });
    const handleLogin = () => {
        console.log('logged in succesfuly');
        const expiration = new Date().getTime() + 60 * 60 * 1000; // +1 hour
        localStorage.setItem(experationName, expiration.toString());
        setLoggedIn(true)
        navigate('/')
    }
    const handleLogout = () => {
        console.log('logged out succesfuly');
        localStorage.removeItem(experationName);

        setLoggedIn(false)
    }
    useEffect(() => {
        console.log('userefect', isLoggedIn);

        const expiration = localStorage.getItem("login_expiration");
        const now = new Date().getTime();

        if (!expiration || now >= Number(expiration)) {
            // expired or not found
            setLoggedIn(false);
            localStorage.removeItem("login_expiration");

            if (location.pathname !== "/register") navigate("/login");

        }
    }, [isLoggedIn, location.pathname, navigate])
    return (
        <LoginContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
            {children}
        </LoginContext.Provider>
    )
}
export { LoginContext, LoginProvider }
//change to login provider
