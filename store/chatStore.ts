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
  otherChats: OtherChatsArray | [];
  setOtherChats: (otherChats: OtherChatsArray | []) => void;
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  otherChats: [],
  setOtherChats: (otherChats) => {
    set({ otherChats: otherChats });
  },
  selectedChat: null,
  setSelectedChat: (chat) => {
    set({ selectedChat: chat });
  },
}));

export default useChatStore;
