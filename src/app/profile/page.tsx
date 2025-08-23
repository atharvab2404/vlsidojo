"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      // if not logged in, redirect to homepage
      router.push("/");
    } else {
      // fetch user data from API (stored in db)
      const fetchUserData = async () => {
        const res = await fetch(`/api/user/${session.user?.email}`);
        const data = await res.json();
        setUserData(data);
      };

      fetchUserData();
    }
  }, [session, status, router]);

  if (!session) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      {userData ? (
        <div className="bg-white shadow-lg rounded-xl p-6 w-96">
          <img
            src={session.user?.image || "/default-avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Bio:</strong> {userData.bio}</p>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}
