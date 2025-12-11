export interface Scenario {
    place: string;
    partner: string;
    situation: string;
}

export interface Message {
    role: 'user' | 'ai';
    content: string;
}

export interface EvaluationScores {
    clarity: number;
    appropriateness: number;
    continuation: number;
}

export interface Evaluation {
    scores: EvaluationScores;
    summary: string;
    betterExamples: string[];
}

export interface ChatState {
    scenario: Scenario | null;
    messages: Message[];
    userTurnCount: number;
    isFinished: boolean;
    evaluation: Evaluation | null;
    isLoading: boolean;
}
