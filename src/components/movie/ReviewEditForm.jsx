import { useState } from 'react';

export default function ReviewEditForm({ review, onSave, onCancel }) {
    const [editType, setEditType] = useState(review.type);
    const [editComment, setEditComment] = useState(review.comment);

    const handleSave = () => {
        onSave(review.id, { type: editType, comment: editComment });
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Review Type</label>
                <select
                    className='w-full bg-slate-800 text-white p-3 border-2 border-slate-700 rounded-lg focus:border-red-500 focus:outline-none'
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                >
                    <option value="Skip">Skip</option>
                    <option value="Time Pass">Time Pass</option>
                    <option value="Go For It">Go For It</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Comment</label>
                <textarea
                    className='w-full bg-slate-800 text-white border-2 rounded-lg p-3 border-slate-700 focus:border-red-500 focus:outline-none h-24 resize-none'
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    placeholder="Update your thoughts..."
                />
            </div>

            <div className="flex gap-2">
                <button
                    className='flex-1 sm:flex-none bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 font-semibold transition-colors'
                    onClick={handleSave}
                >
                    Save Changes
                </button>
                <button
                    className='flex-1 sm:flex-none bg-slate-700 px-6 py-2 rounded-lg font-semibold hover:bg-slate-600 transition-colors'
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}