import React, { useState, useRef, useEffect } from 'react';
import type { Message, SpreadsheetData, ChatResponse } from '../types';
import { chatAPI } from '../services/api';

interface ChatPanelProps {
  messages: Message[];
  onNewMessage: (message: string) => void;
  onSpreadsheetUpdate: (data: SpreadsheetData) => void;
  onMessagesUpdate: (messages: Message[]) => void;
  onLoadingChange: (loading: boolean) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  onSpreadsheetUpdate,
  onMessagesUpdate,
  onLoadingChange
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputMessage]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);
    onLoadingChange(true);

    try {
      // Add user message to conversation
      const updatedMessages = [...messages, { role: 'user' as const, content: userMessage }];
      onMessagesUpdate(updatedMessages);

      // Send to API
      const response: ChatResponse = await chatAPI.sendMessage(userMessage, messages);

      // Add AI response to conversation
      const aiMessage: Message = {
        role: 'assistant',
        content: response.message
      };

      const finalMessages = [...updatedMessages, aiMessage];
      onMessagesUpdate(finalMessages);

      // Check if response contains spreadsheet data
      if (response.response.type === 'spreadsheet') {
        onSpreadsheetUpdate(response.response as SpreadsheetData);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };

      const finalMessages = [...messages, { role: 'user' as const, content: userMessage }, errorMessage];
      onMessagesUpdate(finalMessages);
    } finally {
      setIsLoading(false);
      onLoadingChange(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.length === 0 && (
          <div className="message assistant">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>👋 Hello!</div>
              <div>I'm your AI spreadsheet assistant. I can help you:</div>
              <ul style={{ textAlign: 'left', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li>Create spreadsheets with any data you need</li>
                <li>Edit and modify existing spreadsheets</li>
                <li>Generate realistic sample data</li>
                <li>Organize information in tables</li>
              </ul>
              <div style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                Try asking: "Create a spreadsheet of my monthly expenses" or "Generate a sales report for Q1"
              </div>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}

        {isLoading && (
          <div className="message assistant">
            <div className="loading-indicator">
              <div className="spinner"></div>
              <span>Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            ref={textareaRef}
            className="chat-input"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me to create or edit a spreadsheet..."
            disabled={isLoading}
            rows={1}
          />
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
