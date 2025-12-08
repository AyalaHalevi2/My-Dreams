import { PATH } from "../model/Types";

export const authMe = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${PATH}/api/auth/me`, {
            method: 'GET',
            credentials: 'include', // send cookie
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.ok;
    } catch (error) {
        console.error('Auth check failed:', error);
        return false;
    }
};

export const logout = async (): Promise<void> => {
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
    }
};

// Backwards-compatible alias: some files import `checkAuth`.
export const checkAuth = async (): Promise<boolean> => {
    return await authMe();
};
