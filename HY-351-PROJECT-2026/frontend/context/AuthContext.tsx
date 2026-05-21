/* eslint-disable indent */
import { useState, useContext, ReactNode, createContext, useEffect } from "react";

export type UserState = {
    isLoggedIn: boolean;
    role: string;
    username?: string;
}

type AuthContextType = {
    user: UserState;
    login: (role: string, username: string) => void;
    logout: () => void;
};

type AuthUser = {
    username: string;
    role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

// provide the global states for the project
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserState>({
        isLoggedIn: false,
        role: 'Guest'
    });
    useEffect(() => {
        // middleware to check if user is already signed in
        const checkLogin = async () => {
            try {
                const response = await fetch('http://localhost:5000/auth/session', {
                    method: 'GET',
                    credentials: "include"
                });
                if (response.ok) {
                    const data: AuthUser = await response.json();
                    setUser({
                        isLoggedIn: true,
                        username: data.username,
                        role: data.role
                    });
                } else {
                    console.log("No active session");
                }
            } catch (error) {
                console.log("No active session", error);
            }
        };
        checkLogin();

    }, []);

    const login = (role: string, username: string) => {
        setUser({
            isLoggedIn: true,
            role: role,
            username: username
        });
    };

    const logout = () => {
        setUser({
            isLoggedIn: false,
            role: 'Guest',
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth should run in AuthProvider');
    }
    return context;
}