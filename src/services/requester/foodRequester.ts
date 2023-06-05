import { FoodCreateType } from "../../types/FoodType";
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
    },
    createFood: async (formData: any) => {
        return await axiosClient({
            url: ApiPahts.createFood,
            method: 'POST',
            data: formData,
        })
    },
    deleteFood: async (id: string) => {
        return await axiosClient({
            url: ApiPahts.deleteFood,
            method: "DELETE",
            params: {
                id
            }
        })
    },
};

export default foodRequester;