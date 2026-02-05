export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", cancelText = "Cancel" }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4 border border-slate-700 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-300 mb-6">{message}</p>

                <div className="flex gap-3">
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}