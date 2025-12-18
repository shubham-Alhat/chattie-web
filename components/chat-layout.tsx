"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatMessages } from "@/components/chat-messages";
import { ChatInput } from "@/components/chat-input";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

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
];

export function ChatLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(mockConversations[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsSidebarOpen(false);
  };

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
        <ChatSidebar
          conversations={mockConversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
          onClose={() => setIsSidebarOpen(false)}
        />
      </aside>

      {/* Main chat area */}
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
              {selectedConversation.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-card-foreground truncate">
                {selectedConversation.name}
              </h2>
              <p className="text-sm text-muted-foreground">Active now</p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <ChatMessages messages={messages} />
        </div>

        {/* Input */}
        <div className="border-t border-border bg-card p-4">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </main>
    </div>
  );
}
