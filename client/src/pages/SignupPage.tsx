import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import FormInput from "../components/FormInputField";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SignupPageData {
    username: string;
    password: string;
    passwordConfirm: string;
    email: string;
    birthday: string;
}

const SignupPage = () => {
    const showPassword = usePasswordToggle();
    const showConfirmPassword = usePasswordToggle();
    const { login } = useAuth();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupPageData>();
    const passwordMatch = watch("password");
    const navigate = useNavigate();
    const [error, setError] = useState<string>();

    const handleSignup = async (data: SignupPageData) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/signup",
                {
                    username: data.username,
                    password: data.password,
                    email: data.email,
                    birthday: data.birthday,
                },
            );            
            login({
                username: response.data.data.username,
                accessToken: response.data.token,
            });
            navigate("/home");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const message = err.response.data.message;
                setError(message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    const inputBase =
        "w-full bg-transparent border-0 border-b-2 border-white/15 rounded-none px-1 pb-3 pt-2 text-[16px] sm:text-[17px] text-white placeholder:text-white/25 outline-none transition-colors duration-200 focus:border-[#ccff00]";
    const inputWithIcon = inputBase + " pr-9";
    const dateInput =
        "w-full bg-transparent border-0 border-b-2 border-white/15 rounded-none px-1 pb-3 pt-2 text-[16px] sm:text-[17px] text-white/90 outline-none transition-colors duration-200 focus:border-[#ccff00] scheme-dark [&::-webkit-calendar-picker-indicator]:opacity-40 [&::-webkit-calendar-picker-indicator]:hover:opacity-80 [&::-webkit-calendar-picker-indicator]:cursor-pointer";

    return (
        <div className="bg-[#050505] text-white w-full min-h-screen flex flex-col lg:flex-row overflow-hidden">
            <div className="hidden lg:flex relative w-[44%] min-h-screen items-end p-14 overflow-hidden">
                <div className="pointer-events-none absolute -top-32 -left-32 w-130 h-130 rounded-full bg-[#ccff00]/15 blur-[140px]" />
                <div className="pointer-events-none absolute bottom-0 right-0 w-100 h-100 rounded-full bg-[#7c5cff]/12 blur-[120px]" />
                <div className="relative z-10 flex flex-col gap-6">
                    <span className="text-[13px] tracking-tight text-white/40">
                        Est. today, by you
                    </span>
                    <h1 className="text-[56px] leading-[1.02] font-semibold tracking-[-0.03em] max-w-105">
                        Your account,
                        <br />
                        built in under
                        <br />a minute.
                    </h1>
                    <p className="text-[15px] text-white/40 max-w-90 leading-relaxed">
                        No fluff, no fifteen-step wizard. Fill it in, hit sign
                        up, get on with your life.
                    </p>
                </div>
            </div>

            <div className="relative flex-1 flex justify-center items-center px-5 sm:px-8 py-12 sm:py-16">
                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-70 h-70 sm:w-85 sm:h-85 rounded-full bg-[#ccff00]/6 blur-[90px] lg:hidden" />
                <div className="pointer-events-none absolute bottom-0 right-0 w-55 h-55 rounded-full bg-[#7c5cff]/8 blur-[90px] lg:hidden" />

                <form
                    onSubmit={handleSubmit(handleSignup)}
                    className="relative w-full max-w-100 flex flex-col gap-7 sm:gap-8"
                >
                    <div className="flex flex-col gap-2">
                        <span className="lg:hidden text-[12px] tracking-tight text-white/35">
                            Est. today, by you
                        </span>
                        <h2 className="text-[26px] sm:text-[30px] font-semibold tracking-[-0.02em] text-white">
                            Create account
                        </h2>
                        <p className="text-[13.5px] sm:text-[14px] text-white/40">
                            Already in?{" "}
                            <button
                                type="button"
                                className="text-[#ccff00] hover:underline underline-offset-4"
                                onClick={() => navigate("/login")}
                            >
                                Log in instead
                            </button>
                        </p>
                    </div>

                    <div className="flex flex-col gap-5 sm:gap-6">
                        <FormInput
                            wrapperDivClass="w-full min-h-[58px] sm:min-h-[62px]"
                            type="text"
                            placeholder="Username"
                            classname={inputBase}
                            registration={register("username", {
                                required: "Username is required!",
                            })}
                            error={errors.username}
                        />

                        <FormInput
                            wrapperDivClass="w-full min-h-[58px] sm:min-h-[62px]"
                            type="email"
                            placeholder="Email"
                            classname={inputBase}
                            registration={register("email", {
                                required: "Email is required!",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Please provide a valid Email.",
                                },
                            })}
                            error={errors.email}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <FormInput
                                wrapperDivClass="w-full min-h-[58px] sm:min-h-[62px]"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                classname={inputWithIcon}
                                registration={register("password", {
                                    required: "Password is required.",
                                    minLength: {
                                        value: 8,
                                        message: "Min. 8 characters.",
                                    },
                                })}
                                error={errors.password}
                                showPassword={showPassword.show}
                                togglePassword={showPassword.toggle}
                            />

                            <FormInput
                                wrapperDivClass="w-full min-h-[58px] sm:min-h-[62px]"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm"
                                classname={inputWithIcon}
                                registration={register("passwordConfirm", {
                                    required: "Confirmation is required.",
                                    validate: (value) =>
                                        value === passwordMatch ||
                                        "Doesn't match",
                                })}
                                showPassword={showConfirmPassword.show}
                                error={errors.passwordConfirm}
                                togglePassword={showConfirmPassword.toggle}
                            />
                        </div>

                        <FormInput
                            wrapperDivClass="w-full min-h-[58px] sm:min-h-[62px]"
                            type="date"
                            placeholder="Birthday"
                            classname={dateInput}
                            registration={register("birthday", {
                                required: "Birthday is required.",
                            })}
                            error={errors.birthday}
                        />
                    </div>
                    {error && <p className="text-red-700">{error}</p>}

                    <button
                        className="w-full h-13 sm:h-14 rounded-full bg-[#ccff00] text-black font-semibold text-[15.5px] sm:text-[16px] hover:bg-[#d9ff4d] active:scale-[0.97] transition-all duration-150 ease-out shadow-[0_0_40px_rgba(204,255,0,0.25)] cursor-pointer"
                        type="submit"
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
