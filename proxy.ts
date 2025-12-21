import { NextResponse, NextRequest } from "next/server";
import api from "./app/utils/api";
import axios from "axios";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const res = await api.get("/checkme", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.next();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      if (error.response && error.response.data.redirect) {
        return NextResponse.redirect(
          new URL(error.response.data.redirect, request.url)
        );
      }

      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      const err = error as Error;
      console.log(err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return;
}

export const config = {
  matcher: ["/chat/:path*"],
};

// backend has a middleware which can check cookies and verify user request
// 1. logged in user should not able to navigate to sign/login page
// 2. unauthenticated user should not navigate to protected routes

// The Problem: Cookies Are NOT Automatically Forwarded
// When you use axios (or fetch) inside proxy.ts, cookies are NOT automatically forwarded unless you explicitly tell it to LearnWebCraft. This is why your backend receives a 401 error - it's not getting the authentication cookies.
// Why It Works in Client Components:

// When you call the API from a client component, the browser automatically includes cookies with the request
// When you call from proxy.ts (server-side), you're making a server-to-server request - cookies don't exist in that context unless you manually forward them
