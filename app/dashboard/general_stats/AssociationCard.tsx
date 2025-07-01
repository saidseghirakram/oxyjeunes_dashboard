"use client";
export default function AssociationCard({ name, averageRating, totalReviews }: { name: string; averageRating: number; totalReviews: number }) {
  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow p-4 w-full max-w-xs mx-auto">
      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-2" style={{ background: "var(--primary)" }}>
        {/* Placeholder for image */}
        <span>{name[0]}</span>
      </div>
      <div className="text-center">
        <div className="font-semibold text-gray-800">{name}</div>
        <div className="text-sm text-gray-500">Rating: <span className="font-bold text-primary">{averageRating}</span></div>
        <div className="text-xs text-gray-400">{totalReviews} reviews</div>
      </div>
    </div>
  );
} 