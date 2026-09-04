import { useAuth } from "@/hooks/useAuth";
import type React from "react";

const AuthorizedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    if (user?.role === "admin") {
        return children;
    } else {
        return (
            <div style={{ textAlign: "center", marginTop: "4rem" }}>
                <h1>403 — Forbidden</h1>
                <p>You don't have permission to access this page.</p>
            </div>
        );
    }
};

export default AuthorizedRoute;
