'use client';

import { useState } from "react";
import { useAuth } from "../../../hooks/auth/useAuth";
import { FaCheckCircle, FaKey } from "react-icons/fa";

export default function Verify() {
  const { verifyUser } = useAuth();
  const activation_token = sessionStorage.getItem("activation_token");

  const [activation_code, setActivationCode] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivationCode(e.target.value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!activation_token) {
      setError("Invalid request. No activation token provided.");
      return;
    }

    verifyUser.mutate(
      { activation_code, activation_token },
      {
        onError: (error) => {
          setError(error.message || "Verification failed. Please try again.");
        },
      }
    );
  };

  if (verifyUser.isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
          <FaCheckCircle className="mx-auto text-green-500 text-5xl mb-4" />
          <h2 className="text-2xl font-bold mb-4">Account Verified!</h2>
          <p className="text-green-600 mb-4">Your account has been successfully verified.</p>
          <a 
            href="/auth/login" 
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Proceed to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Verify Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-500 text-center text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
          <div className="relative">
            <FaKey className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="activation_code"
              placeholder="Enter Activation Code"
              value={activation_code}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              disabled={verifyUser.isPending}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
            disabled={verifyUser.isPending}
          >
            {verifyUser.isPending ? "Verifying..." : "Verify Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
