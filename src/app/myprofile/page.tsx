"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProfileData {
  phone: string;
  college: string;
  education: string;
  branch: string;
  year: string;
  company: string;
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState<ProfileData>({
    phone: "",
    college: "",
    education: "",
    branch: "",
    year: "",
    company: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user?.email) {
      router.push("/"); // not logged in
      return;
    }

    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.signupCompleted) {
          router.push("/profile");
          return;
        }
        setFormData({
          phone: data.phone || "",
          college: data.college || "",
          education: data.education || "",
          branch: data.branch || "",
          year: data.year || "",
          company: data.company || "",
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [session, status, router]);

  if (status === "loading" || loading)
    return <p className="text-center mt-20">Loading...</p>;

  const handleChange = (key: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        signupCompleted: true, // <-- mark completed here
      }),
    });

    if (res.ok) {
      setIsSaved(true);

      // refresh session so signupCompleted = true in session object
      await update();

      // now safe to redirect
      router.push("/profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className="max-w-2xl w-full mx-auto mt-10 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 relative">
        
        {/* ✅ Header with Mascot */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-extrabold text-white tracking-wide drop-shadow-lg">
            Complete your profile
          </h1>
          <img
            src="/images/form.png" // replace with your mascot
            alt="Profile Icon"
            className="w-40 h-40 object-contain drop-shadow-lg -mr-0"
          />
        </div>

        <p className="mb-2 text-gray-200 text-lg">
          Signed in as <span className="font-semibold">{session.user?.email}</span>
        </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="bg-white/5 p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <label className="block text-sm font-semibold text-gray-200 capitalize mb-1">{key}
              {key}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(key as keyof ProfileData, e.target.value)}
              className="w-full p-3 border border-white/20 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#00c6ff] focus:outline-none transition"
            />
          </div>
        ))}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white font-semibold rounded-lg hover:opacity-90 shadow-md transition"
          >
            Save Profile
          </button>
        </form>

        {isSaved && <p className="mt-4 text-green-400 font-medium">✅ Profile updated!</p>}
      </div>
    </div>
  );
}