import React, { createContext, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { PATH } from "../Types"

const LoginContext = createContext({
    isLoggedIn: true,
    handleLogin: () => { },
    handleLogout: () => { }
})

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const location = useLocation();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is authenticated via cookie
    const checkAuth = async () => {
        try {
            const response = await fetch(`${PATH}/api/auth/me`, {
                method: 'GET',
                credentials: 'include', // Send cookie
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setLoggedIn(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = () => {
        console.log('logged in successfully');
        setLoggedIn(true);
        navigate('/');
    };

    const handleLogout = async () => {
        try {
            await fetch(`${PATH}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            console.log('logged out successfully');
            setLoggedIn(false);
            navigate('/login');
        }
    };

    // Check auth on mount
    useEffect(() => {
        checkAuth();
    }, []);

    // Redirect if not logged in
    useEffect(() => {
        if (!isLoading && !isLoggedIn && location.pathname !== "/register" && location.pathname !== "/login") {
            navigate("/login");
        }
    }, [isLoggedIn, location.pathname, navigate, isLoading]);
    return (
        <LoginContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
            {children}
        </LoginContext.Provider>
    )
}
export { LoginContext, LoginProvider }
//change to login provider
