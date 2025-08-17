"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

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

  const [selected, setSelected] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, boolean>>({});

  const handleSelect = (qIndex: number, option: string) => {
    setSelected((prev) => ({ ...prev, [qIndex]: option }));
    setFeedback((prev) => ({
      ...prev,
      [qIndex]: option === questions[qIndex].answer,
    }));
  };

  return (
    <section className="mt-6">
      <h4 className="text-lg font-semibold mb-3">Quick Check</h4>
      <div className="space-y-4">
        {questions.map((q, qIndex) => (
          <Card
            key={qIndex}
            className="p-4 rounded-2xl shadow-md border border-gray-200"
          >
            <CardContent>
              <p className="font-medium mb-2">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((option, oIndex) => {
                  const isSelected = selected[qIndex] === option;
                  const isCorrect = feedback[qIndex];

                  return (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      key={oIndex}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border ${
                        isSelected
                          ? isCorrect
                            ? "bg-green-100 border-green-400"
                            : "bg-red-100 border-red-400"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => handleSelect(qIndex, option)}
                    >
                      <span>{option}</span>
                      {isSelected &&
                        (isCorrect ? (
                          <CheckCircle className="text-green-600 w-5 h-5" />
                        ) : (
                          <XCircle className="text-red-600 w-5 h-5" />
                        ))}
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MCQBlock;
