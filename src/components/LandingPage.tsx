import React from 'react';
import { MessageCircle, Zap, Award, ArrowRight } from 'lucide-react';

interface LandingPageProps {
    onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white pt-20 pb-32">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
                    <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-gray-600">AI Powered Smalltalk Coach</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                        어색한 침묵,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            스몰토크 스파링
                        </span>으로 격파.
                    </h1>

                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed">
                        랜덤한 상황에서 3턴 동안 대화를 이어가보세요.<br className="hidden sm:block" />
                        AI 코치가 당신의 순발력과 센스를 실시간으로 평가해드립니다.
                    </p>

                    <div className="flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        <button
                            onClick={onStart}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition-all shadow-xl shadow-blue-900/10 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1 overflow-hidden"
                        >
                            <span className="relative z-10">지금 바로 연습하기</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Feature Highlights */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <FeatureCard
                            icon={<Zap className="w-6 h-6 text-yellow-500" />}
                            title="랜덤 시나리오"
                            description="엘리베이터, 카페, 면접장 등 예측 불가능한 100+ 상황에서 순발력을 기르세요."
                            delay={0}
                        />
                        <FeatureCard
                            icon={<MessageCircle className="w-6 h-6 text-blue-500" />}
                            title="3턴 스파링"
                            description="딱 3번의 대화로 승부합니다. 짧고 굵게 핵심만 연습하는 효율적인 루틴."
                            delay={100}
                        />
                        <FeatureCard
                            icon={<Award className="w-6 h-6 text-purple-500" />}
                            title="AI 정밀 코칭"
                            description="AI가 당신의 답변을 분석하고, 더 나은 표현을 즉시 제안합니다."
                            delay={200}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
                    <p>© 2025 Smalltalk Sparring. Powered by Dongmoon.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
    <div
        className="flex flex-col items-center text-center p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
);
