import { Search } from "lucide-react";

export default function ManageMoviesSkeleton() {
    return (
        <>
            <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm">
                <div className="w-64 mb-4">
                    <div className="h-2 bg-gray-900/80 rounded-full overflow-hidden shadow-inner">
                        <div
                            className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 transition-all duration-300 ease-out shadow-lg shadow-blue-500/50 animate-progress"
                            style={{ width: '95%' }}
                        ></div>
                    </div>
                </div>
                <p className="text-white text-lg font-semibold mb-1">95%</p>
                <p className="text-gray-500 text-sm">Loading...</p>
            </div>

            <div className="relative z-50 ctm-manage-movies opacity-60">
                <div className="ctm-manage-header animate-pulse">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-700 rounded relative overflow-hidden">
                            <div className="absolute inset-0 shimmer-effect"></div>
                        </div>
                        <div className="h-8 w-48 bg-slate-700 rounded relative overflow-hidden">
                            <div className="absolute inset-0 shimmer-effect"></div>
                        </div>
                    </div>
                    <div className="h-12 w-56 bg-slate-700 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 shimmer-effect"></div>
                    </div>
                </div>

                <div className="ctm-search-container animate-pulse">
                    <Search className="ctm-search-icon text-slate-700" />
                    <div className="ctm-search-input h-12 bg-slate-800 relative overflow-hidden">
                        <div className="absolute inset-0 shimmer-effect"></div>
                    </div>
                </div>

                <div className="ctm-movies-list">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="ctm-movie-item animate-pulse"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="ctm-movie-view">
                                <div className="ctm-movie-poster-wrapper">
                                    <div className="ctm-movie-poster bg-slate-700 relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                </div>
                                <div className="ctm-movie-info">
                                    <div className="h-6 w-3/4 bg-slate-700 rounded mb-3 relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                    <div className="ctm-movie-meta mb-3">
                                        <div className="h-6 w-24 bg-slate-700 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                        <div className="h-6 w-28 bg-slate-700 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                    </div>
                                    <div className="h-6 w-48 bg-slate-700 rounded mb-4 relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                    <div className="ctm-movie-actions">
                                        <div className="h-10 w-24 bg-slate-700 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                        <div className="h-10 w-28 bg-slate-700 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}