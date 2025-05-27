import React from 'react';
import { AuthProvider } from './AuthContext';

export const AppContextProvider = ({ children }: any) => {
    return (
        <AuthProvider>

            {children}

        </AuthProvider>
    );
};
