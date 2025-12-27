"use client";

import { ChatLayout } from "@/components/chat-layout";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";
import useWebsocketStore from "@/store/websocketStore";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

function Chat() {
  const authUser = useAuthStore((state) => state.authUser);
  const {
    connectToWebsocketServer,
    disconnectWebsocketServer,
    ws,
    isConnected,
  } = useWebsocketStore();

  const isConnectedRef = useRef(false);

  useEffect(() => {
    if (!authUser) return;

    if (authUser && authUser.id) {
      if (!isConnectedRef.current) {
        connectToWebsocketServer(authUser.id);
        console.log("called this function");
        isConnectedRef.current = true;
      }
    }

    return () => {
      if (authUser && authUser.id) {
        if (!isConnectedRef.current) {
          disconnectWebsocketServer(authUser.id);
          console.log("diconnect");
        }
      }
    };
  }, [authUser]);

  const handleClick = () => {
    if (authUser && authUser.id) {
      disconnectWebsocketServer(authUser?.id);
    }
  };

  return (
    <>
      <div>
        <Button onClick={handleClick} variant={"destructive"}>
          disconect
        </Button>
        <ChatLayout />
      </div>
    </>
  );
}

export default Chat;
