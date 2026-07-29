import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { MessageBackend } from "../../infra/domain/channel/entity/channel";
import { apiServices } from "../../infra/domain/apiServices";
import api from "../../infra/api/api";

const { channelService } = apiServices();

export default function useChannelData() {
  const [messages, setMessages] = useState<MessageBackend[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);
  const currentChannelId = 1;

  useEffect(() => {
    async function fetchMessages() {
      try {
        const data = await channelService.getAll();
        setMessages(data);
      } catch (error) {
        console.error('Error retrieving messages:', error);
      }
    }

    fetchMessages();
  }, [currentChannelId]);

  useEffect(() => {
    const div = messagesRef.current;
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  }, [messages]);

  async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && inputText.trim() !== '') {
      try {
        await api.post('/messages', {
          content: inputText,
          userId: 1,
          channelId: currentChannelId
        });
        setInputText('');

        const response = await api.get<MessageBackend[]>(`/messages/${currentChannelId}`);
        setMessages(response.data);

      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }

  return {
    messages,
    inputText,
    setInputText,
    messagesRef,
    handleKeyDown
  };
}