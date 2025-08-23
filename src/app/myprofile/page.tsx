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
  const { data: session, status } = useSession();
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
        // If profile already completed → redirect to landing page
        if (data.signupCompleted) {
          router.push("/");
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

  if (status === "loading" || loading) return <p className="text-center mt-20">Loading...</p>;

  const handleChange = (key: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsSaved(true);
      router.push("/"); // redirect after save
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h1>
      <p className="mb-4 text-gray-600">Signed in as {session.user?.email}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(key as keyof ProfileData, e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        ))}

        <button
          type="submit"
          className="px-4 py-2 bg-[#00a8ff] text-white rounded-lg hover:bg-[#0090d1]"
        >
          Save Profile
        </button>
      </form>

      {isSaved && <p className="mt-4 text-green-600">✅ Profile updated!</p>}
    </div>
  );
}
