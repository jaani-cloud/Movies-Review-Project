import { PieChart, Pie, Cell } from "recharts";

export default function ReviewGauge({ reviewData }) {
    const totalReviews = reviewData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div>
            <h3 className="text-xl font-semibold mb-3">Reviews</h3>

            <div className="relative Animate-fadeInUp">
                <PieChart width={400} height={250}>
                    <Pie
                        data={reviewData}
                        dataKey="value"
                        cx={200}
                        cy={180}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={80}
                        outerRadius={120}
                    >
                        {reviewData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                stroke="#1e293b"
                                strokeWidth={3}
                            />
                        ))}
                    </Pie>
                </PieChart>

                <div className="absolute top-40  left-[208px] -translate-x-1/2 text-center">
                    <p className="text-slate-400 text-sm mb-2">Total Reviews: {totalReviews}</p>
                    <div className="flex gap-4">
                        {reviewData.map((item) => (
                            <div key={item.label}>
                                <p className="text-xl font-bold" style={{ color: item.color }}>
                                    {item.value}
                                </p>
                                <p className="text-xs text-slate-500">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}