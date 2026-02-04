import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ReviewGauge({ reviewData }) {
    const totalReviews = reviewData.reduce((sum, item) => sum + item.value, 0);

    const COLORS = {
        red: '#ef4444',
        yellow: '#eab308',
        green: '#22c55e'
    };

    return (
        <div className="w-full">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white">Audience Reviews</h3>

            <div className="relative w-full max-w-md mx-auto">
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                            data={reviewData}
                            dataKey="value"
                            cx="50%"
                            cy="70%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius="60%"
                            outerRadius="85%"
                        >
                            {reviewData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[entry.color]}
                                    stroke="#0f172a"
                                    strokeWidth={3}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center w-full px-4">
                    <p className="text-gray-400 text-sm mb-4">Total Reviews: <span className="font-semibold text-white">{totalReviews}</span></p>
                    <div className="flex justify-center gap-4 sm:gap-6">
                        {reviewData.map((item) => (
                            <div key={item.label} className="text-center">
                                <p className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: COLORS[item.color] }}>
                                    {item.value}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
                {reviewData.map((item) => (
                    <div
                        key={item.label}
                        className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[item.color] }}
                            ></div>
                            <p className="text-xs text-gray-400">{item.label}</p>
                        </div>
                        <p className="text-lg font-bold text-white">{item.value}</p>
                        <p className="text-xs text-gray-500">
                            {totalReviews > 0 ? Math.round((item.value / totalReviews) * 100) : 0}%
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}