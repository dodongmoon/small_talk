import type { Scenario, Message, Evaluation } from '../types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const generateFirstMessage = async (scenario: Scenario): Promise<string> => {
  const prompt = `
    당신은 스몰토크 연습 파트너입니다.
    당신의 역할은 **${scenario.partner}**입니다.
    당신은 지금 **${scenario.place}**에 있습니다.
    현재 상황은 **${scenario.situation}**입니다.
    
    위 설정에 몰입하여 앞에 있는 사람(사용자)에게 먼저 말을 걸어주세요.
    
    [조건]
    - 당신이 ${scenario.partner}입니다. 사용자가 아닙니다.
    - 한국어로 자연스럽게 말하세요.
    - 딱 한 문장으로 짧게 시작하세요.
    - 상대방(사용자)이 대답하기 좋게 질문형이나 가벼운 인사가 좋습니다.
  `;

  try {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Failed to generate first message:', error);
    throw error;
  }
};

export const generateReply = async (scenario: Scenario, history: Message[]): Promise<string> => {
  const prompt = `
    당신은 스몰토크 연습 파트너입니다.
    당신의 역할은 **${scenario.partner}**입니다.
    당신은 지금 **${scenario.place}**에 있습니다.
    현재 상황은 **${scenario.situation}**입니다.
    
    주어진 상황과 대화 내역을 보고 적절한 답변을 해주세요.
    
    [대화 내역]
    ${history.map(msg => `${msg.role === 'user' ? '사용자(상대방)' : `나(${scenario.partner})`}: ${msg.content}`).join('\n')}
    
    [조건]
    - 당신이 ${scenario.partner}입니다. 
    - 한국어로 자연스럽게 대화를 이어가세요.
    - 상대방의 말에 공감하거나, 되묻거나, 자신의 이야기를 짧게 덧붙이세요.
    - 길지 않게 1~2문장으로 답변하세요.
  `;

  try {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Failed to generate reply:', error);
    throw error;
  }
};

export const evaluateConversation = async (scenario: Scenario, history: Message[]): Promise<Evaluation> => {
  const prompt = `
    사용자의 스몰토크 실력을 평가해주세요.
    
    [상황 정보]
    - 장소: ${scenario.place}
    - AI 역할: ${scenario.partner}
    - 상황: ${scenario.situation}
    
    [대화 내역]
    ${history.map(msg => `${msg.role === 'user' ? '사용자' : `AI(${scenario.partner})`}: ${msg.content}`).join('\n')}
    
    다음 JSON 형식으로 결과를 반환해주세요:
    {
      "scores": {
        "clarity": 1~5점,
        "appropriateness": 1~5점,
        "continuation": 1~5점
      },
      "summary": "전체적인 피드백 요약 (한글)",
      "betterExamples": ["더 나은 답변 예시 1", "더 나은 답변 예시 2"]
    }
  `;

  try {
    const response = await fetch(`${BACKEND_URL}/api/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to evaluate conversation:', error);
    throw error;
  }
};
