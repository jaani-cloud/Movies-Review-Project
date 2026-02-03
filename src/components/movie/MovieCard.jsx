export default function MovieCard({ movie }) {
    return (
        <div className="rounded-lg bg-slate-800 Poster-animate Group overflow-hidden">
            <div className="aspect-[2/3] w-full overflow-hidden rounded-t-lg">
            <img
                src={movie.poster} alt=""
                className="object-cover w-full h-full rounded-t-lg transition-transform duration-300 hover:scale-105"
            />
            </div>
            <h3 className="p-2 sm:p-3 text-sm sm:text-base text-white transition-all duration-300 overflow-hidden whitespace-nowrap">
                <span className="inline-block Hover-scroll">
                    {movie.name}
                </span>
            </h3>
        </div>
    )
};
