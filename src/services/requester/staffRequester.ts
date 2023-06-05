import { ApiPahts } from "../../services/ApiPaths";
import axiosClient from "../../services/axiosClient";

const staffRequester = {

    getAllStaff: async (keyWord?: string) => {
        return await axiosClient({
            url: ApiPahts.getAllStaff,
            method: "GET",
            params: {
                keyWord
            }
        })
    },
    getAllWorkShift: async () => {
        return await axiosClient({
            url: ApiPahts.getWorkShift,
            method: "GET"
        })
    },

    createCalendar: async (data: any) => {
        return await axiosClient({
            url: ApiPahts.createCalendar,
            method: "POST",
            data
        })
    },
    
    getDetailCalendar: async (id: string) => {
        return await axiosClient({
            url: ApiPahts.getDetailCalendar,
            method: "GET",
            params: {
                id
            }
        })
    },

    updateCalendar: async (data: {id: number, data:any}) => {
        return await axiosClient({
            url: ApiPahts.updateCalendar,
            method: "PUT",
            data: data.data,
            params: {
                id: data.id
            }
        })
    },

    deleteCalender: async (id: string) => {
        return await axiosClient({
            url: ApiPahts.deleteCalendar,
            method: "DELETE",
            params: {
                id
            }
        })
    }
}

export default staffRequester;