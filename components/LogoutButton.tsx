"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      className="rounded-md border px-3 py-1 hover:text-white/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer" 
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Logout
    </button>
  );
}
