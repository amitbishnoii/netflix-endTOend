import axios from "axios";
import { useForm } from "react-hook-form";

interface LoginFormData {
    username: string;
    password: string;
}

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const formSubmitHandler = async (data: LoginFormData) => {
        const response = await axios.post(
            "http://localhost:3000/api/auth/login",
            data,
        );
        console.log(response);
    };

    return (
        <div className="bg-[#08090b] text-white w-screen h-screen flex justify-center items-center pt-4">
            <form
                onSubmit={handleSubmit(formSubmitHandler)}
                className="w-98.5 h-125 pt-6 bg-[#111214] border border-white/[0.14] rounded-[20px] flex flex-col items-center gap-5 p-10 shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
            >
                <h2 className="text-3xl font-semibold mb-6 tracking-[-0.03em] text-white">
                    Welcome back
                </h2>

                <input
                    type="text"
                    className="w-[70%] h-12 pl-4 rounded-xl bg-[#18191c] border border-white/10 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-all duration-200 hover:border-white/18 focus:border-indigo-400/70 focus:bg-[#1b1c20] focus:ring-4 focus:ring-indigo-500/10"
                    placeholder="Username"
                    {...register("username", {
                        required: "Please provide a Username!",
                    })}
                />
                {errors.username && (
                    <p className="text-red-700 text-[14px]">
                        {errors.username.message}
                    </p>
                )}

                <input
                    type="text"
                    className="w-[70%] h-12 pl-4 rounded-xl bg-[#18191c] border border-white/10 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-all duration-200 hover:border-white/18 focus:border-indigo-400/70 focus:bg-[#1b1c20] focus:ring-4 focus:ring-indigo-500/10"
                    placeholder="Password"
                    {...register("password", {
                        required: "Please provide a Password!",
                    })}
                />
                {errors.password && (
                    <p className="text-red-700 text-[14px]">
                        {errors.password.message}
                    </p>
                )}

                <button
                    className="w-[70%] h-12 mt-4 rounded-xl bg-white text-black font-semibold text-[15px] hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200 shadow-[0_8px_30px_rgba(255,255,255,0.08)]"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
