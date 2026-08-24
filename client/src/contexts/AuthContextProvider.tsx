import { useState } from "react";
import { AuthContext } from "./AuthContext.ts";

type LoginData = {
    username: string;
    accessToken: string;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<LoginData | null>(null);

    const login = (data: LoginData) => {
        setUser(data);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
