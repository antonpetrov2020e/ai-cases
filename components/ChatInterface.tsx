import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { ChatMessage, ChatRole } from '../types';
import { askGemini } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const ChatInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: ChatRole.MODEL, 
      text: "Привет! Я знаю всё об этих кейсах внедрения ИИ. Спросите меня о чем угодно, например: «Как ИИ помогает в юриспруденции?» или «Какие есть кейсы для малого бизнеса?»", 
      timestamp: Date.now() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: ChatRole.USER, text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await askGemini(input);
    
    const botMsg: ChatMessage = { role: ChatRole.MODEL, text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-indigo-600 hover:bg-indigo-700'
        } text-white flex items-center justify-center`}
        aria-label="Toggle Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 z-40 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 transition-all duration-300 transform origin-bottom-right flex flex-col ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        }`}
        style={{ maxHeight: 'calc(100vh - 120px)', height: '600px' }}
      >
        {/* Header */}
        <div className="bg-indigo-600 p-4 rounded-t-2xl flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
             <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">AI Ассистент</h3>
            <p className="text-indigo-200 text-xs">Экспертный анализ кейсов</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                msg.role === ChatRole.USER ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === ChatRole.USER ? 'bg-slate-200' : 'bg-indigo-100'
                }`}
              >
                {msg.role === ChatRole.USER ? (
                  <User className="w-4 h-4 text-slate-600" />
                ) : (
                  <Bot className="w-4 h-4 text-indigo-600" />
                )}
              </div>
              <div
                className={`p-3 rounded-2xl text-sm max-w-[80%] shadow-sm ${
                  msg.role === ChatRole.USER
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                {msg.role === ChatRole.USER ? (
                    msg.text
                ) : (
                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-strong:text-indigo-700">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                )}
                
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <Bot className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-200 bg-white rounded-b-2xl">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Спросите о конкретных кейсах..."
              className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;