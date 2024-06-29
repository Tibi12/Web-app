import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

export const useFetchBills = () : any => {
    const fetchData = async () => {
        const response = await axios.get(
            `${API_BASE_URL}/bills/fetch-bills/`,
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
