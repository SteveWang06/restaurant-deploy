import axios from "axios";


const axiosClient = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URI,
    headers: {
        AppToken: import.meta.env.REACT_APP_TOKEN,
    }
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default axiosClient;