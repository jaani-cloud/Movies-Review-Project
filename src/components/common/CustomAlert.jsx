import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

let showAlertFunction = null;

export const showAlert = (message, type = 'info') => {
    if (showAlertFunction) {
        showAlertFunction(message, type);
    }
};

export default function CustomAlert() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        showAlertFunction = (message, type) => {
            const id = Date.now();
            setAlerts(prev => [...prev, { id, message, type }]);

            setTimeout(() => {
                setAlerts(prev => prev.filter(alert => alert.id !== id));
            }, 4000);
        };

        return () => {
            showAlertFunction = null;
        };
    }, []);

    const removeAlert = (id) => {
        setAlerts(prev => prev.filter(alert => alert.id !== id));
    };

    const getAlertStyle = (type) => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-600',
                    border: 'border-green-500',
                    icon: CheckCircle
                };
            case 'error':
                return {
                    bg: 'bg-red-600',
                    border: 'border-red-500',
                    icon: AlertCircle
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-600',
                    border: 'border-yellow-500',
                    icon: AlertTriangle
                };
            default:
                return {
                    bg: 'bg-blue-600',
                    border: 'border-blue-500',
                    icon: Info
                };
        }
    };

    return (
        <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full px-4">
            {alerts.map((alert) => {
                const { bg, border, icon: Icon } = getAlertStyle(alert.type);

                return (
                    <div
                        key={alert.id}
                        className={`${bg} ${border} border-2 rounded-xl p-4 shadow-2xl backdrop-blur-sm animate-slideIn flex items-start gap-3`}
                    >
                        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="text-white text-sm flex-1 leading-relaxed">
                            {alert.message}
                        </p>
                        <button
                            onClick={() => removeAlert(alert.id)}
                            className="text-white/80 hover:text-white transition-colors flex-shrink-0"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                );
            })}

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}