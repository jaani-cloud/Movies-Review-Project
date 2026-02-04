import { useState } from 'react';
import { Film } from 'lucide-react';

export default function MovieCard({ movie }) {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="rounded-lg bg-slate-800 Poster-animate Group overflow-hidden">
            <div className="aspect-[2/3] w-full overflow-hidden rounded-t-lg bg-slate-700 relative">
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {imageError ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-700 text-gray-400">
                        <Film size={48} className="mb-2 opacity-50" />
                        <span className="text-xs">Image unavailable</span>
                    </div>
                ) : (
                    <img
                        src={movie.poster}
                        alt={`${movie.name} movie poster`}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        onError={() => {
                            setImageError(true);
                            setImageLoaded(true);
                        }}
                        className={`object-cover w-full h-full rounded-t-lg transition-all duration-300 hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                )}
            </div>
            <h3 className="p-2 sm:p-3 text-sm sm:text-base text-white transition-all duration-300 overflow-hidden whitespace-nowrap">
                <span className="inline-block Hover-scroll">
                    {movie.name}
                </span>
            </h3>
        </div>
    );
}