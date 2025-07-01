"use client";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl sm:text-6xl font-extrabold text-center tracking-tight text-gray-900 drop-shadow-sm mb-16">
        <span className="text-primary">Admin</span> <span className="text-secondary">Space</span>
      </h1>
      <div className="flex gap-2 mb-8">
        <button
          className={`px-6 py-2 rounded-tl rounded-bl font-semibold border border-gray-300 transition ${mode === 'login' ? 'bg-secondary text-white' : 'bg-white text-gray-700'}`}
          onClick={() => setMode('login')}
        >
          Login
        </button>
        <button
          className={`px-6 py-2 rounded-tr rounded-br font-semibold border border-gray-300 transition ${mode === 'signup' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
          onClick={() => setMode('signup')}
        >
          Signup
        </button>
      </div>
      {mode === 'login' ? <LoginForm /> : <SignupForm />}
    </div>
  );
} 