"use client";
import React, { useState, useEffect } from "react";
import { poster } from "../../lib/fetcher";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface LoginResponse {
  id: string;
  email: string;
  password: string;
  role: string;
  name: string;
  country: string;
  city: string;
  gender: string;
  age: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  owner_id: string | null;
  token: string;
}

export default function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const router = useRouter();

  // On mount, if token exists, redirect to dashboard
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setPopup(null);
    try {
      const res = await poster<LoginResponse, typeof form>(
        `${BASE_URL}/auth/login`,
        form
      );
      if (res.success && res.data?.token) {
        Cookies.set("token", res.data.token, {
          expires: 7,
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        setPopup({ type: 'success', message: 'Login successful! Redirecting...' });
        setTimeout(() => {
          router.replace("/dashboard");
        }, 1000);
      } else {
        setPopup({ type: 'error', message: (res as { errors?: unknown }).errors?.toString() || 'Login failed.' });
      }
    } catch (error) {
      if (error instanceof Error) {
        setPopup({ type: 'error', message: error.message || 'Login failed.' });
      } else {
        setPopup({ type: 'error', message: 'Login failed.' });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Admin Space - Login</h2>
      {popup && (
        <div className={`p-3 rounded text-center mb-2 ${popup.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{popup.message}</div>
      )}
      <form className="flex flex-col gap-4 text-black" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button
          type="submit"
          className="w-full py-3 rounded bg-primary text-white font-semibold hover:bg-opacity-90 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </section>
  );
} 