"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButtons() {
  const { data: session } = useSession();

  if (session) {
    // User is logged in → show profile + logout
    return (
      <div className="flex items-center space-x-4">
        <img
          src={session.user?.image || "/default-profile.png"}
          alt={session.user?.name || "Profile"}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">{session.user?.name}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 bg-[#00a8ff] text-white rounded-lg hover:bg-[#0090d1] transition"
        >
          Sign Out
        </button>
      </div>
    );
  }

  // User not logged in → show Sign Up / Log In buttons
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="px-4 py-2 border border-[#00a8ff] rounded-lg hover:bg-[#00a8ff] hover:text-white transition"
      >
        Sign Up
      </button>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="px-4 py-2 bg-[#00a8ff] text-white rounded-lg hover:bg-[#0090d1] transition"
      >
        Log In
      </button>
    </div>
  );
}
