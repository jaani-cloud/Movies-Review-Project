export default function LoadingButton({ isLoading, children, ...props }) {
    return (
        <button
            {...props}
            disabled={isLoading}
            className={`Form-btn ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
                    Processing...
                </span>
            ) : children}
        </button>
    );
}