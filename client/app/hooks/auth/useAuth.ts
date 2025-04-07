import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import coreApi from '../../utils/CoreApiInstance';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

interface RegisterUser {
    name: string;
    email: string;
    password: string;
}

interface VerifyUserParams {
    activation_code: string;
    activation_token: string;
}

interface LoginParams {
    email: string;
    password: string;
}

export const useAuth = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await coreApi.get('/v1/me', { 
                    withCredentials: true,
                });
                localStorage.setItem("user",JSON.stringify(data.user) )
                dispatch({
                    type: 'SET_USER',
                    payload: data.user,
                });
            } catch (error) {
                console.error('Auth error:', error);
            }
        };

        getUser();
    }, [dispatch]);

    // Get user from redux store
    const user = JSON.parse(localStorage.getItem("user") || '{}');
console.log(user.name);

    // Register User
    const register = useMutation({
        mutationFn: async (data: RegisterUser) => {
            const response = await coreApi.post('/v1/registration', data);
            return response.data;
        },
        onSuccess: (data) => {
            // Redirect to verification page with activation_token
            // router.push(`auth/signup/verify`);
        },
    });

    // Verify User
    const verifyUser = useMutation<any, Error, VerifyUserParams, unknown>({
        mutationFn: async (data: VerifyUserParams) => {
            const response = await coreApi.post('/v1/activate-user', 
                { activation_code: data.activation_code },
                {
                    headers: {
                        'activation_token': data.activation_token || ''
                    }
                }
            );
            // Clean up token after use
            sessionStorage.removeItem('activation_token');
            return response.data;
        },
        onSuccess: (data) => {   
            // Redirect to home page
            router.push('/');
        },
    });

    // Login
    const login = useMutation<any, Error, LoginParams, unknown>({
        mutationFn: async (data: LoginParams) => {
            const response = await coreApi.post('/v1/login', {
                email: data.email,
                password: data.password,
            });
            return response.data;
        },
        onSuccess: (data) => {
            // Redirect to home page
            router.push('/');
        },
    });

    return { 
        register, 
        verifyUser,
        login,
        user,
    };
};
