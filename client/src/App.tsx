import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContextProvider";
import Navbar from "./components/Navbar";
import { lazy, Suspense } from "react";
import PageSkeleton from "./components/PageSkeleton";
import ProtectedRoute from "./components/ProtectedRoute";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const Home = lazy(() => import("./pages/Home"));
const Favourites = lazy(() => import("./pages/Favourites"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const StreamPage = lazy(() => import("./pages/StreamPage"));

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route
                    path="/signup"
                    element={
                        <Suspense fallback={<PageSkeleton />}>
                            <SignupPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Suspense fallback={<PageSkeleton />}>
                            <LoginPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <>
                            <Navbar />
                            <Suspense fallback={<PageSkeleton />}>
                                <Home />
                            </Suspense>
                        </>
                    }
                />
                <Route
                    path="/movie/:movieID"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Suspense fallback={<PageSkeleton />}>
                                <MoviePage />
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/stream/:movieID"
                    element={
                        <ProtectedRoute>
                            <Suspense fallback={<PageSkeleton />}>
                                <StreamPage />
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/favourites"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Suspense fallback={<PageSkeleton />}>
                                <Favourites />
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
};

export default App;
