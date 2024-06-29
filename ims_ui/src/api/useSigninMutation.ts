import axios from "axios";
import { useMutation } from "react-query";
import { API_BASE_URL } from "../utils/constants";

export const useSigninMutation = () => {
    const mutation = useMutation(async (data: any) => {
        const response = await axios.post(
            `${API_BASE_URL}/users/login`,
            data
        );

        return response.data;
    });

    return mutation;
};
