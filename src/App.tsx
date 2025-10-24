import { useState, lazy, Suspense } from 'react';
import type { Message, SpreadsheetData } from './types';
import './styles/App.css';

// Lazy load components to reduce initial bundle size
const ChatPanel = lazy(() => import('./components/ChatPanel'));
const SpreadsheetPreview = lazy(() => import('./components/SpreadsheetPreview'));

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewMessage = (newMessage: string) => {
    const userMessage: Message = {
      role: 'user',
      content: newMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // This will be handled by ChatPanel, but we need to update state here
    // The actual API call and response handling will be in ChatPanel
  };

  const handleSpreadsheetUpdate = (data: SpreadsheetData) => {
    setSpreadsheetData(data);
  };

  const handleMessagesUpdate = (updatedMessages: Message[]) => {
    setMessages(updatedMessages);
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <div className="app">
      <div className="left-panel">
        <div className="panel-header">
          📊 Spreadsheet Preview
        </div>
        <div className="panel-content">
          <Suspense fallback={<div className="loading-indicator">Loading spreadsheet...</div>}>
            <SpreadsheetPreview 
              data={spreadsheetData}
              isLoading={isLoading}
            />
          </Suspense>
        </div>
      </div>
      
      <div className="right-panel">
        <div className="panel-header">
          💬 AI Assistant
        </div>
        <div className="panel-content">
          <Suspense fallback={<div className="loading-indicator">Loading chat...</div>}>
            <ChatPanel
              messages={messages}
              onNewMessage={handleNewMessage}
              onSpreadsheetUpdate={handleSpreadsheetUpdate}
              onMessagesUpdate={handleMessagesUpdate}
              onLoadingChange={handleLoadingChange}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;