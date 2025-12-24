"use client";

import { ChatLayout } from "@/components/chat-layout";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

function Chat() {
  const websocketRef = useRef<WebSocket>(null);

  useEffect(() => {
    if (websocketRef.current) {
      console.log("already socket..");
      return;
    }

    // console.log("check..");
    const websocket = new WebSocket("ws://localhost:8000/ws");
    websocketRef.current = websocket;
    websocket.addEventListener("open", () => {
      console.log("connected to ws server..");
      websocket.send("hey.. from frontend!!");
    });
  }, []);

  return (
    <>
      <div>
        <ChatLayout />
      </div>
    </>
  );
}

export default Chat;
