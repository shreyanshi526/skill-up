import axios, { AxiosResponse } from 'axios';

const coreApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:7001/api',
    headers: {
        'Content-Type': 'application/json',
    },
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
export const get = async <T>(url: string, params?: any): Promise<T> => {
    const response: AxiosResponse<T> = await coreApi.get(url, { params });
    return response.data;
};

export const post = async <T>(url: string, data?: any): Promise<T> => {
    const response: AxiosResponse<T> = await coreApi.post(url, data);
    return response.data;
};

export const put = async <T>(url: string, data?: any): Promise<T> => {
    const response: AxiosResponse<T> = await coreApi.put(url, data);
    return response.data;
};

export const del = async <T>(url: string): Promise<T> => {
    const response: AxiosResponse<T> = await coreApi.delete(url);
    return response.data;
};

export default coreApi;
