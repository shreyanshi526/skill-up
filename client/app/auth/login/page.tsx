'use client';

import { useState } from 'react';
import { useAuth } from '@/app/hooks/auth/useAuth';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        login.mutate({ email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-400" />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {login.isError && (
                        <div className="text-red-500 text-center text-sm bg-red-50 p-2 rounded">
                            {login.error.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
                        disabled={login.isPending}
                    >
                        {login.isPending ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-600">
                    <p>
                        Don't have an account?{' '}
                        <Link href="/auth/signup" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
