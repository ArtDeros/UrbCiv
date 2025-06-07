import React from 'react';
import { ChatProvider } from './context/ChatContext';
import Chat from './components/Chat';
import ChatSuggestions from './components/ChatSuggestions';

const App: React.FC = () => {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Asistente Virtual Gubernamental
          </h1>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Chat />
            <ChatSuggestions />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};

export default App; 