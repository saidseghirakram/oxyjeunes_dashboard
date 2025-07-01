"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/auth");
    }
  }, [router]);

  return <h1>Dashboard Home (Dashboard content will go here)</h1>;
} 