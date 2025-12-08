import { useDispatch, useSelector } from "react-redux";
import { PATH } from "../model/Types";
import { changeLoginState } from "../redux/slices/AuthSlice";
import { useLocation, useNavigate } from "react-router";
import type { RootState } from "../redux/store";

export const checkAuth = async () => {
    const dispatch = useDispatch()

    try {
        const location = useLocation();
        const navigate = useNavigate();
        const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
        if (!isLoggedIn && location.pathname !== "/register" && location.pathname !== "/login") {
            navigate("/login");
        }
        const response = await fetch(`${PATH}/api/auth/me`, {
            method: 'GET',
            credentials: 'include', // Send cookie
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            dispatch(changeLoginState(true));
        } else {
            dispatch(changeLoginState(false));
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        dispatch(changeLoginState(false));
    } finally {
        dispatch(changeLoginState(false));
    }
};
export const logout = async () => {
    fetch(`${PATH}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
};
