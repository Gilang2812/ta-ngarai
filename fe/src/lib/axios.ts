import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    headers: {
        authorization: 'Bearer '
    }
})