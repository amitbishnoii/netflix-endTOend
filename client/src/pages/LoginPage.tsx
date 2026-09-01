import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth.ts";
import { useNavigate } from "react-router-dom";

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
    const { login } = useAuth();
    const navigate = useNavigate();

    const formSubmitHandler = async (data: LoginFormData) => {
        const response = await axios.post(
            "http://localhost:3000/api/auth/login",
            data,
        );
        localStorage.setItem("refresh-token", response.data.refreshToken);
        login({
            username: response.data.userInfo.username,
            accessToken: response.data.token,
        });
    };

    return (
        <div className="relative bg-[#08090a] text-white w-full min-h-screen overflow-hidden flex justify-center items-center px-4">
            <div className="pointer-events-none absolute w-150 h-150 rounded-full bg-[#e8b34f]/6 blur-[120px]" />

            <form
                onSubmit={handleSubmit(formSubmitHandler)}
                className="relative w-full max-w-100 py-12 px-10 bg-[#0f1012]/90 backdrop-blur-xl border border-white/8 rounded-[28px] flex flex-col items-center gap-6 shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
            >
                <div className="flex flex-col items-center gap-2 mb-2 text-center">
                    <h2 className="text-[32px] font-semibold tracking-[-0.03em] text-white leading-tight">
                        Welcome back
                    </h2>
                    <p className="text-[14px] text-white/40">
                        Sign in to continue to your account
                    </p>
                </div>

                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-white/50 ml-1">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full h-13 px-4 rounded-2xl bg-[#17181b] border border-white/8 text-[15px] text-white placeholder:text-white/25 outline-none transition-all duration-150 hover:border-white/15 focus:border-[#e8b34f]/60 focus:bg-[#191a1e] focus:ring-[3px] focus:ring-[#e8b34f]/12"
                            placeholder="Enter your username"
                            {...register("username", {
                                required: "Please provide a Username!",
                            })}
                        />
                        {errors.username && (
                            <p className="text-red-400 text-xs ml-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className="w-full flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-white/50 ml-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full h-13 px-4 rounded-2xl bg-[#17181b] border border-white/8 text-[15px] text-white placeholder:text-white/25 outline-none transition-all duration-150 hover:border-white/15 focus:border-[#e8b34f]/60 focus:bg-[#191a1e] focus:ring-[3px] focus:ring-[#e8b34f]/12"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Please provide a Password!",
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-400 text-xs ml-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    className="w-full h-14 rounded-2xl bg-[#e8b34f] text-black font-semibold text-[16px] hover:bg-[#edbf66] active:scale-[0.98] transition-all duration-150 ease-out shadow-[0_10px_30px_rgba(232,179,79,0.2)] mt-2"
                    type="submit"
                >
                    Sign in
                </button>

                <div className="w-full flex items-center gap-3 my-1">
                    <div className="h-px flex-1 bg-white/8" />
                    <span className="text-[12px] text-white/30">or</span>
                    <div className="h-px flex-1 bg-white/8" />
                </div>

                <button
                    type="button"
                    onClick={() => {
                        navigate("/signup");
                    }}
                    className="w-full h-14 rounded-2xl bg-white/3 border border-white/8 text-white/70 font-medium text-[15px] hover:bg-white/6 hover:border-white/15 hover:text-white active:scale-[0.98] transition-all duration-150"
                >
                    Create an account
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
