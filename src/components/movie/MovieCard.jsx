export default function MovieCard({ movie }) {
    return (
        <div className="rounded-lg bg-slate-800 Poster-animate Group">
            <img
                src={movie.poster} alt=""
                className="object-cover w-full rounded-t-lg h-[350px]"
            />
            <h3 className="p-2 text-white transition-all duration-300 overflow-hidden whitespace-nowrap">
                <span className="inline-block Hover-scroll">
                    {movie.name}
                </span>
            </h3>
        </div>
    )
};
