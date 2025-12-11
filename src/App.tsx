import { useState, useEffect, useRef } from 'react';
import type { Message, ChatState } from './types';
import { generateScenario } from './services/scenarioService';
import { generateFirstMessage, generateReply, evaluateConversation } from './services/geminiService';
import { ScenarioHeader } from './components/ScenarioHeader';
import { ChatWindow } from './components/ChatWindow';
import { InputArea } from './components/InputArea';
import { ResultModal } from './components/ResultModal';
import { LandingPage } from './components/LandingPage';

function App() {
  const [started, setStarted] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [state, setState] = useState<ChatState>({
    scenario: null,
    messages: [],
    userTurnCount: 0,
    isFinished: false,
    evaluation: null,
    isLoading: false,
  });

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const handleStart = async () => {
    const scenario = generateScenario();
    setStarted(true);
    setIsResultOpen(false);
    setState(prev => ({
      ...prev,
      scenario,
      messages: [],
      userTurnCount: 0,
      isFinished: false,
      evaluation: null,
      isLoading: true,
    }));

    try {
      const firstMsg = await generateFirstMessage(scenario);
      setState(prev => ({
        ...prev,
        messages: [{ role: 'ai', content: firstMsg }],
        isLoading: false,
      }));
    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.message || 'Unknown error';
      alert(`AI 연결에 실패했습니다.\n오류 내용: ${errorMessage}\n\nAPI Key가 올바른지, 또는 .env 파일이 루트 경로에 있는지 확인해주세요.`);
      setStarted(false);
    }
  };

  const handleSend = async (text: string) => {
    if (!state.scenario) return;

    const newMessages: Message[] = [...state.messages, { role: 'user', content: text }];
    const newTurnCount = state.userTurnCount + 1;

    setState(prev => ({
      ...prev,
      messages: newMessages,
      userTurnCount: newTurnCount,
      isLoading: true,
    }));

    if (newTurnCount >= 3) {
      // End of round, evaluate
      try {
        const evaluation = await evaluateConversation(state.scenario, newMessages);
        setState(prev => ({
          ...prev,
          isLoading: false,
          isFinished: true,
          evaluation,
        }));
        setIsResultOpen(true);
      } catch (error) {
        console.error(error);
        alert('평가 중 오류가 발생했습니다.');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      // Continue conversation
      try {
        const reply = await generateReply(state.scenario, newMessages);
        setState(prev => ({
          ...prev,
          messages: [...newMessages, { role: 'ai', content: reply }],
          isLoading: false,
        }));
      } catch (error) {
        console.error(error);
        alert('답변 생성 중 오류가 발생했습니다.');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    }
  };

  if (!started) {
    return <LandingPage onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {state.scenario && <ScenarioHeader scenario={state.scenario} />}

      <ChatWindow messages={state.messages} isLoading={state.isLoading} />

      <InputArea
        onSend={handleSend}
        disabled={state.isLoading || state.isFinished}
        isFinished={state.isFinished}
        onRestart={handleStart}
      />

      {state.evaluation && isResultOpen && (
        <ResultModal
          evaluation={state.evaluation}
          onRestart={handleStart}
          onClose={() => setIsResultOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
