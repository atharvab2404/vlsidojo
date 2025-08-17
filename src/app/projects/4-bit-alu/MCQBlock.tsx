"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const MCQBlock = () => {
  const questions: Question[] = [
    {
      question: "Which unit performs arithmetic operations in the design?",
      options: ["Control Unit", "Arithmetic and Logical Unit", "Instruction Decoder"],
      answer: "Arithmetic and Logical Unit",
    },
    {
      question: "What role does the opcode play in the flow?",
      options: [
        "It sets the clock frequency",
        "It selects one result via the mux",
        "It generates power signals",
      ],
      answer: "It selects one result via the mux",
    },
    {
      question: "Which flag indicates whether the result is zero?",
      options: ["Cout", "Zf", "OF"],
      answer: "Zf",
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
      <h4 className="text-lg font-semibold mb-4">Quick Check</h4>

      <Card
        className="p-6 rounded-2xl shadow-lg hover:shadow-[0_0_25px_rgba(0,0,255,0.4)] 
                   transition-shadow duration-300 bg-blue-100"
      >
        <CardContent>
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
        </CardContent>
      </Card>
    </section>
  );
};

export default MCQBlock;
