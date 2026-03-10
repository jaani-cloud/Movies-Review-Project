export default function LoadingSpinner({ fullScreen = true, size = "large" }) {
    const sizeClasses = {
        small: "w-6 h-6 border-2",
        medium: "w-10 h-10 border-3",
        large: "w-12 h-12 border-4"
    };

    const spinner = (
        <div className={`${sizeClasses[size]} border-blue-400 border-t-transparent rounded-full animate-spin`}></div>
    );

    if (fullScreen) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                {spinner}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-8">
            {spinner}
        </div>
    );
}