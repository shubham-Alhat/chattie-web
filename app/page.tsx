import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <span className="text-4xl">Welcome to Chattie</span>
      <Button variant={"secondary"} className="mt-3.5 text-xl cursor-pointer">
        Lets Chat
      </Button>
    </div>
  );
}
