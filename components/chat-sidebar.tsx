"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X, MoreVertical, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenuDemo } from "./Dropdown";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedConversation: Conversation;
  onSelectConversation: (conversation: Conversation) => void;
  onClose: () => void;
}

export function ChatSidebar({
  conversations,
  selectedConversation,
  onSelectConversation,
  onClose,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      {/* Sidebar header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-4">
        <h1 className="text-xl font-bold text-card-foreground">Chats</h1>
        <div className="flex items-center gap-1">
          {/* <Button variant="ghost" size="icon" className="h-9 w-9">
            <Edit className="h-4 w-4" />
            <span className="sr-only">New message</span>
          </Button> */}
          {/* <Button variant="ghost" size="icon" className="h-9 w-9">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button> */}
          <DropdownMenuDemo />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search conversations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Conversations list */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-2">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-background cursor-pointer",
                selectedConversation.id === conversation.id && "bg-background"
              )}
            >
              <div className="relative flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {conversation.avatar}
                </div>
                {conversation.unread && (
                  <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {conversation.unread}
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-card-foreground truncate">
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {conversation.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
