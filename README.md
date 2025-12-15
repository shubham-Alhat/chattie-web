### learning from this project.

#### Middleware/proxy in Nextjs

What we think is, we will call api to check cookies and then send to frontend, frontend get response and on that basis, frontend redirect the user.
**But here things get tricky.**

1. first of all, the page in which you wriiten api call func and get res and decide user where to redirect, this page actually already loaded/download in browser. AS hacker get this page before validation in server going on.

```javascript
export default function Dashboard() {
  useEffect(() => {
    // This runs AFTER render
    checkAuth();
  }, []);

  return <div>Secret Data</div>; // ⚠️ This shows IMMEDIATELY
}
```

Why This Happens
React doesn't wait for useEffect to finish before rendering.

Contrast with Middleware (middleware.js/proxy.js) in Nextjs

```javascript
// middleware.js
export async function middleware(request) {
  console.log("1. Middleware runs");

  const isValid = await fetch("http://backend.com/api/verify");
  console.log("2. API response received");

  if (!isValid) {
    console.log("3. Redirecting");
    return NextResponse.redirect("/login");
  }

  console.log("4. Allowing page to load");
  return NextResponse.next();
}
```

**Timeline:**

```
0ms:   User requests /dashboard

10ms:  Middleware runs
       API call to backend

110ms: API responds: "Not authenticated"
       Middleware redirects to /login

120ms: User sees LOGIN page

❌ User NEVER saw dashboard
✅ Dashboard page.tsx NEVER loaded
```

<!-- Middleware runs on edge before going to any route -->

Even when you think, i will show loading state. JS file still in browser devtools.
So, use Middleware.
