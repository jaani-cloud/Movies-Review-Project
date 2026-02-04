import { Film, Sparkles, TrendingUp } from "lucide-react";

export default function HomePageSkeleton() {
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

            <div className="relative z-50 min-h-screen bg-gradient-to-b from-black via-slate-950 to-black opacity-60">
                <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800">
                    <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
                        <div className="flex items-center gap-2 animate-pulse">
                            <div className="w-8 h-8 bg-slate-700 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 shimmer-effect"></div>
                            </div>
                            <div className="h-6 w-32 bg-slate-700 rounded relative overflow-hidden hidden sm:block">
                                <div className="absolute inset-0 shimmer-effect"></div>
                            </div>
                        </div>

                        <div className="flex-1 max-w-md mx-4 animate-pulse">
                            <div className="h-10 bg-slate-800 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 shimmer-effect"></div>
                            </div>
                        </div>

                        <div className="w-10 h-10 bg-slate-700 rounded-full animate-pulse relative overflow-hidden">
                            <div className="absolute inset-0 shimmer-effect"></div>
                        </div>
                    </div>
                </nav>

                <main className="pt-16 sm:pt-20">
                    <div className="sm:flex sm:gap-6 lg:gap-8">
                        <div className="sm:flex-1 lg:mr-[21rem]">
                            <div className="sticky top-16 sm:top-20 z-10 bg-gradient-to-b from-black via-black/95 to-transparent pb-4 backdrop-blur-sm">
                                <div className="flex flex-wrap gap-2 sm:gap-3 p-3 sm:p-4 animate-pulse">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div
                                            key={i}
                                            className="h-9 w-20 bg-slate-700 rounded-lg relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="px-3 sm:px-4 pb-8">
                                <div className="mb-6 sm:mb-8 animate-pulse">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2">
                                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                                        </div>
                                        <div className="h-8 w-40 bg-slate-700 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-slate-700" />
                                        <div className="h-4 w-32 bg-slate-700 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6">
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="rounded-lg bg-slate-800 overflow-hidden animate-pulse"
                                            style={{
                                                animationDelay: `${index * 50}ms`,
                                            }}
                                        >
                                            <div className="aspect-[2/3] w-full bg-slate-700 relative overflow-hidden">
                                                <div className="absolute inset-0 shimmer-effect"></div>
                                            </div>
                                            <div className="p-2 sm:p-3">
                                                <div className="h-4 sm:h-5 bg-slate-700 rounded w-3/4 relative overflow-hidden">
                                                    <div className="absolute inset-0 shimmer-effect"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <aside className="hidden lg:block fixed right-0 top-16 sm:top-20 w-80 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] bg-slate-900/50 border-l border-slate-800 backdrop-blur-sm overflow-y-auto p-4">
                            <div className="space-y-4 animate-pulse">
                                <div className="h-7 w-40 bg-slate-700 rounded mb-4 relative overflow-hidden">
                                    <div className="absolute inset-0 shimmer-effect"></div>
                                </div>

                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex gap-3 p-3 bg-slate-800 rounded-lg relative overflow-hidden">
                                        <div className="w-16 h-20 bg-slate-700 rounded relative overflow-hidden flex-shrink-0">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-slate-700 rounded w-full relative overflow-hidden">
                                                <div className="absolute inset-0 shimmer-effect"></div>
                                            </div>
                                            <div className="h-3 bg-slate-700 rounded w-3/4 relative overflow-hidden">
                                                <div className="absolute inset-0 shimmer-effect"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </>
    );
}