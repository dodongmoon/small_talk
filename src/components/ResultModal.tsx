import React from 'react';
import type { Evaluation } from '../types';
import { X } from 'lucide-react';

interface ResultModalProps {
    evaluation: Evaluation;
    onRestart: () => void;
    onClose: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({ evaluation, onRestart, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-6 space-y-6">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold text-gray-800">피드백 리포트</h2>
                        <p className="text-gray-500 text-sm">{evaluation.summary}</p>
                    </div>

                    <div className="space-y-4">
                        <ScoreItem label="전달력" score={evaluation.scores.clarity} color="blue" />
                        <ScoreItem label="상황 적합도" score={evaluation.scores.appropriateness} color="purple" />
                        <ScoreItem label="대화 이어가기" score={evaluation.scores.continuation} color="green" />
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            💡 더 나은 답변 예시
                        </h3>
                        <ul className="space-y-2">
                            {evaluation.betterExamples.map((ex, idx) => (
                                <li key={idx} className="text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                    "{ex}"
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        onClick={onRestart}
                        className="w-full py-3.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
                    >
                        다시 연습하기
                    </button>
                </div>
            </div>
        </div>
    );
};

const ScoreItem = ({ label, score, color }: { label: string; score: number; color: 'blue' | 'purple' | 'green' }) => {
    const colors = {
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        green: 'bg-green-500',
    };

    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-600">{label}</span>
                <span className="text-gray-900">{score}/5</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full ${colors[color]} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${(score / 5) * 100}%` }}
                />
            </div>
        </div>
    );
};
