"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Smile } from "lucide-react";
import useChatStore from "@/store/chatStore";
import axios from "axios";
import { toast } from "sonner";
import api from "@/app/utils/api";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [inputMessage, setInputMessage] = useState("");

  // useChatStore
  const selectedChat = useChatStore((state) => state.selectedChat);

  const handleSend = async () => {
    try {
      if (inputMessage.trim() === "" || !inputMessage.trim()) {
        toast.info("Text message required");
        return;
      }

      const textMessage = inputMessage;
      setInputMessage("");

      const res = await api.post("/chats/send-message", {
        textMessage: textMessage,
        receiverId: selectedChat?.id,
      });

      console.log(res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        if (error.response?.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      } else {
        console.log(error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2">
      <div className="flex flex-1 flex-col gap-2 rounded-xl border border-border bg-background p-2">
        <Textarea
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[60px] max-h-[120px] resize-none border-0 bg-transparent p-2 text-[15px] leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Smile className="h-4 w-4" />
              <span className="sr-only">Add emoji</span>
            </Button>
          </div>

          <Button
            onClick={handleSend}
            disabled={!inputMessage.trim()}
            size="sm"
            className="h-8 gap-2"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
