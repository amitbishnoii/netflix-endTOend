import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContextProvider";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Navbar from "./components/Navbar";
import MoviePage from "./pages/MoviePage";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/home"
                    element={
                        <>
                            <Navbar />
                            <Home />
                        </>
                    }
                />
                <Route
                    path="/stream/:movieID"
                    element={
                        <>
                            <Navbar />
                            <MoviePage />
                        </>
                    }
                />
                <Route
                    path="/favourites"
                    element={
                        <>
                            <Navbar />
                            <Favourites />
                        </>
                    }
                />
            </Routes>
        </AuthProvider>
    );
};

export default App;
