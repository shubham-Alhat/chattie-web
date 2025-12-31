# Actual learning while deployment

## First approach : backend and frontend on different domain and call backend api directly from frontend.

we have deployed first backend and it successfully deployed on render.
there was some types eror that could not found and then solve by installing types.

frontend also get deployed on vercel successfully.

### Major bug/issue after deploying

1. When click to login button, the page stays there and also accessToken was there but when **refresh or navigate, all cookies gone/disappear.**

**What actually was happening**

As my frontend and backend are running on different domain and frontend is calling backend api directly. the `accessToken` get stored in cookies under backend domain.
and why not navigating to /chat. proxy.ts runs before and sees no token because it search for cookies under domain name of frontend which nextjs server serving. (frontend.vercel.app) and i ended up in login page.

check - during above when i go on backend.onrender.com and open cookies. i would see accessToken set under this domain.

So the problem was cookies are domain specific and when res comes from backend, browser detect cookies and first check if cookies already specify domain. (in this case not specified) and browser set this cookies under domain from which it receiving.
ie. backend.onrender.com and proxy.ts dont detect cookies and redirect me to /login.

### Fix : Using Nextjs rewrite to mask backend url

Step 1: Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*", // Match any route starting with /api/v1
        destination: "https://chattie-server.onrender.com/api/v1/:path*", // Forward to your backend
      },
    ];
  },
};

module.exports = nextConfig;
```

Step 2: Update your environment variable

```bash

# .env.local (for development)
NEXT_PUBLIC_API_URL=/api/v1

```

Your axios stays same

How will it work

```javascript
// next.config.js
{
  source: '/api/v1/:path*',  // This matches /api/v1/auth/login
  destination: 'https://chattie-server.onrender.com/api/v1/:path*'
}
```

Let's break down the matching:

- `source: '/api/v1/:path*'` means "match anything starting with `/api/v1`"
- `:path*` is a wildcard that captures everything after `/api/v1`

So when request comes to `/api/v1/auth/login`:

- `/api/v1` matches the prefix
- `auth/login` is captured by `:path*`

## The rewrite transforms it:

```
Source:      /api/v1/auth/login
             └─┬─--┘ └───┬───┘
               │         └── captured as :path*
               └────────── matched prefix

Destination: https://chattie-server.onrender.com/api/v1/auth/login
                                                        └───┬───┘
                                                            └── :path* inserted here
```

**Result:** Next.js server forwards to:

```
https://chattie-server.onrender.com/api/v1/auth/login
```

## Full Request Flow:

1. **Browser makes request:**

```
   POST https://chattie-web-omega.vercel.app/api/v1/auth/login
```

2. **Next.js sees `/api/v1/auth/login` matches the rewrite rule**

3. **Next.js extracts `auth/login` (the `:path*` part)**

4. **Next.js makes server-to-server request:**

```
   POST https://chattie-server.onrender.com/api/v1/auth/login
```

[how browser,cookies & cors will behave now](https://chatgpt.com/s/t_6953a85decf08191a07b526720210d3a)

[actual magic behind rewrite](https://share.google/aimode/MtINZdRufrKY0Nf5g)

[why browser will send cookies on every request](https://share.google/aimode/npqo0Ypu0HVUcH7LT)

## Why app now working and cookies are setting correctly and sending cookies on every request.

- click on login button, nextjs show browser that its frontend domain request going.
- nextjs server call my backend server and get res. in cookies i dont specify any domain in cookies. nextjs receives this and send to frontend. browsers see the res comes from frontend.com which is sameSite and check in cookies whether domain is specify or not. (not specified) browser set these cookies under the domain it receives from ie. frontend.com and when going to /chat proxy.ts runs. it get cookies and allow to redirect on /chat.

## minor bug in proxy.ts

proxy file cant get url error so i put direct backend url

# Resources below

[rewrite and cookies stuff](https://chatgpt.com/s/t_6953a85decf08191a07b526720210d3a)

[whole overview of how frontend and backend works](https://claude.ai/share/b7617c94-b892-4097-94d8-6cc58faf4c40)

1. Pure Nextjs frontend - myfrontend.vercel.app
2. Nodejs backend - mybackend.onrender.com

## **Key role - Nextjs rewrite feature**
