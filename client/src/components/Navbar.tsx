import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const linkActive =
        "text-blue-600 border-b-1 border-blue-600 text-base font-medium";
    const linkInactive = linkActive.replace(
        "text-blue-600 border-b-1 border-blue-600",
        "text-[#f4f4f5]",
    );
    const { user } = useAuth();

    return (
        <nav className="w-[calc(100%-44px)] h-18 mx-auto mt-5 px-6 flex items-center justify-between bg-[#09090b] border border-[#27272a] rounded-[14px] box-border">
            <div className="text-[#f4f4f5] text-[18px] font-semibold">
                Streaming App
            </div>

            <div className="flex items-center gap-7 ml-25">
                <NavLink
                    to={"/home"}
                    className={({ isActive }) =>
                        isActive ? linkActive : linkInactive
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to={"/favourites"}
                    className={({ isActive }) =>
                        isActive ? linkActive : linkInactive
                    }
                >
                    Favourites
                </NavLink>
            </div>

            <div className="flex items-center gap-2">
                <div className="w-48 h-10 flex items-center px-3 bg-[#09090b] border border-[#27272a] rounded-[9px] box-border">
                    <span className="text-[#a1a1aa] text-[22px] leading-none mr-2">
                        <FiSearch />
                    </span>

                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full border-none outline-none bg-transparent text-[#f4f4f5] text-sm placeholder:text-[#71717a]"
                    />
                </div>

                {user !== null ? (
                    <Button variant="outline" size="icon">
                        <BsThreeDotsVertical />
                    </Button>
                ) : (
                    <>
                        <Button variant={"outline"}>Login</Button>
                        <Button variant={"secondary"}>Sign-up</Button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
