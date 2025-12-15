"use client";

import { useEffect } from "react";

export default function Dashboard() {
  console.log("1. Component rendering");

  useEffect(() => {
    console.log("3. useEffect running");

    setTimeout(() => {
      console.log("4. API response received");
    }, 500);
  }, []);

  console.log("2. About to return JSX");

  return <div>Secret Dashboard</div>;
}
