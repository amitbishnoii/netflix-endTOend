import { createContext } from "react";

interface User {
    username: string;
    accessToken: string;
    role: "admin" | "user";
}

interface AuthContextType {
    user: User | null;
    login: (data: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
