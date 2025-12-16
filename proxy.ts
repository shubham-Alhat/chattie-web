import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const tokens = request.cookies.getAll();
  console.log(tokens);
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/chat/:path*"],
};
