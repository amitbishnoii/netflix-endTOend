import { Eye, EyeOff } from "lucide-react";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface inputProps {
    type: string;
    placeholder: string;
    classname: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
    wrapperDivClass: string;
    showPassword?: boolean;
    togglePassword?: () => void;
}

const FormInput = (props: inputProps) => {
    return (
        <div className={props.wrapperDivClass}>
            {props.placeholder === "Password" ||
            props.placeholder === "Confirm Password" ? (
                <div className="relative">
                    <input
                        type={props.showPassword ? "text" : "password"}
                        placeholder={props.placeholder}
                        className={props.classname}
                        {...props.registration}
                    />
                    <button
                        type="button"
                        onClick={props.togglePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        {props.showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>
            ) : (
                <>
                    <input
                        type={props.type}
                        placeholder={props.placeholder}
                        className={props.classname}
                        {...props.registration}
                    />
                    {props.error && (
                        <p className="text-red-400 text-xs mt-1 ml-1">
                            {props.error.message}
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default FormInput;
