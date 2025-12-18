"use client";
import React, { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import axios from "axios";
import { toast } from "sonner";
import api from "../utils/api";

function Chat() {
  const { authUser, setAuthUser } = useAuthStore();

  useEffect(() => {
    const setUser = async () => {
      try {
        const res = await api.get("/checkme");
        if (res.data.data) {
          setAuthUser(res.data.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        } else {
          console.log(error);
        }
      }
    };

    setUser();
  }, [authUser]);

  return (
    <>
      <div>username : {authUser?.username}</div>
      <div>email : {authUser?.email}</div>
    </>
  );
}

export default Chat;
