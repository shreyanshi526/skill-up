import axios, { AxiosResponse } from 'axios';

const coreApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add request interceptor
coreApi.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
coreApi.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors (401, 403, etc.)
        if (error.response?.status === 401) {
            // Handle unauthorized
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

// Generic API methods using interceptors
const get = async <T>(url: string, params?: any): Promise<T> => {
    const response: AxiosResponse<T> = await coreApi.get(url, { params });
    return response.data;
};

const post = async <T>(url: string, data?: any): Promise<T> => {
    const response: AxiosResponse<T> = await coreApi.post(url, data);
    return response.data;
};

const put = async <T>(url: string, data?: any): Promise<T> => {
    const response: AxiosResponse<T> = await coreApi.put(url, data);
    return response.data;
};

const del = async <T>(url: string): Promise<T> => {
    const response: AxiosResponse<T> = await coreApi.delete(url);
    return response.data;
};

export default coreApi;
