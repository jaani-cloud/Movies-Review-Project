import { IMAGES } from "../../constants/apiConfig";

export default function SuccessMessage({ message, subMessage }) {
    return (
        <div className="p-6 mb-4 text-center text-green-400 bg-slate-900 rounded-lg">
            <div className="flex justify-center mb-3 items-end">
                <img
                    src={IMAGES.EMAIL_VERIFIED}
                    className="object-cover object-center w-20 h-20 rounded-full animate-bounce mt-4"
                />
            </div>
            <p className="text-xl font-bold">{message}</p>
            {subMessage && <p className="text-sm text-slate-300">{subMessage}</p>}
        </div>
    );
}