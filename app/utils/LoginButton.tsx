"use client";

import { Button } from "@/components/ui/button";

function LoginButton() {
  return (
    <>
      <Button
        onClick={() => console.log("hello")}
        type="submit"
        className="w-full"
      >
        Login
      </Button>
    </>
  );
}

export default LoginButton;
