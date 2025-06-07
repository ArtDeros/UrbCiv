import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';

interface Suggestion {
  id: string;
  text: string;
}

const ChatSuggestions: React.FC = () => {
  const { sendMessage } = useChat();
  const [loading, setLoading] = useState(false);

  const handleSuggestionClick = async (suggestion: Suggestion) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: suggestion.text,
          language: 'es'
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la consulta');
      }

      const data = await response.json();
      sendMessage(suggestion.text, data.response);
    } catch (error) {
      console.error('Error:', error);
      sendMessage(suggestion.text, 'Lo siento, hubo un error al procesar tu consulta.');
    } finally {
      setLoading(false);
    }
  };

  const suggestions: Suggestion[] = [
    { id: '1', text: '¿Cómo solicito vivienda subsidiada?' },
    { id: '2', text: '¿Qué documentos necesito para la ciudadanía?' },
    { id: '3', text: '¿Cómo obtengo una licencia de conducir?' },
    { id: '4', text: '¿Cuáles son los requisitos para beneficios sociales?' },
    { id: '5', text: '¿Cómo me registro para el seguro de salud?' }
  ];

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => handleSuggestionClick(suggestion)}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200 disabled:opacity-50"
        >
          {suggestion.text}
        </button>
      ))}
    </div>
  );
};

export default ChatSuggestions; 