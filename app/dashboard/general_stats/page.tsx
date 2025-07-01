"use client";
import { StatsRadialBarChart, UserDistributionCircleChart } from "./StatsChart";
import { ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const stats = {
  totalUsers: 19,
  userGrowth: { thisMonth: 19, thisWeek: 19 },
  userDistribution: { volunteers: 5, associationOwners: 12 },
  pendingAssociations: 0,
  approvedAssociations: 0,
  associationApprovalRate: 0,
  totalPlans: 10,
  activePlans: 10,
  plansByCategory: [
    { categoryName: "Environment", count: 3 },
    { categoryName: "Education", count: 1 },
    { categoryName: "Health", count: 1 },
    { categoryName: "Animal Welfare", count: 1 },
    { categoryName: "Technology", count: 1 },
    { categoryName: "Youth Development", count: 1 },
    { categoryName: "Elderly Care", count: 1 },
    { categoryName: "Disaster Relief", count: 1 },
  ],
  topRatedAssociations: [
    { id: "6a42d6c3-6600-42d8-84ab-c8582a0fa253", name: "Youth Education Foundation", averageRating: 4.9, totalReviews: 1 },
    { id: "5473aee4-0f09-4e75-95bb-adb7f08cbf2b", name: "Cultural Heritage Society", averageRating: 4.7, totalReviews: 1 },
    { id: "918010c7-c3a6-4f72-9336-e5a4198c6f58", name: "Community Health Alliance", averageRating: 4.5, totalReviews: 1 },
    { id: "31a03f2a-f235-4a8f-9f47-16b9e4049dff", name: "Disaster Relief Team", averageRating: 4.4, totalReviews: 1 },
    { id: "7b751811-7d5b-4b24-a045-01a884acc1ab", name: "Animal Rescue Network", averageRating: 4.2, totalReviews: 1 },
  ],
  bottomRatedAssociations: [
    { id: "a9787ede-9c8d-4328-93f1-fabdb6b58a19", name: "Social Justice Collective", averageRating: 3.7, totalReviews: 1 },
    { id: "e8c874b2-26ee-4327-9a7b-bef0db171e52", name: "Elderly Care Foundation", averageRating: 3.7, totalReviews: 1 },
    { id: "32edb2f0-2a31-49e4-942a-b32d1451086c", name: "Tech for Good", averageRating: 3.8, totalReviews: 1 },
    { id: "3ffa5cd8-a14b-4678-b028-b859611dbbce", name: "Green Earth Initiative", averageRating: 3.9, totalReviews: 1 },
    { id: "5ead7660-bb23-4616-b92b-735cc3f51290", name: "Sports for All", averageRating: 3.9, totalReviews: 1 },
  ],
  totalReviews: 10,
  averagePlatformRating: 4.17,
};

const plansStackedData = stats.plansByCategory.map(p => ({
  category: p.categoryName,
  active: Math.floor(p.count / 2),
  total: p.count,
}));

export default function GeneralStatsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-extrabold text-primary mb-2">General Stats</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-4xl font-bold text-primary">{stats.totalUsers}</div>
          <div className="text-gray-500 mt-2">Total Users</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-primary">{stats.userGrowth.thisMonth}</div>
          <div className="text-gray-500 mt-2">Users This Month</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-primary">{stats.userGrowth.thisWeek}</div>
          <div className="text-gray-500 mt-2">Users This Week</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatsRadialBarChart
          data={[
            { name: "Average Rating", value: stats.averagePlatformRating },
            { name: "Max", value: 5 },
          ]}
          dataKey="value"
          title="Average Platform Rating (out of 5)"
        />
        {/* Stacked Bar Chart for Plans */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <h3 className="font-semibold mb-2 text-primary text-lg">Active vs Total Plans by Category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={plansStackedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" stackId="a" fill="var(--primary)" />
              <Bar dataKey="active" stackId="a" fill="var(--secondary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* User Distribution Circle Chart (replaces Radar) */}
        <UserDistributionCircleChart
          data={[
            { name: "Volunteers", value: stats.userDistribution.volunteers, color: "var(--primary)" },
            { name: "Association Owners", value: stats.userDistribution.associationOwners, color: "var(--secondary)" },
          ]}
          title="User Distribution"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-primary">{stats.pendingAssociations}</div>
          <div className="text-gray-500 mt-2">Pending Associations</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-primary">{stats.approvedAssociations}</div>
          <div className="text-gray-500 mt-2">Approved Associations</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-primary">{stats.associationApprovalRate}%</div>
          <div className="text-gray-500 mt-2">Approval Rate</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-primary">{stats.totalPlans}</div>
          <div className="text-gray-500 mt-2">Total Plans</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-primary">{stats.activePlans}</div>
          <div className="text-gray-500 mt-2">Active Plans</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-primary">{stats.totalReviews}</div>
          <div className="text-gray-500 mt-2">Total Reviews</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-primary">{stats.averagePlatformRating}</div>
          <div className="text-gray-500 mt-2">Average Platform Rating</div>
        </div>
      </div>
    </div>
  );
} 