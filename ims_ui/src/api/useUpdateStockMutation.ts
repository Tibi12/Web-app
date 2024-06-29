import axios from "axios";
import { useMutation } from "react-query";
import { API_BASE_URL } from "../utils/constants";

export const useUpdateStockMutation = () => {
    const mutation = useMutation(async (data: any) => {
        const response = await axios.post(
            `${API_BASE_URL}/inventories/update-stock`,
            data
        );

        return response.data;
    });

    return mutation;
};