import React from 'react';
import type { Scenario } from '../types';

interface ScenarioHeaderProps {
    scenario: Scenario;
}

export const ScenarioHeader: React.FC<ScenarioHeaderProps> = ({ scenario }) => {
    return (
        <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 p-4 sticky top-0 z-10">
            <div className="max-w-2xl mx-auto flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">Place</span>
                    {scenario.place}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full">Partner</span>
                    {scenario.partner}
                </div>
                <div className="text-lg font-bold text-gray-800 mt-1">
                    "{scenario.situation}"
                </div>
            </div>
        </div>
    );
};
