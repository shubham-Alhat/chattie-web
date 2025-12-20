import { Menu, MessageSquare } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

interface SidebarProps {
  openSidebar: () => void;
}

function DefaultChatBox({ openSidebar }: SidebarProps) {
  return (
    <>
      <header className="flex flex-col items-center justify-items-start gap-2 border-b border-border bg-card px-2 py-1 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={openSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      </header>
      <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
        <div className="max-w-md text-center space-y-6">
          {/* Icon Display */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
              >
                <MessageSquare className="w-8 h-8 text-primary " />
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <h2 className="text-2xl font-bold">Welcome to Chattie!</h2>
          <p className="text-base-content/60">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    </>
  );
}

export default DefaultChatBox;
