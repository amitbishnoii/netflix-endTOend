import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContextProvider";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<Home />} />
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
