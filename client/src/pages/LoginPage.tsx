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

    const inputBase =
        "w-full bg-transparent border-0 border-b-2 border-white/15 rounded-none px-1 pb-3 pt-2 text-[16px] sm:text-[17px] text-white placeholder:text-white/25 outline-none transition-colors duration-200 focus:border-[#ff7a59]";
    return (
        <div className="bg-[#050505] text-white w-full min-h-screen flex flex-col lg:flex-row-reverse overflow-hidden">
            <div className="hidden lg:flex relative w-[44%] min-h-screen items-end p-14 overflow-hidden">
                <div className="pointer-events-none absolute -top-32 -right-32 w-130 h-130 rounded-full bg-[#ff7a59]/15 blur-[140px]" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-100 h-100 rounded-full bg-[#2f7cff]/12 blur-[120px]" />
                <div className="relative z-10 flex flex-col gap-6">
                    <span className="text-[13px] tracking-tight text-white/40">
                        Good to see you again
                    </span>
                    <h1 className="text-[56px] leading-[1.02] font-semibold tracking-[-0.03em] max-w-105">
                        Right where
                        <br />
                        you left
                        <br />
                        things.
                    </h1>
                    <p className="text-[15px] text-white/40 max-w-90 leading-relaxed">
                        Sign in and pick up the thread
                    </p>
                </div>
            </div>

            <div className="relative flex-1 flex justify-center items-center px-5 sm:px-8 py-12 sm:py-16">
                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-70 h-70 sm:w-85 sm:h-85 rounded-full bg-[#ff7a59]/6 blur-[90px] lg:hidden" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-55 h-55 rounded-full bg-[#2f7cff]/8 blur-[90px] lg:hidden" />

                <form
                    onSubmit={handleSubmit(formSubmitHandler)}
                    className="relative w-full max-w-100 flex flex-col gap-7 sm:gap-8"
                >
                    <div className="flex flex-col gap-2">
                        <span className="lg:hidden text-[12px] tracking-tight text-white/35">
                            Good to see you again
                        </span>
                        <h2 className="text-[26px] sm:text-[30px] font-semibold tracking-[-0.02em] text-white">
                            Login
                        </h2>
                        <p className="text-[13.5px] sm:text-[14px] text-white/40">
                            New here?{" "}
                            <button
                                type="button"
                                className="text-[#ff7a59] hover:underline underline-offset-4"
                                onClick={() => navigate("/signup")}
                            >
                                Create an account
                            </button>
                        </p>
                    </div>

                    <div className="flex flex-col gap-5 sm:gap-6">
                        <div className="w-full min-h-14.5 sm:min-h-15.5 flex flex-col gap-1.5">
                            <input
                                type="text"
                                className={inputBase}
                                placeholder="Username"
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

                        <div className="w-full min-h-14.5 sm:min-h-15.5 flex flex-col gap-1.5">
                            <input
                                type="password"
                                className={inputBase}
                                placeholder="Password"
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
                        className="w-full h-13 sm:h-14 rounded-full bg-[#ff7a59] text-black font-semibold text-[15.5px] sm:text-[16px] hover:bg-[#ff8f73] active:scale-[0.97] transition-all duration-150 ease-out shadow-[0_0_40px_rgba(255,122,89,0.25)]"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
