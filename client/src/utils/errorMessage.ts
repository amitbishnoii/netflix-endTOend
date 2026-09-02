import axios from "axios";

const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error) && error.response) {
        return error.response.data.message || "Something went Wrong";
    } else if (axios.isAxiosError(error) && error.request) {
        return "No response, check your connection";
    }
    return "Please try again!";
};

export default getErrorMessage;
