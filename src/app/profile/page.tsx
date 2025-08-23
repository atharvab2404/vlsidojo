"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar"; // ✅ Import your Navbar component

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user?.email) {
      // if not logged in, redirect to homepage
      router.push("/");
    } else {
      // fetch user data from API (stored in db)
      const fetchUserData = async () => {
        const res = await fetch(`/api/user/${session.user?.email}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
      };

      fetchUserData();
    }
  }, [session, status, router]);

  if (!session) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <p>Please log in to view your profile.</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* ✅ Navbar always visible at the top */}
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>

        {userData ? (
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
            {/* Profile Image */}
            <img
              src={userData.image || "/default-avatar.png"}
              alt="User Avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />

            {/* User Info */}
            <div className="space-y-2 text-gray-800">
              <p>
                <strong>Name:</strong> {userData.name || "—"}
              </p>
              <p>
                <strong>Email:</strong> {userData.email || "—"}
              </p>
              <p>
                <strong>Email Verified:</strong>{" "}
                {userData.emailVerified
                  ? new Date(userData.emailVerified).toLocaleDateString()
                  : "Not verified"}
              </p>
              <p>
                <strong>Phone:</strong> {userData.phone || "—"}
              </p>
              <p>
                <strong>College:</strong> {userData.college || "—"}
              </p>
              <p>
                <strong>Education:</strong> {userData.education || "—"}
              </p>
              <p>
                <strong>Branch:</strong> {userData.branch || "—"}
              </p>
              <p>
                <strong>Year:</strong> {userData.year || "—"}
              </p>
              <p>
                <strong>Company:</strong> {userData.company || "—"}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col space-y-3">
              <button
                onClick={() => router.push("/")}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Go to Home
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>
    </>
  );
}
