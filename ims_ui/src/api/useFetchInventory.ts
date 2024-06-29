import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

export const useFetchInventory = () : any => {
    const fetchData = async () => {
        const response = await axios.get(
            `${API_BASE_URL}/inventories/`,
            {
                withCredentials: false
            }
        );
        return response.data;
    };

    return useQuery(["data"], fetchData, {
        staleTime: 0,
    });
};
