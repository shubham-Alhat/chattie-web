"use client";
import React from "react";
import useAuthStore from "@/store/authStore";

function Chat() {
  const { authUser } = useAuthStore();
  return (
    <>
      <div>username : {authUser?.username}</div>
      <div>email : {authUser?.email}</div>
    </>
  );
}

export default Chat;
