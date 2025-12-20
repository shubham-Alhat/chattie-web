import { create } from "zustand";

type User = {
  id: string;
  username: string;
  email: string;
  password?: string;
  avatar: string | null;
  sentMessages?: SingleMessage[];
  receivedMessages?: SingleMessage[];
  updatedAt?: string;
  createdAt?: string;
};

type SingleMessage = {
  id: string;
  textContent: string;
  mediaContent?: string;
  isRead: boolean;
  senderId: string;
  sender?: User;
  receiverId: string;
  receiver?: User;
  createdAt: string;
  updatedAt: string;
};

interface MessageStore {
  messages: [] | SingleMessage[];
  setMessages: (messages: [] | SingleMessage[]) => void;
  addMessage: (message: SingleMessage) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (messages) => {
    set({ messages: messages });
  },
  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },
}));

export default useMessageStore;
