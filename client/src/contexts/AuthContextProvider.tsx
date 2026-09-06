import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.ts";

type LoginData = {
    username: string;
    accessToken: string;
    role: "admin" | "user";
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<LoginData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkExisting = () => {
            const savedUsername = localStorage.getItem("username");
            const savedToken = localStorage.getItem("accessToken");
            const savedRole = localStorage.getItem("role");
            if (savedUsername && savedRole && savedToken) {
                setUser({
                    username: savedUsername,
                    accessToken: savedToken,
                    role: savedRole as "admin" | "user",
                });
            }
            setIsLoading(false);
        };
        checkExisting();
    }, []);

    const login = (data: LoginData) => {
        localStorage.setItem("username", data.username);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("role", data.role);
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
