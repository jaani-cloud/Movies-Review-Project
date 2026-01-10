import { Search } from "lucide-react"

export default function Navbar({searchQuery, setSearchQuery}) {

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 p-4 text-white bg-slate-900 flex items-center gap-4">
            <h1>🎬 ReviewHub</h1>
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search here..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="Search w-full pl-10"
                />
            </div>
        </nav>
    )
};
