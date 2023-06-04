import { PaginationType } from "types/FoodType";
import { ApiPahts } from "../ApiPaths";
import axiosClient from "../axiosClient"

const foodRequester = {
    
    getAllFood:async (data?: string) => {
        
        return await axiosClient({
            url: ApiPahts.getAllFood,
            method: "GET",
            params: {

                keyWord: data? data : '' 
            }
        })
    }
};

export default foodRequester;