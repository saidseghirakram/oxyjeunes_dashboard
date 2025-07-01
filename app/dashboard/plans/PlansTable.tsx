"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Plan {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  volunteerNumber: number;
  destinationId: string;
  category_id: string;
  associationId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function PlansTable() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("No token found");
        const res = await fetch(`${BASE_URL}/plan`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch plans");
        const json = await res.json();
        let plansArray = Array.isArray(json) ? json : json.data;
        if (!Array.isArray(plansArray)) plansArray = [];
        setPlans(plansArray);
        // Get role from token
        const payload = parseJwt(token);
        setRole(payload?.role || null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleDelete = (id: string) => {
    // TODO: Implement delete logic
    alert(`Delete plan ${id}`);
  };

  const handleUpdate = (id: string) => {
    // TODO: Implement update logic
    alert(`Update plan ${id}`);
  };

  if (loading) return <div className="text-center py-8 text-secondary">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="overflow-x-auto w-full mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-primary tracking-tight">Plans</h2>
        {role === 'associationOwner' && (
          <button
            className="bg-secondary text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-secondary/90 transition text-base"
            onClick={() => alert('Add Plan (to implement)')}
          >
            + Add Plan
          </button>
        )}
      </div>
      <table className="min-w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-4 px-4 text-left text-base font-bold">Name</th>
            <th className="py-4 px-4 text-left text-base font-bold">Start Date</th>
            <th className="py-4 px-4 text-left text-base font-bold">Active</th>
            <th className="py-4 px-4 text-left text-base font-bold">Action</th>
            <th className="py-4 px-4 text-left text-base font-bold">Show</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(plans) && plans.map((plan, idx) => (
            <tr
              className={`border-b last:border-b-0 hover:bg-secondary/10 transition text-black ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              key={plan.id}
            >
              <td className="py-3 px-4 font-semibold text-black text-base">{plan.name}</td>
              <td className="py-3 px-4 text-black text-base">{new Date(plan.startDate).toLocaleDateString()}</td>
              {/* Active badge */}
              <td className="py-3 px-4">
                {plan.isActive ? (
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs">Yes</span>
                ) : (
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-xs">No</span>
                )}
              </td>
              {/* Action Dropdown */}
              <td className="py-3 px-4 text-black">
                <select
                  className="border rounded-lg px-3 py-1 bg-white text-black focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm font-semibold text-base"
                  defaultValue=""
                  style={{ minWidth: 120, cursor: 'pointer', background: '#fff' }}
                  onChange={e => {
                    if (e.target.value === "delete") handleDelete(plan.id);
                    if (e.target.value === "update") handleUpdate(plan.id);
                    e.target.selectedIndex = 0; // reset to placeholder
                  }}
                >
                  <option value="" disabled>Choose...</option>
                  <option value="delete" className="text-primary font-bold">🗑️ Delete</option>
                  {role === 'associationOwner' && <option value="update" className="text-secondary font-bold">✏️ Update</option>}
                </select>
              </td>
              {/* Show More Button */}
              <td className="py-3 px-4 text-black">
                <button
                  className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition font-semibold shadow text-base"
                  onClick={() => router.push(`/dashboard/plans/${plan.id}`)}
                >
                  Show More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {plans.length === 0 && <div className="text-center py-8 text-gray-500">No plans found.</div>}
    </div>
  );
} 