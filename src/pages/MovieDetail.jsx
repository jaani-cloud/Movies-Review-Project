import { useParams } from "react-router-dom";
import { movies } from "../data/Movies";
import { PieChart, Pie, Cell } from "recharts";

export default function MovieDetail() {
    const { id } = useParams();
    const movie = movies.find((m) => m.id === parseInt(id));

    const reviewData = [
        { label: "Skip", value: 16, color: "#ff0000" },
        { label: "Timepass", value: 46, color: "#ffff00" },
        { label: "Go for it", value: 88, color: "#00ff00" }
    ];

    return (
        <div className="min-h-screen p-8 text-white bg-black">
            <div className="flex gap-8">

                <div className="w-[800px]">
                    <img src={movie.poster} alt=""
                        className="w-full rounded-lg shadow-2xl"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="mb-4 text-5xl font-bold">{movie.name}</h1>
                    <p className="mb-2 text-lg text-slate-400">{movie.releaseYear}</p>
                    <p className="mb-4 capitalize text-slate-500">{movie.genre.join(" • ")}</p>
                    <p className="text-lg leading-relaxed text-slate-300">{movie.description}</p>

                    <div>
                        <h3 className="mb-3 text-lg font-semibold">Reviews</h3>

                        <div className="relative animate-fadeInUp">
                            <PieChart width={400} height={250}>
                                <Pie
                                    data={reviewData}
                                    dataKey="value"
                                    cx={200}
                                    cy={120}
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={80}
                                    outerRadius={120}
                                >
                                    {reviewData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="black" strokeWidth={3} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <div className="absolute mt-4 top-20 left-28">
                                <p className="mb-3 text-center text-slate-400">Total Reviews: 150</p>
                                <div className="flex justify-center gap-6">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-[#ff0000]">16</p>
                                        <p className="text-sm text-slate-500">Skip</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-[#ffff00]">46</p>
                                        <p className="text-sm text-slate-500">Time Pass</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-[#00ff00]">88</p>
                                        <p className="text-sm text-slate-500">Go For It</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}