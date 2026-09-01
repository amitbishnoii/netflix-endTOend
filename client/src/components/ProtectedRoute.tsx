import { useAuth } from "@/hooks/useAuth";
import type React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const state = useAuth();
    if (state.user === null) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
