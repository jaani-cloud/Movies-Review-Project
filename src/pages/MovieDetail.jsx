import { useParams } from "react-router-dom";
import { movies } from "../data/Movies";

import ReviewGauge from "../components/movie/ReviewGauge"
import { formatGenres } from "../utils/formatters";

export default function MovieDetail() {
    const { id } = useParams();
    const movie = movies.find((m) => m.id === parseInt(id));

    const reviewData = [
        { label: "Skip", value: 16, color: "red" },
        { label: "Timepass", value: 46, color: "yellow" },
        { label: "Go for it", value: 88, color: "green" }
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
                    <p className="mb-4 capitalize text-slate-500">{formatGenres(movie.genre)}</p>
                    <p className="text-lg leading-relaxed text-slate-300">{movie.description}</p>

                    <ReviewGauge reviewData={reviewData} />
                </div>
            </div>
        </div>
    );
}