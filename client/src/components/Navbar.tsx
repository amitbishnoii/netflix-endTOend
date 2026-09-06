import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement | null>(null);
    const { logout, user } = useAuth();

    useEffect(() => {
        if (!dropDownRef) {
            return;
        }
        const removeDropDown = (event: MouseEvent) => {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", removeDropDown);
        return () => document.removeEventListener("mousedown", removeDropDown);
    }, []);

    const handleLogout = () => {
        logout();
        setOpen(false);
    };

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-100 w-[90vw] md:w-[82vw] lg:w-[60vw] max-w-7xl">
            <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a]/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-[#ff7a59]/40 to-transparent" />
                <div className="px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight whitespace-nowrap">
                                Stream
                                <span className="text-[#ff7a59]">.App</span>
                            </h2>

                            {user && (
                                <div className="sm:flex items-center gap-1">
                                    <NavLink
                                        to="/home"
                                        className={({ isActive }) =>
                                            `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                                isActive
                                                    ? "text-white bg-white/10"
                                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                                            }`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to="/favourites"
                                        className={({ isActive }) =>
                                            `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                                isActive
                                                    ? "text-white bg-white/10"
                                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                                            }`
                                        }
                                    >
                                        Favourites
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            {user !== null ? (
                                <div className="relative">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-zinc-200"
                                        onClick={() => setOpen(!open)}
                                    >
                                        <MoreVertical />
                                    </Button>

                                    {open && (
                                        <div
                                            ref={dropDownRef}
                                            className="absolute right-0 top-full mt-2 w-48 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                                        >
                                            <div className="px-4 py-3 border-b border-white/10">
                                                <p className="text-xs text-zinc-500">
                                                    Signed in as
                                                </p>
                                                <p className="text-sm text-white font-medium truncate">
                                                    {user.username}
                                                </p>
                                            </div>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        className="text-zinc-300 hover:text-white border border-white/15 hover:border-white/25 hover:bg-white/5 rounded-full px-3 sm:px-4 text-sm cursor-pointer"
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        className="rounded-full px-3 sm:px-4 text-sm bg-[#ff7a59] hover:bg-[#ff8f73] text-black font-semibold shadow-[0_0_20px_rgba(255,122,89,0.3)] cursor-pointer"
                                        onClick={() => navigate("/login")}
                                    >
                                        Sign up
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
