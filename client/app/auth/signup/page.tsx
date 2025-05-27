'use client';

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await register.mutateAsync(formData);
    
    if (response?.activationToken) {
      sessionStorage.setItem('activation_token', response.activationToken);
    }
  };
    const router = useRouter();
    const { user } = useAuth();
  
    useEffect(() => {
      if (user) {
        // If user exists, redirect to home
        router.replace('/');
      }
    }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
              required
            />
          </div>

          {register.isError && (
            <div className="text-red-500 text-center text-sm bg-red-50 p-2 rounded">
              {register.error.message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
            disabled={register.isPending}
          >
            {register.isPending ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600">
          <p>
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
