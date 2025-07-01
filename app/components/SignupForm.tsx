"use client";
import React, { useState } from "react";
import { poster } from "../../lib/fetcher";

export interface User {
  email: string;
  password: string;
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | '';
  country: string;
  role: 'associationOwner';
  city: string;
  profilePicture: string;
  associationData: {
    name: string;
    description: string;
  };
}

interface SignupResponse {
  token: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function SignupForm() {
  const [form, setForm] = useState<User>({
    email: '',
    password: '',
    name: '',
    age: 18,
    gender: '',
    country: '',
    role: 'associationOwner',
    city: '',
    profilePicture: '',
    associationData: {
      name: '',
      description: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    if (name === 'age') {
      setForm(prev => ({ ...prev, age: Number(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value, role: 'associationOwner' }));
    }
  }

  function handleAssociationNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setForm(prev => ({
      ...prev,
      associationData: { ...prev.associationData, name: value },
    }));
  }

  function handleAssociationDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;
    setForm(prev => ({
      ...prev,
      associationData: { ...prev.associationData, description: value },
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setPopup(null);
    try {
      const res = await poster<SignupResponse, User>(
        `${BASE_URL}/auth/register`,
        { ...form, role: 'associationOwner' }
      );
      if (res.success) {
        setPopup({ type: 'success', message: 'Signup successful! Token saved.' });
      } else {
        setPopup({ type: 'error', message: (res as { errors?: unknown }).errors?.toString() || 'Signup failed.' });
      }
    } catch (error) {
      if (error instanceof Error) {
        setPopup({ type: 'error', message: error.message || 'Signup failed.' });
      } else {
        setPopup({ type: 'error', message: 'Signup failed.' });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Association Signup</h2>
      <div className="text-xs text-gray-500 mb-4">
       
      </div>
      {popup && (
        <div className={`p-3 rounded text-center mb-2 ${popup.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{popup.message}</div>
      )}
      <form className="flex flex-col gap-4 text-black" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          min={0}
          className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        />
        <input
          type="text"
          name="profilePicture"
          placeholder="Profile Picture URL"
          value={form.profilePicture}
          onChange={handleChange}
          className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="text"
          placeholder="Association Name"
          value={form.associationData.name}
          onChange={handleAssociationNameChange}
          className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <textarea
          placeholder="Association Description"
          value={form.associationData.description}
          onChange={handleAssociationDescriptionChange}
          className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows={3}
          required
        />
        <button
          type="submit"
          className="w-full py-3 rounded bg-secondary text-white font-semibold hover:bg-opacity-90 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </section>
  );
} 