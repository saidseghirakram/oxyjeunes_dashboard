"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

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

export default function PlanDetailsPage() {
  const { id } = useParams();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("No token found");
        const res = await fetch(`${BASE_URL}/plan/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch plan");
        const json = await res.json();
        setPlan(json.data || json); // handle both wrapped and direct
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPlan();
  }, [id]);

  if (loading) return <div className="text-center py-8 text-primary">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!plan) return <div className="text-center py-8 text-gray-500">Plan not found.</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Plan Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
        <div><strong>ID:</strong> {plan.id}</div>
        <div><strong>Name:</strong> {plan.name}</div>
        <div><strong>Description:</strong> {plan.description}</div>
        <div><strong>Start Date:</strong> {new Date(plan.startDate).toLocaleString()}</div>
        <div><strong>End Date:</strong> {new Date(plan.endDate).toLocaleString()}</div>
        <div><strong>Volunteer Number:</strong> {plan.volunteerNumber}</div>
        <div><strong>Destination ID:</strong> {plan.destinationId}</div>
        <div><strong>Category ID:</strong> {plan.category_id}</div>
        <div><strong>Association ID:</strong> {plan.associationId}</div>
        <div><strong>Active:</strong> {plan.isActive ? "Yes" : "No"}</div>
        <div><strong>Created At:</strong> {new Date(plan.createdAt).toLocaleString()}</div>
        <div><strong>Updated At:</strong> {new Date(plan.updatedAt).toLocaleString()}</div>
      </div>
    </div>
  );
} 