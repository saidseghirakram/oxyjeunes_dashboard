"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiBarChart2, FiClipboard, FiFileText, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import Cookies from "js-cookie";

const sidebarItems = [
  { name: "General Stats", href: "/dashboard/general_stats", icon: <FiBarChart2 /> },
  { name: "Plans", href: "/dashboard/plans", icon: <FiClipboard /> },
  { name: "Applys", href: "/dashboard/applys", icon: <FiFileText /> },
];

// Add a simple JWT decode utility
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const payload = parseJwt(token);
      setRole(payload?.role || null);
    } else {
      setRole(null);
      router.replace("/auth");
    }
  }, [router]);

  function handleLogout() {
    Cookies.remove("token");
    router.replace("/auth");
  }

  // Prevent hydration mismatch: don't render until role is known
  if (role === null) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed z-30 top-0 left-0 h-screen w-64 transition-transform duration-300 bg-primary text-white flex flex-col ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-64 md:h-screen`}
        style={{ background: "var(--primary)", position: 'fixed', overflow: 'hidden' }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <span className="font-bold text-xl tracking-tight">Dashboard</span>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
          {sidebarItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded transition font-medium ${pathname === item.href ? "bg-white/20" : "hover:bg-white/10"}`}
              onClick={() => setOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded transition font-medium hover:bg-white/10 mt-4"
          >
            <span className="text-lg"><FiLogOut /></span> Logout
          </button>
        </nav>
      </aside>
      {/* Overlay for mobile */}
      {open && (
        <div className="fixed inset-0 z-20 bg-black/30 md:hidden" onClick={() => setOpen(false)} />
      )}
      {/* Main content */}
      <div className="flex-1 min-h-screen ml-0 md:ml-64 transition-all duration-300">
        <header className="md:hidden flex items-center px-4 py-3 bg-primary text-black fixed top-0 left-0 right-0 z-20" style={{ background: "var(--primary)" }}>
          <button onClick={() => setOpen(true)}>
            <FiMenu size={28} />
          </button>
          <span className="ml-4 font-bold text-lg">Dashboard</span>
        </header>
        <main className="p-6 pt-16 md:pt-6">
          {(role === 'admin' || role === 'associationOwner') ? (
            children
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">You are not an admin.</h2>
              <p className="text-gray-600">Access to the dashboard is restricted. We will add more features for non-admins soon.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 