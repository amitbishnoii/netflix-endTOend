import { useAuth } from "@/hooks/useAuth";
import type React from "react";
import { Navigate } from "react-router-dom";
import PageSkeleton from "./PageSkeleton";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const state = useAuth();
    if (state.isLoading) {
        return <PageSkeleton />;
    }
    if (state.user === null) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
