"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="h-full">
      <div ref={scrollRef} className="flex flex-col gap-4 px-4 py-6 lg:px-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.sender === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            {message.sender === "other" && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                DT
              </div>
            )}

            <div
              className={cn(
                "flex flex-col gap-1",
                message.sender === "user" ? "items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed sm:max-w-md",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-card-foreground rounded-bl-md"
                )}
              >
                {message.text}
              </div>
              <span className="px-1 text-xs text-muted-foreground">
                {message.timestamp}
              </span>
            </div>

            {message.sender === "user" && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                You
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
