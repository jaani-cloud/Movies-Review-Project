import { ArrowLeft, Calendar } from "lucide-react";

export default function MovieDetailSkeleton() {
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

            <div className="relative z-50 min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white opacity-60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                    <div className="mb-6 inline-flex items-center gap-2 animate-pulse">
                        <ArrowLeft className="w-5 h-5 text-slate-700" />
                        <div className="h-4 w-28 bg-slate-700 rounded relative overflow-hidden">
                            <div className="absolute inset-0 shimmer-effect"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[500px_1fr] gap-6 lg:gap-8 xl:gap-12">
                        <div className="lg:sticky lg:top-12 lg:self-start">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[2/3] bg-slate-800 animate-pulse">
                                <div className="absolute inset-0 shimmer-effect"></div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="space-y-4 animate-pulse">
                                <div className="space-y-2">
                                    <div className="h-8 sm:h-10 bg-slate-700 rounded w-3/4 relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                    <div className="h-8 sm:h-10 bg-slate-700 rounded w-1/2 relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg">
                                        <Calendar className="w-4 h-4 text-slate-700" />
                                        <div className="h-4 w-16 bg-slate-700 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                    </div>
                                    <div className="h-8 w-24 bg-slate-800 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="h-4 bg-slate-700 rounded w-full relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                    <div className="h-4 bg-slate-700 rounded w-full relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                    <div className="h-4 bg-slate-700 rounded w-3/4 relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-2xl p-4 sm:p-6 border border-slate-800 animate-pulse">
                                <div className="space-y-4">
                                    <div className="flex justify-center">
                                        <div className="w-48 h-48 rounded-full bg-slate-700 relative overflow-hidden">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-6">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-slate-700 relative overflow-hidden">
                                                    <div className="absolute inset-0 shimmer-effect"></div>
                                                </div>
                                                <div className="h-4 w-16 bg-slate-700 rounded relative overflow-hidden">
                                                    <div className="absolute inset-0 shimmer-effect"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-2xl p-4 sm:p-6 border border-slate-800 animate-pulse">
                                <div className="space-y-4">
                                    <div className="h-6 w-32 bg-slate-700 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex-1 h-10 bg-slate-700 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 shimmer-effect"></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="h-24 bg-slate-700 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                    <div className="h-10 w-32 bg-slate-700 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-2xl p-4 sm:p-6 border border-slate-800 animate-pulse">
                                <div className="space-y-4">
                                    <div className="h-6 w-40 bg-slate-700 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="p-4 bg-slate-800/50 rounded-lg space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-700 relative overflow-hidden">
                                                    <div className="absolute inset-0 shimmer-effect"></div>
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 w-32 bg-slate-700 rounded relative overflow-hidden">
                                                        <div className="absolute inset-0 shimmer-effect"></div>
                                                    </div>
                                                    <div className="h-3 w-20 bg-slate-700 rounded relative overflow-hidden">
                                                        <div className="absolute inset-0 shimmer-effect"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-3 w-full bg-slate-700 rounded relative overflow-hidden">
                                                    <div className="absolute inset-0 shimmer-effect"></div>
                                                </div>
                                                <div className="h-3 w-3/4 bg-slate-700 rounded relative overflow-hidden">
                                                    <div className="absolute inset-0 shimmer-effect"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}