interface StatsCardProps {
  title: string;
  value: number;
}

export default function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl">
      <p className="text-white/50 text-sm tracking-wide">
        {title}
      </p>

      <h2 className="text-5xl font-semibold mt-4 text-white">
        {value}
      </h2>
    </div>
  );
}