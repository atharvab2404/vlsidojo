// "use client";

// import { signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar"; // ✅ Import your Navbar component

// export default function ProfilePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     if (status === "loading") return;

//     if (!session?.user?.email) {
//       // if not logged in, redirect to homepage
//       router.push("/");
//     } else {
//       // fetch user data from API (stored in db)
//       const fetchUserData = async () => {
//         const res = await fetch(`/api/user/${session.user?.email}`);
//         if (res.ok) {
//           const data = await res.json();
//           setUserData(data);
//         }
//       };

//       fetchUserData();
//     }
//   }, [session, status, router]);

//   if (!session) {
//     return (
//       <>
//         <Navbar />
//         <div className="flex justify-center items-center h-screen">
//           <p>Please log in to view your profile.</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       {/* ✅ Navbar always visible at the top */}
//       <Navbar />

//       <div className="flex flex-col items-center justify-center min-h-screen p-6">
//         <h1 className="text-2xl font-bold mb-6">User Profile</h1>

//         {userData ? (
//           <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
//             {/* Profile Image */}
//             <img
//               src={userData.image || "/default-avatar.png"}
//               alt="User Avatar"
//               className="w-24 h-24 rounded-full mx-auto mb-4"
//             />

//             {/* User Info */}
//             <div className="space-y-2 text-gray-800">
//               <p>
//                 <strong>Name:</strong> {userData.name || "—"}
//               </p>
//               <p>
//                 <strong>Email:</strong> {userData.email || "—"}
//               </p>
//               <p>
//                 <strong>Email Verified:</strong>{" "}
//                 {userData.emailVerified
//                   ? new Date(userData.emailVerified).toLocaleDateString()
//                   : "Not verified"}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {userData.phone || "—"}
//               </p>
//               <p>
//                 <strong>College:</strong> {userData.college || "—"}
//               </p>
//               <p>
//                 <strong>Education:</strong> {userData.education || "—"}
//               </p>
//               <p>
//                 <strong>Branch:</strong> {userData.branch || "—"}
//               </p>
//               <p>
//                 <strong>Year:</strong> {userData.year || "—"}
//               </p>
//               <p>
//                 <strong>Company:</strong> {userData.company || "—"}
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="mt-6 flex flex-col space-y-3">
//               <button
//                 onClick={() => router.push("/")}
//                 className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//               >
//                 Go to Home
//               </button>
//               <button
//                 onClick={() => signOut({ callbackUrl: "/" })}
//                 className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
//               >
//                 Log Out
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p>Loading user info...</p>
//         )}
//       </div>
//     </>
//   );
// }
"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user?.email) {
      router.push("/");
    } else {
      const fetchUserData = async () => {
        const res = await fetch(`/api/user/${session.user?.email}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);

          if (data.courses) setCourses(data.courses);
        }
      };
      fetchUserData();
    }
  }, [session, status, router]);

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

      {/* Background */}
      <div className="min-h-screen relative bg-gradient-to-br from-indigo-200 via-gray-100 to-blue-200">
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/grid.svg')",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ✅ Profile Section */}
            <div className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl p-6 col-span-1 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                User Description
              </h2>

              {userData ? (
                <div className="space-y-3 text-black">
                  <p><strong>Name:</strong> {userData.name || "—"}</p>
                  <p><strong>Email:</strong> {userData.email || "—"}</p>
                  <p><strong>Phone:</strong> {userData.phone || "—"}</p>
                  <p><strong>College:</strong> {userData.college || "—"}</p>
                  <p><strong>Education:</strong> {userData.education || "—"}</p>
                  <p><strong>Branch:</strong> {userData.branch || "—"}</p>
                  <p><strong>Year:</strong> {userData.year || "—"}</p>
                  <p><strong>Company:</strong> {userData.company || "—"}</p>

                  {/* ✅ Badges */}
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
                      <p className="text-sm text-gray-500 mt-1">
                        No badges earned yet.
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
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

            {/* ✅ Subscribed Courses Section */}
            <div className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl p-6 col-span-2 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                Subscribed Courses
              </h2>

              {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course, idx) => (
                    <div
                      key={idx}
                      className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
                    >
                      <h3 className="font-semibold text-lg text-gray-900">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {course.description}
                      </p>
                      <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-medium">
                        {course.status || "LIVE"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-600">
                  <img
                    src="images/SIGH.png"
                    alt="No courses"
                    className="w-64 h-64 object-contain opacity-80"
                  />
                  <p className="mt-4 text-lg font-medium">
                    You haven’t subscribed to any courses yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
