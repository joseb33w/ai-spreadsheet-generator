import axios from 'axios';
import type { Message, ChatResponse } from '../types';

const API_BASE_URL = '/api';

export const chatAPI = {
  async sendMessage(message: string, history: Message[]): Promise<ChatResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message,
        history
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  },

  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data.status === 'OK';
    } catch (error) {
      return false;
    }
  }
};
