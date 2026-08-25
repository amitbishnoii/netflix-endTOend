import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import FormInput from "../components/FormInputField";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import { useNavigate } from "react-router-dom";

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

    const handleSignup = async (data: SignupPageData) => {
        const response = await axios.post(
            "http://localhost:3000/api/auth/signup",
            {
                username: data.username,
                password: data.password,
                email: data.email,
                birthday: data.birthday,
            },
        );
        console.log(response);

        login({
            username: response.data.username,
            accessToken: response.data.token,
        });
    };

    const inputBase =
        "w-full h-12 pl-4 rounded-xl bg-[#18191c] border border-white/10 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-all duration-200 hover:border-white/18 focus:border-indigo-400/70 focus:bg-[#1b1c20] focus:ring-4 focus:ring-indigo-500/10";
    const inputWithIcon = inputBase.replace("pl-4", "pl-4 pr-12");

    return (
        <div className="bg-[#08090b] text-white w-screen h-screen flex justify-center items-center pt-4">
            <form
                onSubmit={handleSubmit(handleSignup)}
                className="w-110 h-150 pt-6 bg-[#111214] border border-white/[0.14] rounded-[20px] flex flex-col items-center gap-5 p-10 shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
            >
                <h2 className="text-3xl font-semibold mb-6 tracking-[-0.03em] text-white">
                    Create account
                </h2>

                <FormInput
                    wrapperDivClass="w-[70%]"
                    type="text"
                    placeholder="Username"
                    classname={inputBase}
                    registration={register("username", {
                        required: "Username is required!",
                    })}
                    error={errors.username}
                />

                <FormInput
                    wrapperDivClass="w-[70%]"
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

                <FormInput
                    wrapperDivClass="w-[70%]"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    classname={inputWithIcon}
                    registration={register("password", {
                        required: "Password is required.",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters.",
                        },
                    })}
                    error={errors.password}
                    showPassword={showPassword.show}
                    togglePassword={showPassword.toggle}
                />

                <FormInput
                    wrapperDivClass="w-[70%]"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    classname={inputWithIcon}
                    registration={register("passwordConfirm", {
                        required: "Confirmation is required.",
                        validate: (value) =>
                            value === passwordMatch || "Passwords do not match",
                    })}
                    showPassword={showConfirmPassword.show}
                    error={errors.passwordConfirm}
                    togglePassword={showConfirmPassword.toggle}
                />

                <FormInput
                    wrapperDivClass="w-[70%]"
                    type="text"
                    placeholder="Birthday"
                    classname="w-full h-12 px-4 rounded-xl bg-[#18191c] border border-white/10 text-[15px] text-zinc-300 outline-none transition-all duration-200 hover:border-white/18 focus:border-indigo-400/70 focus:bg-[#1b1c20] focus:ring-4 focus:ring-indigo-500/10 scheme-dark"
                    registration={register("birthday", {
                        required: "Birthday is required.",
                    })}
                    error={errors.birthday}
                />

                <button
                    className="w-[70%] h-12 mt-4 rounded-xl bg-white text-black font-semibold text-[15px] hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200 shadow-[0_8px_30px_rgba(255,255,255,0.08)]"
                    type="submit"
                >
                    Sign up
                </button>

                <button
                    className="w-[70%] h-12 rounded-xl bg-transparent border border-white/12 text-zinc-300 font-medium text-[15px] hover:bg-white/5 hover:border-white/22 hover:text-white active:scale-[0.98] transition-all duration-200"
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default SignupPage;
