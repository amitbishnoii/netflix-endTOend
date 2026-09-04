import AddPage from "@/components/AddPage";
import UpdatePage from "@/components/UpdatePage";
import { useState } from "react";

const AdminPage = () => {
    type AdminActions = "update" | "add" | "delete" | null;
    const [currentAction, setCurrentAction] = useState<AdminActions>(null);

    return (
        <div>
            <div className="min-h-screen w-full bg-black text-white pt-24 px-8 pb-12">
                <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

                <div className="flex gap-3 mb-8">
                    <button
                        onClick={() => setCurrentAction("add")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                            currentAction === "add"
                                ? "bg-white text-black"
                                : "bg-white/5 border border-white/10 hover:bg-white/10"
                        }`}
                    >
                        Add Movie
                    </button>
                    <button
                        onClick={() => setCurrentAction("update")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                            currentAction === "update"
                                ? "bg-white text-black"
                                : "bg-white/5 border border-white/10 hover:bg-white/10"
                        }`}
                    >
                        Update Movie
                    </button>
                    <button
                        onClick={() => setCurrentAction("delete")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                            currentAction === "delete"
                                ? "bg-white text-black"
                                : "bg-white/5 border border-white/10 hover:bg-white/10"
                        }`}
                    >
                        Delete Movie
                    </button>
                </div>

                {currentAction === "add" && <AddPage />}
                {currentAction === "update" && <UpdatePage />}
            </div>
        </div>
    );
};

export default AdminPage;
