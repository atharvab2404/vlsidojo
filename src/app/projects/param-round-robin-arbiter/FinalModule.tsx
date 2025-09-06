"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";
import CalloutBox from "./CalloutBox";

export default function FinalModule({ readModules, handleCheckboxChange, setModule }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-red-100 to-yellow-100 p-6">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 text-center">
                🎉 Congratulations! 🎉
            </h1>

            <p className="text-lg text-slate-700 mb-8 text-center max-w-md">
                You’ve successfully completed this Dojo project. Great job building, learning, 
                and making progress!
            </p>

            <img
                src="/images/final.png"   // 👈 put your image inside public/images/
                alt="Celebration"
                className="w-72 h-auto rounded-2xl shadow-lg mb-10"
            />
        </div>
        
    </div>
  );
}
