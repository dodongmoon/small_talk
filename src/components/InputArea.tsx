import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface InputAreaProps {
    onSend: (text: string) => void;
    disabled: boolean;
    isFinished?: boolean;
    onRestart?: () => void;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSend, disabled, isFinished, onRestart }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() && !disabled) {
            onSend(text.trim());
            setText('');
        }
    };

    if (isFinished && onRestart) {
        return (
            <div className="bg-white border-t border-gray-100 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={onRestart}
                        className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" />
                        새로운 대화 시작하기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border-t border-gray-100 p-4">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="답변을 입력하세요..."
                    disabled={disabled}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={disabled || !text.trim()}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-sm shadow-blue-200"
                >
                    전송
                </button>
            </form>
        </div>
    );
};
