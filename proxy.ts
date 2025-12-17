import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  console.log("hello");
  return;
}

export const config = {
  matcher: ["/"],
};

// i think i will not use this file as middleware. experiment with bckend. writing alll middlewares in backend
