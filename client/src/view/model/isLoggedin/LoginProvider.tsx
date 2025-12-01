import React, { createContext, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router"
const LoginContext = createContext({
    isLoggedIn: true,
    handleLogin: () => { },
    handleLogout: () => { }
})
const LoginProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const location = useLocation();

    const [isLoggedIn, setLoggedIn] = useState(false)
    const handleLogin = () => {
        console.log('logged in succesfuly');
        setLoggedIn(true)
        navigate('/')
    }
    const handleLogout = () => {
        console.log('logged out succesfuly');
        setLoggedIn(false)
    }
    useEffect(() => {
        console.log('userefect', isLoggedIn);
        if (!isLoggedIn && location.pathname !== '/register') navigate('/login')

    }, [isLoggedIn, navigate])
    return (
        <LoginContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
            {children}
        </LoginContext.Provider>
    )
}
export { LoginContext, LoginProvider }
//change to login provider
