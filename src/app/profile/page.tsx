// profile/page.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { categories } from "@/data/projectCategories";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  // courses will hold resolved dojo objects with the same fields used in ProjectCategories
  const [courses, setCourses] = useState<
    { id: string; title: string; description?: string; thumbnail?: string; price?: number; link?: string }[]
  >([]);

  const [showFullInfo, setShowFullInfo] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // helper: find dojo metadata by id in local categories (preferred)
  function getDojoFromCategories(dojoIdOrName: string) {
    const flat = (categories ?? []).flatMap((c: any) => c.projects ?? []);
    return (
      flat.find(
        (p: any) =>
          String(p.id ?? p.name).toLowerCase() === String(dojoIdOrName).toLowerCase() ||
          String(p.name ?? "").toLowerCase() === String(dojoIdOrName).toLowerCase()
      ) || null
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    if (status === "loading") return;

    if (!session?.user?.email) {
      router.push("/");
      return;
    }

    async function fetchAll() {
      try {
        // 1) fetch user data
        try {
          if (!session?.user?.email) return;
          const userRes = await fetch(`/api/user/${encodeURIComponent(session.user.email)}`);
          if (userRes.ok) {
            const udata = await userRes.json();
            setUserData(udata);
            setFormData(udata || {});
          }
        } catch (e) {
          console.error("Failed to fetch user data", e);
        }

        // 2) fetch purchased dojos - be permissive about returned shape
        let purchasedRaw: any = null;
        try {
          const pRes = await fetch("/api/purchased-dojos");
          if (!pRes.ok) {
            const alt = await fetch("/api/user/purchases");
            if (alt.ok) purchasedRaw = await alt.json();
            else purchasedRaw = null;
          } else purchasedRaw = await pRes.json();
        } catch (err) {
          console.error("Failed fetching purchased dojos", err);
          purchasedRaw = null;
        }

        // normalize purchased list into an array
        let purchasedArray: any[] = [];
        if (!purchasedRaw) purchasedArray = [];
        else if (Array.isArray(purchasedRaw)) purchasedArray = purchasedRaw;
        else if (Array.isArray(purchasedRaw.purchased)) purchasedArray = purchasedRaw.purchased;
        else if (Array.isArray(purchasedRaw.items)) purchasedArray = purchasedRaw.items;
        else if (Array.isArray(purchasedRaw.purchases)) purchasedArray = purchasedRaw.purchases;
        else purchasedArray = [];
        
        type Course = {
          id: string;
          title: string;
          description?: string;
          thumbnail?: string;
          price?: number;
          link?: string;
        };

        // Resolve purchasedArray elements into full dojo objects
        const resolved = await Promise.all(
          purchasedArray.map(async (el: any) => {
            if (typeof el === "string" || typeof el === "number") {
              const id = String(el);
              const local = getDojoFromCategories(id);
              if (local) {
                return {
                  id: local.id ?? local.name,
                  title: local.name,
                  description: local.description ?? undefined,
                  thumbnail: local.image ?? local.thumbnail ?? "/images/placeholder.png",
                  price: local.price ?? 0,
                  link: local.link ?? `/projects/${id}`,
                };
              }

              try {
                const byId = await fetch(`/api/dojo/${encodeURIComponent(id)}`);
                if (byId.ok) {
                  const d = await byId.json();
                  return {
                    id: d.id ?? id,
                    title: d.title ?? d.name ?? id,
                    description: d.description ?? undefined,
                    thumbnail: d.thumbnail ?? d.image ?? "/images/placeholder.png",
                    price: d.price ?? 0,
                    link: d.link ?? `/projects/${id}`,
                  };
                }
              } catch {}

              return {
                id,
                title: id,
                description: undefined,
                thumbnail: "/images/placeholder.png",
                price: 0,
                link: `/projects/${id}`,
              };
            }

            if (typeof el === "object" && el !== null) {
              if (el.dojo && typeof el.dojo === "object") {
                const d = el.dojo;
                return {
                  id: d.id ?? el.dojoId ?? el.id,
                  title: d.title ?? d.name ?? el.title ?? el.id,
                  description: d.description ?? undefined,
                  thumbnail: d.thumbnail ?? d.image ?? "/images/placeholder.png",
                  price: d.price ?? el.price ?? 0,
                  link: d.link ?? `/projects/${d.id ?? el.id}`,
                };
              }

              const id = el.id ?? el.dojoId ?? el.slug ?? el.name;
              const local = id ? getDojoFromCategories(String(id)) : null;
              if (local) {
                return {
                  id: local.id ?? local.name,
                  title: local.name,
                  description: local.description ?? undefined,
                  thumbnail: local.image ?? local.thumbnail ?? "/images/placeholder.png",
                  price: local.price ?? 0,
                  link: local.link ?? `/projects/${local.id ?? id}`,
                };
              }

              return {
                id: id ?? String(Math.random()).slice(2),
                title: el.title ?? el.name ?? id ?? "Untitled",
                description: el.description ?? el.summary ?? undefined,
                thumbnail: el.thumbnail ?? el.image ?? "/images/placeholder.png",
                price: el.price ?? 0,
                link: el.link ?? `/projects/${id}`,
              };
            }

            return null;
          })
        );

        // Filter out nulls and cast to Course[]
        const filteredResolved: Course[] = resolved.filter(
          (x): x is Course => x !== null
        );

        setCourses(filteredResolved);

      } catch (err) {
        console.error("Error in fetchAll", err);
      }
    }

    fetchAll();
  }, [session?.user?.email, status, router]);

  // form helpers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updated = await res.json();
        setUserData(updated);
        setEditMode(false);
      } else {
        alert("Failed to save info");
      }
    } catch (e) {
      console.error("Failed to save", e);
      alert("Failed to save info");
    }
  };

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100">
          <p className="text-lg">Loading session...</p>
        </div>
      </>
    );
  }

  if (!session) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100">
          <p className="text-lg">Please log in to view your profile.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen relative bg-gradient-to-br from-indigo-200 via-gray-100 to-blue-200">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/grid.svg')",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative p-6 pt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Column */}
            <div className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl p-6 col-span-1 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-900">User Description</h2>

              {userData ? (
                <div className="space-y-3 text-black">
                  <p>
                    <strong>Name:</strong> {userData.name || "—"}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email || "—"}
                  </p>

                  {showFullInfo && (
                    <>
                      {editMode ? (
                        <>
                          {["phone", "college", "education", "branch", "year", "company"].map(
                            (field) => (
                              <input
                                key={field}
                                type="text"
                                name={field}
                                value={formData[field] || ""}
                                onChange={handleChange}
                                placeholder={field[0].toUpperCase() + field.slice(1)}
                                className="w-full border rounded px-2 py-1"
                              />
                            )
                          )}
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </>
                  )}

                  <div className="mt-4 flex flex-col space-y-2">
                    <button
                      onClick={() => setShowFullInfo(!showFullInfo)}
                      className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 px-4 rounded-lg shadow hover:from-gray-600 hover:to-gray-700 transition"
                    >
                      {showFullInfo ? "Hide Info" : "Full Info"}
                    </button>

                    {showFullInfo && (
                      <>
                        {editMode ? (
                          <button
                            onClick={handleSave}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg shadow hover:from-green-600 hover:to-green-700 transition"
                          >
                            Save Info
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditMode(true)}
                            className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 px-4 rounded-lg shadow hover:from-gray-600 hover:to-gray-700 transition"
                          >
                            Edit Info
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-800">Badges</h3>
                    {userData.badges && userData.badges.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {userData.badges.map((badge: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mt-1">No badges earned yet.</p>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col space-y-3">
                    <button
                      onClick={() => router.push("/")}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition"
                    >
                      Go to Home
                    </button>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg shadow hover:from-red-600 hover:to-red-700 transition"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <p>Loading user info...</p>
              )}
            </div>

            {/* Purchased Dojos Column */}
            <div className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl p-6 col-span-2 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Your Purchased Dojos</h2>

              {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((dojo, idx) => (
                    <div key={dojo.id ?? idx} className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition bg-white border">
                      <img src={dojo.thumbnail || "/images/placeholder.png"} alt={dojo.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-900">{dojo.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{dojo.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-green-600 font-bold">
                            {dojo.price === 0 ? "Free" : `₹${dojo.price}`}
                          </span>
                          <Link href={dojo.link || `/projects/${dojo.id}`}>
                            <button className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:from-indigo-600 hover:to-indigo-700 transition">
                              Start Dojo
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-600">
                  <img src="/images/SIGH.png" alt="No courses" className="w-64 h-64 object-contain opacity-80" />
                  <p className="mt-4 text-lg font-medium">You haven’t subscribed to any courses yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
