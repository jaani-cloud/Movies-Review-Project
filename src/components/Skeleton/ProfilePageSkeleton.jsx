import { Instagram, Youtube, Mail, Calendar, User } from "lucide-react";

export default function ProfilePageSkeleton() {
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

            <div className="relative z-50 min-h-screen bg-black pt-20 pb-12 px-4 sm:px-6 lg:px-8 opacity-60">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 animate-pulse">
                        <div className="h-9 sm:h-10 bg-slate-800 rounded w-48 mb-2 relative overflow-hidden">
                            <div className="absolute inset-0 shimmer-effect"></div>
                        </div>
                        <div className="h-5 bg-slate-800 rounded w-64 relative overflow-hidden">
                            <div className="absolute inset-0 shimmer-effect"></div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
                        <div className="relative h-32 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 animate-pulse">
                            <div className="absolute -bottom-16 left-6 sm:left-8">
                                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-slate-900 bg-slate-700 relative overflow-hidden">
                                    <div className="absolute inset-0 shimmer-effect"></div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-20 px-6 sm:px-8 pb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 animate-pulse">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Mail size={16} className="text-slate-700" />
                                        <div className="h-4 bg-slate-700 rounded w-16 relative overflow-hidden">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                    </div>
                                    <div className="h-12 bg-slate-800/50 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                </div>

                                <div className="space-y-2 animate-pulse">
                                    <div className="flex items-center gap-2 mb-2">
                                        <User size={16} className="text-slate-700" />
                                        <div className="h-4 bg-slate-700 rounded w-20 relative overflow-hidden">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                    </div>
                                    <div className="h-12 bg-slate-800/50 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                </div>

                                <div className="space-y-2 animate-pulse">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar size={16} className="text-slate-700" />
                                        <div className="h-4 bg-slate-700 rounded w-24 relative overflow-hidden">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                    </div>
                                    <div className="h-12 bg-slate-800/50 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                </div>

                                <div className="space-y-2 animate-pulse">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Instagram size={16} className="text-slate-700" />
                                        <div className="h-4 bg-slate-700 rounded w-20 relative overflow-hidden">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                    </div>
                                    <div className="h-12 bg-slate-800/50 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                </div>

                                <div className="space-y-2 md:col-span-2 animate-pulse">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Youtube size={16} className="text-slate-700" />
                                        <div className="h-4 bg-slate-700 rounded w-20 relative overflow-hidden">
                                            <div className="absolute inset-0 shimmer-effect"></div>
                                        </div>
                                    </div>
                                    <div className="h-12 bg-slate-800/50 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 shimmer-effect"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8 animate-pulse">
                                <div className="h-12 w-32 bg-slate-700 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 shimmer-effect"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 animate-pulse">
                        <div className="h-8 bg-slate-800 rounded w-40 mb-4 relative overflow-hidden">
                            <div className="absolute inset-0 shimmer-effect"></div>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-slate-800 rounded-lg p-4 relative overflow-hidden">
                                    <div className="absolute inset-0 shimmer-effect"></div>
                                    <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}