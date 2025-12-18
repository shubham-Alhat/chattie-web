"use client";
import { Button } from "@/components/ui/button";
import api from "./utils/api";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
export default function Home() {
  const router = useRouter();
  const handleClick = async () => {
    try {
      const res = await api.get("/checkme");
      // console.log(res.data.data);
      // redirect("/chat");
      if (res.data.data) {
        router.push("/chat");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        toast.error(error.response?.data.message);
        router.push("/login");
      } else {
        const err = error as Error;
        console.log(err);
        toast.error(err.message);
      }
    }
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
