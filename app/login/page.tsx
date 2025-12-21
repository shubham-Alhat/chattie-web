"use client";
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
import axios from "axios";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const { authUser, setAuthUser } = useAuthStore();

  const handleLoginButton = async () => {
    try {
      if (password == "" || !password) {
        toast.warning("Password required!!");
        return;
      }

      if (email == "" || !email) {
        toast.warning("Email required!!");
        return;
      }

      const response = await api.post("/auth/login", {
        password,
        email,
      });

      // set authUser state
      setAuthUser(response.data.data);

      router.push("/chat");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // when axios detects error (4xx,5xx) in response, axios throws error response --> we get `error.response.data.message`

        // when server down OR No Internet Connection, axios throws req error. ie. response object is not in axios error ---> so we error.message
        if (error.response && error.response.data.message) {
          toast.error(error.response?.data.message);
        } else {
          toast.error(error.message);
        }
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
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
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
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleLoginButton} type="submit" className="w-full">
            Login
          </Button>

          <div>
            <span className="pr-1">Dont have an account?</span>
            <span>
              <Link href={"/signup"} className="text-primary underline">
                {" "}
                Sign Up
              </Link>
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
