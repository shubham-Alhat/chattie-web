"use client";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <span className="text-4xl">Welcome to Chattie</span>
      <Button
        onClick={() => router.push("/chat")}
        variant={"secondary"}
        className="mt-3.5 text-xl cursor-pointer"
      >
        Lets Chat
      </Button>
    </div>
  );
}
