import { RadialBarChart, RadialBar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface RadialBarData {
  name: string;
  value: number;
}

export function StatsRadialBarChart({ data, dataKey, title }: { data: RadialBarData[]; dataKey: string; title: string }) {
  // Assume the first data point is the value, the second is the max
  const value = data[0]?.value ?? 0;
  const max = data[1]?.value ?? 5;
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center relative" style={{ minHeight: 240 }}>
      <h3 className="font-semibold mb-2 text-primary text-lg">{title}</h3>
      <div className="relative w-full flex justify-center items-center" style={{ height: 180 }}>
        <ResponsiveContainer width={180} height={180}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={30}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            {/* Background track */}
            <RadialBar
              dataKey="value"
              data={[{ name: 'Max', value: max }]}
              cornerRadius={30}
              fill="#e5e7eb" // Tailwind gray-200
              background={false}
            />
            {/* Value arc with gradient */}
            <defs>
              <linearGradient id="circleGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--secondary)" />
              </linearGradient>
            </defs>
            <RadialBar
              dataKey={dataKey}
              cornerRadius={30}
              fill="url(#circleGradient)"
              background={false}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        {/* Center value label */}
        <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-primary">{value}</span>
          <span className="text-xs text-gray-400">/ {max}</span>
        </div>
      </div>
    </div>
  );
}

export function UserDistributionCircleChart({ data, title }: { data: { name: string; value: number; color: string }[]; title: string }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center relative" style={{ minHeight: 240 }}>
      <h3 className="font-semibold mb-2 text-primary text-lg">{title}</h3>
      <div className="relative w-full flex justify-center items-center" style={{ height: 180 }}>
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={data}
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
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center total label */}
        <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-primary">{total}</span>
          <span className="text-xs text-gray-400">Total Users</span>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        {data.map((entry) => (
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
