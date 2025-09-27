"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const MCQBlock = () => {
  const questions: Question[] = [
    {
      question: "If the SIMD ALU processes two 16-bit operations in parallel, then providing it with a 32-bit input effectively means:",
      options: ["Each 32-bit value is treated as a single operand, processed sequentially.", "Each 32-bit value is split into two 16-bit segments, and operations are performed simultaneously on these segments.", "The ALU internally reduces 32-bit inputs into 8-bit sub-operations."],
      answer: "Each 32-bit value is split into two 16-bit segments, and operations are performed simultaneously on these segments.",
    },
    {
      question: "If two back-to-back ALU instructions are issued, what happens in this non-pipelined design?",
      options: [
        "The second waits until the first fully completes",
        "Both overlap in execution after decode",
        "The ALU automatically parallelizes both",
      ],
      answer: "The second waits until the first fully completes",
    },
    {
      question: "If the opcode is invalid (not mapped to any ALU function), what should the processor ideally do?",
      options: ["Halt immediately without recovery", 
        "Execute the previous instruction again", 
        "Treat it as NOP (no operation)"],
      answer: "Treat it as NOP (no operation)",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, boolean>>({});

  const handleSelect = (option: string) => {
    setSelected((prev) => ({ ...prev, [currentIndex]: option }));
    setFeedback((prev) => ({
      ...prev,
      [currentIndex]: option === questions[currentIndex].answer,
    }));
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const currentQuestion = questions[currentIndex];
  const isSelected = selected[currentIndex];
  const isCorrect = feedback[currentIndex];

  return (
    <section className="mt-6">
      <h4 className="text-lg inter-subheading text-slate-900 tracking-tight mb-4">Quick Check</h4>

      {/* Main container with mascot aligned right middle */}
      <div className="p-6 rounded-2xl bg-blue-100 shadow-lg hover:shadow-[0_0_25px_rgba(0,0,255,0.4)] transition-shadow duration-300 flex justify-between items-center">
        
        {/* Left side - Question + Options */}
        <div className="flex-1 mr-6">
          <p className="font-medium text-lg mb-4 text-gray-800">{currentQuestion.question}</p>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const selectedOption = isSelected === option;

              return (
                <motion.div
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-colors font-medium ${
                    selectedOption
                      ? isCorrect
                        ? "bg-green-200 border-green-400 text-gray-800"
                        : "bg-red-200 border-red-400 text-gray-800"
                      : "bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <span>{option}</span>
                  {selectedOption &&
                    (isCorrect ? (
                      <CheckCircle className="text-green-600 w-5 h-5" />
                    ) : (
                      <XCircle className="text-red-600 w-5 h-5" />
                    ))}
                </motion.div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="flex items-center text-gray-700 hover:text-gray-900 disabled:text-gray-400"
            >
              <ChevronLeft className="w-5 h-5 mr-1" /> Previous
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex === questions.length - 1}
              className="flex items-center text-gray-700 hover:text-gray-900 disabled:text-gray-400"
            >
              Next <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>

          {/* Progress */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            Question {currentIndex + 1} of {questions.length}
          </div>
        </div>

        {/* Right side - Mascot (transparent PNG, vertically centered) */}
        <div className="w-40 flex-shrink-0 flex justify-center">
          <Image
            src="/images/quiz.png" // transparent PNG
            alt="Mascot"
            width={160}
            height={160}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default MCQBlock;
