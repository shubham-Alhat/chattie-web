"use client";

import { useEffect, useState } from "react";
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatMessages } from "@/components/chat-messages";
import { ChatInput } from "@/components/chat-input";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import useAuthStore from "@/store/authStore";
import api from "@/app/utils/api";
import useChatStore from "@/store/chatStore";
import DefaultChatBox from "./DefaultChatBox";
import useMessageStore from "@/store/messageStore";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Design Team",
    avatar: "DT",
    lastMessage: "The new mockups are ready",
    timestamp: "2m ago",
    unread: 3,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "SJ",
    lastMessage: "Thanks for the update!",
    timestamp: "15m ago",
  },
  {
    id: "3",
    name: "Marketing Group",
    avatar: "MG",
    lastMessage: "Let's schedule the campaign",
    timestamp: "1h ago",
    unread: 1,
  },
  {
    id: "4",
    name: "Alex Chen",
    avatar: "AC",
    lastMessage: "See you at the meeting",
    timestamp: "3h ago",
  },
  {
    id: "5",
    name: "Product Updates",
    avatar: "PU",
    lastMessage: "Version 2.0 is live!",
    timestamp: "Yesterday",
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hey! How are you doing?",
    sender: "other",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    text: "I'm doing great, thanks! Just finished the new designs.",
    sender: "user",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    text: "That's awesome! Can't wait to see them.",
    sender: "other",
    timestamp: "10:33 AM",
  },
  {
    id: "4",
    text: "I'll send them over in a few minutes. I think you'll really like the direction we went with the color palette.",
    sender: "user",
    timestamp: "10:35 AM",
  },
  {
    id: "5",
    text: "Perfect! I'm looking forward to it.",
    sender: "other",
    timestamp: "10:36 AM",
  },
  {
    id: "6",
    text: "This is my first custome added message.",
    sender: "user",
    timestamp: "12:00 AM",
  },
  {
    id: "7",
    text: "well , second one",
    sender: "other",
    timestamp: "12:45 PM",
  },
];

export function ChatLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(mockConversations[0]);
  // const [messages, setMessages] = useState<Message[]>(mockMessages);

  // useAuthStore
  const authUser = useAuthStore((state) => state.authUser);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  // useChatStore
  const otherChats = useChatStore((state) => state.otherChats);
  const setOtherChats = useChatStore((state) => state.setOtherChats);
  const selectedChat = useChatStore((state) => state.selectedChat);
  const setSelectedChat = useChatStore((state) => state.setSelectedChat);

  // useMessageStore

  const setMessages = useMessageStore((state) => state.setMessages);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    // reset states
    setAuthUser(null);
    setOtherChats([]);
    setSelectedChat(null);
    setMessages([]);

    // call fresh api
    const getAuthUser = async () => {
      try {
        const res = await api.get("/checkme");
        if (res.data.data) {
          setAuthUser(res.data.data);
        }

        const otherUsers = await api.get("/chats/get-all-chats");

        if (otherUsers.data.data) {
          setOtherChats(otherUsers.data.data);
        }
      } catch (error) {
        console.log("error", error);
        if (axios.isAxiosError(error)) {
          console.log("axios error - ", error);
          if (error.response && error.response.data.message) {
            toast.error(error.response?.data.message);
          } else {
            toast.error(error.message);
          }
        } else {
          console.log(error);
        }
      }
    };

    getAuthUser();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 transform border-r border-border bg-card transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ChatSidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Main chat area */}

      {!selectedChat || selectedChat === null ? (
        <DefaultChatBox openSidebar={() => setIsSidebarOpen(true)} />
      ) : (
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>

            <div className="flex items-center gap-3 flex-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                {selectedChat?.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-card-foreground truncate">
                  {selectedChat?.username}
                </h2>
                <p className="text-sm text-muted-foreground">Active now</p>
              </div>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-hidden">
            <ChatMessages />
          </div>

          {/* Input */}

          <div className="border-t border-border bg-card p-4">
            <ChatInput />
          </div>
        </main>
      )}
    </div>
  );
}
