import { LoginPayload } from "types/AuthType"
import { ApiPahts } from "../ApiPaths"
import axiosClient from "../axiosClient"
import { OrderFoodType } from "../../types/FoodType";

const userRequester = {

    userLogin: async (data: LoginPayload) => {
        return await axiosClient({
            url: ApiPahts.userLogin,
            method: 'POST',
            data: data,
        })
    },

    userFetchProfile: async () => {
        return await axiosClient({
            url: ApiPahts.userFetchProfilt,
            method: 'POST'
        });
    },

    userRefreshToken: async (data: string) => {
        return await axiosClient({
            url: ApiPahts.userRefreshToken,
            method: 'POST',
            data
        })
    },

    userOrderFood: async (data: any) => {
        return await axiosClient({
            url: ApiPahts.userOrderFood,
            method: 'POST',
            data: data
        })
    },

    userRegister: async (data: any) => {
        return await axiosClient({
            url: ApiPahts.userRegister,
            method: "POST",
            data,
        })
    }
};

export default userRequester;