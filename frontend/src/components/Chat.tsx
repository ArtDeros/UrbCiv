import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';

const Chat: React.FC = () => {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Función para detectar intención y disparar endpoint
  const detectAndCallAPI = async (message: string, language: string) => {
    const text = message.toLowerCase();
    if (text.includes('evento') || text.includes('event') || text.includes('festival') || text.includes('concierto')) {
      // Llama a /tourist-events
      return fetch(`/api/tourist-events?location=Vancouver&type=event`)
        .then(res => res.json());
    }
    if (text.includes('cultura') || text.includes('culture') || text.includes('museum') || text.includes('arte')) {
      // Llama a /tourist-events con type=culture
      return fetch(`/api/tourist-events?location=Vancouver&type=culture`)
        .then(res => res.json());
    }
    if (text.includes('comida') || text.includes('food') || text.includes('restaurant') || text.includes('restaurante')) {
      // Llama a /local-businesses
      return fetch(`/api/local-businesses?location=Vancouver&category=restaurants`)
        .then(res => res.json());
    }
    if (text.includes('apoyo') || text.includes('help') || text.includes('support') || text.includes('emergencia')) {
      // Llama a /emergency-help
      return fetch(`/api/emergency-help?location=Vancouver`)
        .then(res => res.json());
    }
    // Si no detecta intención, usa RAG
    return fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message, language })
    }).then(res => res.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await detectAndCallAPI(input, 'es');
      sendMessage(input, response.response);
    } catch (error) {
      console.error('Error:', error);
      sendMessage(input, 'Lo siento, hubo un error al procesar tu consulta.');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat; 