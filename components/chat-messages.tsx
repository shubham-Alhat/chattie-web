"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import useChatStore from "@/store/chatStore";
import useMessageStore from "@/store/messageStore";
import useAuthStore from "@/store/authStore";
import axios from "axios";
import { toast } from "sonner";
import api from "@/app/utils/api";
import { MessageSkeleton } from "./message-skeleton";

export function ChatMessages() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);

  // useChatStore
  const selectedChat = useChatStore((state) => state.selectedChat);
  const setSelectedChat = useChatStore((state) => state.setSelectedChat);

  // useAuthStore
  const authUser = useAuthStore((state) => state.authUser);

  // useMessageStore
  const messages = useMessageStore((state) => state.messages);
  const setMessages = useMessageStore((state) => state.setMessages);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const getSelectedChatMessages = async () => {
      try {
        if (!selectedChat || selectedChat.id === authUser?.id) {
          return;
        }

        setLoading(true);

        const res = await api.get(`/chats/get-messages/${selectedChat?.id}`);

        setMessages(res.data.data);
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error(error.message);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    getSelectedChatMessages();
  }, [selectedChat]);

  return (
    <ScrollArea className="h-full">
      <div ref={scrollRef} className="flex flex-col gap-4 px-4 py-6 lg:px-6">
        {loading ? (
          <MessageSkeleton />
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.sender?.id === authUser?.id
                  ? "flex-row-reverse"
                  : "flex-row"
              )}
            >
              {message.sender?.id === selectedChat?.id && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {message.sender?.avatar}
                </div>
              )}

              <div
                className={cn(
                  "flex flex-col gap-1",
                  message.sender?.id === authUser?.id
                    ? "items-end"
                    : "items-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed sm:max-w-md",
                    message.sender?.id === authUser?.id
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-card-foreground rounded-bl-md"
                  )}
                >
                  {message.textContent}
                </div>
                <span className="px-1 text-xs text-muted-foreground">
                  {/* {message.timestamp} */}
                  {new Date(message.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>

              {message.sender?.id === authUser?.id && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  You
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
}
