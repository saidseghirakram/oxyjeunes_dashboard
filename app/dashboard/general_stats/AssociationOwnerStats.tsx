import React from "react";
import { ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { FaRegStar, FaClipboardList, FaUserFriends, FaTasks } from "react-icons/fa";

const dummyData = {
  totalPlans: 1,
  activePlans: 1,
  totalApplications: 1,
  pendingApplications: 0,
  acceptedApplications: 1,
  rejectedApplications: 0,
  totalReviews: 1,
  averageRating: 4.5,
  totalVolunteers: 1,
  plansThisMonth: 1,
  applicationsThisMonth: 1,
  topPlans: [
    {
      id: "4d6a47e2-bdea-401d-9dfe-bab90e3fa40d",
      name: "Health Awareness Campaign",
      applications: 1,
    },
  ],
  recentActivity: [
    {
      type: "review_received",
      description: "New review received: 4.5/5 stars",
      date: "2025-06-30T23:49:39.655Z",
    },
    {
      type: "application_received",
      description: "New application received for: Health Awareness Campaign",
      date: "2025-06-30T23:49:38.400Z",
    },
    {
      type: "plan_created",
      description: "New plan created: Health Awareness Campaign",
      date: "2025-06-30T23:49:35.439Z",
    },
  ],
};

const appStatusData = [
  { name: "Accepted", value: dummyData.acceptedApplications, color: "var(--primary)" },
  { name: "Pending", value: dummyData.pendingApplications, color: "#eab308" },
  { name: "Rejected", value: dummyData.rejectedApplications, color: "#ef4444" },
];

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number | string; color: string }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow p-4 min-w-[220px]">
      <div className="w-12 h-12 flex items-center justify-center rounded-full" style={{ background: color + '22' }}>
        <span className="text-2xl" style={{ color }}>{icon}</span>
      </div>
      <div>
        <div className="text-lg font-bold text-gray-800">{value}</div>
        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
}

function AppStatusDonut() {
  const total = appStatusData.reduce((sum, d) => sum + d.value, 0) || 1;
  return (
    <div className="flex flex-col items-center justify-center w-full relative" style={{ minHeight: 220 }}>
      <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={appStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              label={false}
            >
              {appStatusData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-primary">{total}</span>
          <span className="text-xs text-gray-400">Total</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-4 items-center justify-center">
        {appStatusData.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: entry.color }}></span>
            <span className="text-sm text-gray-700">{entry.name}</span>
            <span className="text-xs text-gray-400">({entry.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <div className="font-bold text-primary mb-4 text-lg">Recent Activity</div>
      <ul className="space-y-4">
        {dummyData.recentActivity.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full mt-1" style={{ background: 'var(--primary)' }}></div>
            <div>
              <div className="text-gray-700 text-sm">{item.description}</div>
              <div className="text-xs text-gray-400">{new Date(item.date).toLocaleString()}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AssociationOwnerStats() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-extrabold text-primary mb-2">Welcome, Association Owner</h1>
      <div className="flex flex-wrap gap-6">
        <StatCard icon={<FaClipboardList />} label="Total Plans" value={dummyData.totalPlans} color="var(--primary)" />
        <StatCard icon={<FaTasks />} label="Active Plans" value={dummyData.activePlans} color="var(--secondary)" />
        <StatCard icon={<FaUserFriends />} label="Volunteers" value={dummyData.totalVolunteers} color="#10B981" />
        <StatCard icon={<FaRegStar />} label="Avg. Rating" value={dummyData.averageRating} color="#fbbf24" />
        <StatCard icon={<FaClipboardList />} label="Total Reviews" value={dummyData.totalReviews} color="#6366f1" />
      </div>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
        <div className="font-bold text-primary mb-2 text-lg">Applications Status</div>
        <AppStatusDonut />
      </div>
      <div className="flex flex-wrap gap-6">
        <StatCard icon={<FaClipboardList />} label="Plans This Month" value={dummyData.plansThisMonth} color="var(--primary)" />
        <StatCard icon={<FaClipboardList />} label="Applications This Month" value={dummyData.applicationsThisMonth} color="var(--secondary)" />
      </div>
      <Timeline />
    </div>
  );
} 