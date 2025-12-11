import { PATH, type Dream, type User } from "../model/Types";

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


export const fetchFavoriteDreams = async () => {
    try {
        const res = await fetch(`${PATH}/api/dreams/favorites`, {
            method: 'GET',
            credentials: 'include', // אם את משתמשת ב־cookies ל־auth
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch favorite dreams');
        }

        const data = await res.json();
        return data.dreams; // מחזיר רק את המערך כמו שביקשת
    } catch (error: any) {
        console.error('Fetch Favorite Dreams Error:', error.message);
        return []; // כדי שלא יישבר הקוד, מחזיר מערך ריק
    }
};

export async function fetchDreams() {
    try {
        const response = await fetch(`${PATH}/api/dreams`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (response.ok) {
            const dreamsWithDates = data.dreams.map((dream: Dream) => ({
                ...dream,
                date: new Date(dream.date)
            }));
            return dreamsWithDates as Dream[]

        } else {
            throw new Error("Failed to fetch dreams");
        }
    } catch (error) {
        console.error('Error fetching dreams:', error);
    }
}

export async function fetchDeleteDream(id: string) {
    try {

        const response = await fetch(`${PATH}/api/dreams/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(`erorr in deleting dream:${id} =>${data.message}`);
        return data.message

    } catch (error) {
        console.error('Error deleting dream:', error);


    }
}


export async function fetchToggleFavorite(id: string) {
    try {
        const response = await fetch(`${PATH}/api/dreams/${id}/favorite`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(`erorr in toggle favorite dream:${id} =>${data.message}`);
        return data.message
    } catch (error) {
        console.error('Error toggle favorite dream:', error);
    }
}
export async function fetchUpdateDream(id: string, dream: Dream) {
    try {
        const response = await fetch(`${PATH}/api/dreams/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dream }),

        });
        const data = await response.json();
        if (!response.ok) throw new Error(`erorr in uptading dream:${id} =>${data.message}`);
        console.log('update');
        return data
    } catch (error) {
        console.error('Error uptading dream:', error);
    }
}

export async function fetchUserInfo() {
    try {
        const response = await fetch(`${PATH}/api/auth/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        const userData = data.user as User
        if (!data.ok) throw new Error("Failed to fetch user info", data.message);
        const userInfo:User = {
            name:userData.name,
            email:userData.email
        }
        return userInfo

    } catch (error) {
        console.error('Error fetching dreams:', error);
    }
}


