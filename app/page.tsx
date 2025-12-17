"use client";
import { Button } from "@/components/ui/button";
import api from "./utils/api";
import { redirect } from "next/navigation";
export default function Home() {
  const handleClick = async () => {
    const res = await api.get("/checkme");
    console.log(res);
    // redirect("/chat");
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <span className="text-4xl">Welcome to Chattie</span>
      <Button
        onClick={handleClick}
        variant={"secondary"}
        className="mt-3.5 text-xl cursor-pointer"
      >
        Lets Chat
      </Button>
    </div>
  );
}
