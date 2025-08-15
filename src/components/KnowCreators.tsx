import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

export default function KnowCreators() {
  const creators = [
    {
      name: "Atharva Bhawsar",
      role: "CPU Cores DV, Intel India",
      bio: "John brings over a decade of experience in VLSI design and education. He is passionate about bridging the gap between academia and industry through hands-on learning.",
      img: "/creators/atharva.jpeg",
      linkedin: "https://www.linkedin.com/in/atharva-bhawsar-30a17b228/",
    },
    {
      name: "Anushka Srivastava",
      role: "Silicon Design Engineer (GFX), AMD India",
      bio: "Jane specializes in building scalable platforms for technical education. She leads the development of interactive learning tools for VLSI Dojo.",
      img: "/creators/anushka.jpeg",
      linkedin: "https://www.linkedin.com/in/anushkasriv/",
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      {/* Banner */}
      <div
        className="relative w-full h-20 flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('/banner-tech.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <h2 className="relative text-white text-2xl font-semibold z-10">
          Meet the Founders
        </h2>
      </div>

      {/* Creators Grid */}
      <div className="container mx-auto px-4 mt-10">
        <div className="flex justify-center gap-8 flex-wrap">
          {creators.map((creator, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 w-80 text-center flex flex-col items-center"
            >
              {/* Image */}
              <div className="w-32 h-32 relative">
                <Image
                  src={creator.img}
                  alt={creator.name}
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="mt-4 text-lg font-bold text-black">
                {creator.name}
              </h3>

              {/* Role */}
              <p className="italic text-gray-600 text-sm">{creator.role}</p>

              {/* Bio */}
              <p className="mt-3 text-gray-700 text-sm">{creator.bio}</p>

              {/* Socials */}
              <div className="flex gap-4 mt-auto pt-4">
                <a
                  href={creator.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-lg"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
