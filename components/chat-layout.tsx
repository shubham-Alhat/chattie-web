"use client";

import { useEffect, useRef, useState } from "react";
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
import useWebsocketStore from "@/store/websocketStore";

export function ChatLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isConnectedRef = useRef(false);

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

  const {
    connectToWebsocketServer,
    disconnectWebsocketServer,
    ws,
    isConnected,
  } = useWebsocketStore();

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
          // call connection ws
          if (!isConnectedRef.current) {
            connectToWebsocketServer(res.data.data.id);
            console.log("call connect function");
            isConnectedRef.current = true;
          }
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
    return () => {
      if (authUser && authUser.id) {
        disconnectWebsocketServer(authUser.id);
        console.log("call disconnect function");
      }
    };
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
