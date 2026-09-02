import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { MoreVertical, Search } from "lucide-react";

export default function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92vw] md:w-[85vw] lg:w-[70vw] max-w-7xl">
            <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a]/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-[#ff7a59]/40 to-transparent" />
                <div className="px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight whitespace-nowrap">
                                Stream
                                <span className="text-[#ff7a59]">.App</span>
                            </h2>

                            <div className="hidden sm:flex items-center gap-1">
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
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <div
                                className="flex items-center h-9 px-3 bg-white/5 border border-white/10 rounded-full transition-all
                            w-9 sm:w-40 md:w-52 justify-center sm:justify-start
                            focus-within:w-40 sm:focus-within:w-52 focus-within:border-[#ff7a59]/50"
                            >
                                <Search className="text-zinc-400 text-base shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="hidden sm:block w-full ml-2 border-none outline-none bg-transparent text-zinc-100 text-sm placeholder:text-zinc-500"
                                />
                            </div>

                            {user !== null ? (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-zinc-200"
                                >
                                    <MoreVertical />
                                </Button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        className="text-zinc-300 hover:text-white border border-white/15 hover:border-white/25 hover:bg-white/5 rounded-full px-3 sm:px-4 text-sm cursor-pointer"
                                    >
                                        Login
                                    </Button>
                                    <Button className="rounded-full px-3 sm:px-4 text-sm bg-[#ff7a59] hover:bg-[#ff8f73] text-black font-semibold shadow-[0_0_20px_rgba(255,122,89,0.3)] cursor-pointer">
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
