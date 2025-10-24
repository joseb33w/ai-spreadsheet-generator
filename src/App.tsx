import { useState } from 'react';
import ChatPanel from './components/ChatPanel';
import SpreadsheetPreview from './components/SpreadsheetPreview';
import type { Message, SpreadsheetData } from './types';
import './styles/App.css';

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
          <SpreadsheetPreview 
            data={spreadsheetData}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      <div className="right-panel">
        <div className="panel-header">
          💬 AI Assistant
        </div>
        <div className="panel-content">
          <ChatPanel
            messages={messages}
            onNewMessage={handleNewMessage}
            onSpreadsheetUpdate={handleSpreadsheetUpdate}
            onMessagesUpdate={handleMessagesUpdate}
            onLoadingChange={handleLoadingChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;