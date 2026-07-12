import { useState, useEffect, useRef } from 'react';

const PLANNER_BASE_URL = '/api/v1';
const USER_ID = 'u_123';
const CUSTOMER_ID = 'c_456';

export default function PlannerChat() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [discoveryState, setDiscoveryState] = useState({ stage: null, question: null });
  const [generationStatus, setGenerationStatus] = useState(null);
  const [isDone, setIsDone] = useState(false);
  
  const messagesEndRef = useRef(null);
  const pollingRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, generationStatus]);

  // Start Session on Mount
  useEffect(() => {
    const startSession = async () => {
      try {
        const response = await fetch(`${PLANNER_BASE_URL}/session/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: USER_ID, customer_id: CUSTOMER_ID })
        });
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setSessionId(data.session_id);
        setMessages([{ role: 'agent', content: data.message }]);
      } catch (error) {
        console.error("Failed to start session. Ensure backend is running.", error);
        // Fallback for UI testing if backend is dead
        setMessages([{ role: 'agent', content: "Backend offline. Mock mode active. What do you need?" }]);
        setSessionId("mock-session");
      }
    };
    startSession();

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const pollDiscovery = async (sid) => {
    try {
      const res = await fetch(`${PLANNER_BASE_URL}/session/${sid}/discovery`);
      const data = await res.json();

      if (data.done) {
        setIsDone(true);
        setIsGenerating(false);
        setGenerationStatus("Design generation completed!");
        if (pollingRef.current) clearInterval(pollingRef.current);
        return;
      }

      if (data.user_facing_stage_message) {
        setGenerationStatus(data.user_facing_stage_message);
      }

      if (data.question) {
        setDiscoveryState({ stage: data.stage, question: data.question });
        setMessages(prev => {
          // avoid duplicate consecutive questions
          const lastMsg = prev[prev.length - 1];
          if (lastMsg && lastMsg.role === 'agent' && lastMsg.content === data.question) {
            return prev;
          }
          return [...prev, { role: 'agent', content: data.question }];
        });
      }
    } catch (error) {
      console.error("Polling error", error);
    }
  };

  const startPolling = (sid) => {
    setIsGenerating(true);
    pollDiscovery(sid);
    pollingRef.current = setInterval(() => pollDiscovery(sid), 5000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !sessionId) return;

    const userMessage = inputText.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputText('');

    try {
      if (isGenerating) {
        // Discovery Answer
        await fetch(`${PLANNER_BASE_URL}/session/${sessionId}/discovery/answer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_id: CUSTOMER_ID,
            stage: discoveryState.stage,
            question: discoveryState.question,
            answer: userMessage
          })
        });
      } else {
        // Normal Chat Turn
        const res = await fetch(`${PLANNER_BASE_URL}/session/${sessionId}/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: USER_ID,
            customer_id: CUSTOMER_ID,
            message: userMessage
          })
        });
        
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}: ${res.statusText}`);
        }
        
        const data = await res.json();
        
        setMessages(prev => [...prev, { role: 'agent', content: data.message }]);
        
        if (data.type === 'brief_ready') {
          startPolling(sessionId);
        }
      }
    } catch (error) {
      console.error("Failed to send message", error);
      setMessages(prev => [...prev, { role: 'error', content: "Failed to send message." }]);
    }
  };

  const handleCancel = async () => {
    if (!sessionId) return;
    try {
      await fetch(`${PLANNER_BASE_URL}/session/${sessionId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: USER_ID })
      });
      setIsGenerating(false);
      setGenerationStatus("Generation cancelled.");
      if (pollingRef.current) clearInterval(pollingRef.current);
    } catch (error) {
      console.error("Failed to cancel", error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden min-h-0 lg:w-[420px] lg:max-w-[420px] lg:shrink-0 lg:border-l lg:border-zinc-900">
      
      <div className="hidden md:block border-b border-zinc-900 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-2">
            Planner Agent
            {isGenerating && <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>}
          </h2>
          {isGenerating && (
            <button 
              onClick={handleCancel}
              className="text-xs bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded"
            >
              Stop
            </button>
          )}
        </div>
        
        {generationStatus && (
          <div className="mt-2 text-xs text-zinc-400">
            {generationStatus}
          </div>
        )}

        <div className="mt-4 flex min-w-0 gap-3">
          <button className="shrink-0 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm hover:border-zinc-600">            
            Upload DXF
          </button>
          <button className="shrink-0 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm hover:border-zinc-600">            
            Upload CAD
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`max-w-[90%] break-words rounded-2xl p-4 text-sm ${
              msg.role === 'user' 
                ? 'ml-auto bg-violet-600' 
                : msg.role === 'error'
                ? 'bg-red-900/50 text-red-200 border border-red-800'
                : 'bg-zinc-900'
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-zinc-900 p-4">
        <form onSubmit={handleSendMessage} className="flex min-w-0 gap-2">
          <button
            type="button"
            className="shrink-0 rounded-xl border border-zinc-800 bg-zinc-900 px-3 hover:border-zinc-600"
          >
            📎
          </button>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isDone}
            placeholder={isDone ? "Session completed" : "Message planner..."}
            className="min-w-0 flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-zinc-600 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isDone || !inputText.trim()}
            className="shrink-0 rounded-xl border border-zinc-700 px-4 hover:border-zinc-500 disabled:opacity-50"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}