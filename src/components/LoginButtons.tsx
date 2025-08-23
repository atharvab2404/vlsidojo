"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginButtons() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Redirect first-time users to myprofile
  useEffect(() => {
    if (status !== "authenticated") return;

    if (session?.user?.signupCompleted === false) {
      router.push("/myprofile");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        {/* Sign Out Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 bg-[#00a8ff] text-white rounded-lg hover:bg-[#0090d1] transition"
        >
          Sign Out
        </button>

        {/* Clickable User Photo */}
        <Link href="/profile">
          <img
            src={session.user?.image || "/default-profile.png"}
            alt={session.user?.name || "Profile"}
            className="w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition"
          />
        </Link>

        {/* User Name */}
        <span className="text-sm font-medium">{session.user?.name}</span>
      </div>
    );
  }

  return (
    <div>
      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 border border-[#00a8ff] rounded-lg hover:bg-[#00a8ff] hover:text-white transition"
        >
          Sign Up
        </button>
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 bg-[#00a8ff] text-white rounded-lg hover:bg-[#0090d1] transition"
        >
          Log In
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[600px] relative flex">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <div className="flex-1 pr-6">
              <h2 className="text-2xl font-bold text-black mb-2">
                🚀 Join VLSI Dojo
              </h2>
              <p className="text-gray-600 mb-6">
                Turn Ideas into Silicon-Ready Projects. Build a Portfolio That Gets You Hired.
              </p>

              <button
                onClick={() => signIn("google")}
                className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mb-4 hover:bg-gray-50 transition"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                <span className="text-black font-medium">Sign up with Google</span>
              </button>

              <p className="text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setIsOpen(false);
                    signIn("google");
                  }}
                  className="text-[#00a8ff] cursor-pointer hover:underline"
                >
                  Log In
                </span>
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="text-sm font-semibold text-[#00a8ff] mb-2">
                llama approves. Sign up now!
              </p>
              <img
                src="/images/sign.png"
                alt="Chip Design"
                className="w-40 h-40 object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
