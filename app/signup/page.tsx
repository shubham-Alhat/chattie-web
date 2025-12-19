"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "../utils/api";
import { useState } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   console.log(avatar, avatar.length);
  // }, [avatar]);

  const handleCreateAccount = async () => {
    try {
      if (username == "" || !username) {
        toast.warning("Username required!!");
        return;
      }

      if (password == "" || !password) {
        toast.warning("Password required!!");
        return;
      }

      if (email == "" || !email) {
        toast.warning("Email required!!");
        return;
      }

      if (avatar == "" || avatar.length !== 2) {
        toast.warning("Avatar TEXT must be length of 2 letters");
        return;
      }

      const avatarText = avatar.toUpperCase();

      const response = await api.post("/auth/signup", {
        username: username.trim(),
        password: password.trim(),
        email: email.trim(),
        avatar: avatarText.trim(),
      });

      console.log(response);

      if (response.data.redirect) {
        toast.success(response.data.message);
        router.push(response.data.redirect); // go to login
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
        toast.error(error.response?.data.message);
      } else {
        const err = error as Error;
        console.log(err);
        toast.error(err.message);
      }
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up to chattie</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  type="text"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  required
                />
              </div>
              {/* set up for avatar TEXT */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="avatar">Avatar TEXT</Label>
                </div>
                <Input
                  id="avatar"
                  type="text"
                  required
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="Eg. SA"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            onClick={handleCreateAccount}
            type="submit"
            className="w-full"
          >
            Create Account
          </Button>
          <div>
            <span className="pr-2.5">already have account?</span>
            <Link href={"/login"} className="underline text-blue-300">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signup;
