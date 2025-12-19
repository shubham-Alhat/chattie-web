import { create } from "zustand";

type Chat = {
  id: string;
  username: string;
  email: string;
  password?: string;
  avatar: string | null;
  sentMessages?: [];
  receivedMessages?: [];
  updatedAt?: string;
  createdAt?: string;
};

type OtherChatsArray = Array<Chat>;

interface ChatStore {
  otherChats: OtherChatsArray;
  setOtherChats: (otherChats: OtherChatsArray) => void;
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  otherChats: [],
  setOtherChats: (otherChats: OtherChatsArray) => {
    set({ otherChats: otherChats });
  },
  selectedChat: null,
  setSelectedChat: (chat: Chat) => {
    set({ selectedChat: chat });
  },
}));

export default useChatStore;
