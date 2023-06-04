import { ApiPahts } from "../../services/ApiPaths";
import axiosClient from "../../services/axiosClient"

const userRequester = {
    
    getOrderList: async (data: string) => {
        return await axiosClient({
            url: ApiPahts.orderList,
            method: 'GET',
            data,
        })
    },

    getOrderType: async () => {
        return await axiosClient({
            url: ApiPahts.orderType,
            method: 'GET'
        })
    },

    updateOrder: async (data: {order_id: string, data: {order_status_id: string}}) => {
        console.log(data)
        return await axiosClient({
            url: ApiPahts.updateOrder,
            method: "PUT",
            data : data.data,
            params:{
                id: data.order_id 
            }
        })
    },

    getAllCalendarWork: async () => {
        return await axiosClient({
            url: ApiPahts.getCalendarWork,
            method: 'GET'
        })
    },
};

export default userRequester;