export default function ErrorMessage({ message, onClose }) {
    if (!message) return null;

    return (
        <div className="flex items-center justify-between p-4 mb-4 text-red-400 border border-red-800 rounded-lg bg-red-900/30">
            <span>{message}</span>
            {onClose && (
                <button onClick={onClose} className="ml-4 text-red-300 hover:text-red-100">✕</button>
            )}
        </div>
    );
}