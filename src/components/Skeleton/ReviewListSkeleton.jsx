export default function ReviewListSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-800/50 rounded-xl p-4 sm:p-5 border border-slate-700 animate-pulse">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700"></div>

                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-24 bg-slate-700 rounded"></div>
                                <div className="h-6 w-20 bg-slate-700 rounded-lg"></div>
                            </div>

                            <div className="h-3 w-32 bg-slate-700 rounded"></div>

                            <div className="space-y-2">
                                <div className="h-3 w-full bg-slate-700 rounded"></div>
                                <div className="h-3 w-3/4 bg-slate-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}