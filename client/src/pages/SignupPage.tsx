import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface SignupPageData {
    username: string;
    password: string;
    passwordConfirm: string;
    email: string;
    birthday: Date;
}

const SignupPage = () => {
    const [showPassword, setshowPassword] = useState(false);
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupPageData>();
    const passwordMatch = watch("password");

    const handleSignup = () => {
        
    };

    return (
        <div className="bg-[#08090b] text-white w-screen h-screen flex justify-center items-center pt-4">
            <form
                onSubmit={handleSubmit(handleSignup)}
                className="w-110 h-150 pt-6 bg-[#111214] border border-white/[0.14] rounded-[20px] flex flex-col items-center gap-5 p-10 shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
            >
                <h2 className="text-3xl font-semibold mb-6 tracking-[-0.03em] text-white">
                    Create account
                </h2>

                <div className="w-[70%]">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full h-12 pl-4 rounded-xl bg-[#18191c] border border-white/10 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-all duration-200 hover:border-white/18 focus:border-indigo-400/70 focus:bg-[#1b1c20] focus:ring-4 focus:ring-indigo-500/10"
                        {...register("username", {
                            required: "Username is required!",
                        })}
                    />
                    {errors.username && (
                        <p className="text-red-400 text-xs mt-1 ml-1">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                <div className="w-[70%]">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full h-12 pl-4 rounded-xl bg-[#18191c] border border-white/10 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-all duration-200 hover:border-white/18 focus:border-indigo-400/70 focus:bg-[#1b1c20] focus:ring-4 focus:ring-indigo-500/10"
                        {...register("email", {
                            required: "Email is required!",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please provide a valid Email.",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-400 text-xs mt-1 ml-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="w-[70%]">
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full h-12 pl-4 pr-12 rounded-xl bg-[#18191c] border border-white/10 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-all duration-200 hover:border-white/18 focus:border-indigo-400/70 focus:bg-[#1b1c20] focus:ring-4 focus:ring-indigo-500/10"
                            {...register("password", {
                                required: "Password is required.",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters.",
                                },
                            })}
                        />

                        <button
                            type="button"
                            onClick={() => setshowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-red-400 text-xs mt-1 ml-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="w-[70%]">
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full h-12 pl-4 pr-12 rounded-xl bg-[#18191c] border border-white/10 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-all duration-200 hover:border-white/18 focus:border-indigo-400/70 focus:bg-[#1b1c20] focus:ring-4 focus:ring-indigo-500/10"
                            {...register("passwordConfirm", {
                                required: "Password is required.",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters.",
                                },
                                validate: (value) =>
                                    value === passwordMatch ||
                                    "Passwords do not match",
                            })}
                        />

                        <button
                            type="button"
                            onClick={() => setshowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>

                    {errors.passwordConfirm && (
                        <p className="text-red-400 text-xs mt-1 ml-1">
                            {errors.passwordConfirm.message}
                        </p>
                    )}
                </div>

                <div className="w-[70%]">
                    <input
                        type="date"
                        className="w-full h-12 px-4 rounded-xl bg-[#18191c] border border-white/10 text-[15px] text-zinc-300 outline-none transition-all duration-200 hover:border-white/18 focus:border-indigo-400/70 focus:bg-[#1b1c20] focus:ring-4 focus:ring-indigo-500/10 scheme-dark"
                        {...register("birthday", {
                            required: "Birthday is required.",
                        })}
                    />
                    {errors.birthday && (
                        <p className="text-red-400 text-xs mt-1 ml-1">
                            {errors.birthday.message}
                        </p>
                    )}
                </div>

                <button
                    className="w-[70%] h-12 mt-4 rounded-xl bg-white text-black font-semibold text-[15px] hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200 shadow-[0_8px_30px_rgba(255,255,255,0.08)]"
                    type="submit"
                >
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default SignupPage;
