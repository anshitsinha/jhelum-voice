"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase (Replace with your actual Supabase URL and Key)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const questions = [
  {
    question: "What’s a fair way to ensure transparency in mess expenses?",
    options: [
      "Weekly reports",
      "WhatsApp updates",
      "Notice board updates",
      "Meetings",
      "All of the above",
    ],
    customOption: "Other (please specify)",
    estimatedTime: 40,
  },
  {
    question:
      "If given the option, would you like to see mess purchase invoices every time new stock is ordered?",
    options: ["Yes", "No, don’t care", "Maybe, if simplified"],
    customOption: "Other (please specify)",
    estimatedTime: 30,
  },
  {
    question:
      "How do you feel about paying above the market rates for additional items, ₹7 for an egg when the bulk market rate is ₹6?",
    options: [
      "Prefer better negotiation with vendor to keep costs low",
      "Never realized it before",
      "Acceptable if justified",
    ],
    customOption: "Other (please specify)",
    estimatedTime: 30,
  },

  {
    question:
      "Have you ever avoided the mess food because it was too repetitive?",
    options: ["Yes, often", "Sometimes", "No, I like the consistency"],
    customOption: "Other (please specify)",
    estimatedTime: 30,
  },
  {
    question:
      "If given a choice, would you prefer a fixed menu or a rotating one that changes based on student feedback?",
    options: [
      "Rotating menu",
      "Fixed menu",
      "Hybrid model – some fixed, some rotating",
    ],
    customOption: "Other (please specify)",
    estimatedTime: 35,
  },
  {
    question:
      'Instead of just "paneer", would you support adding more diverse options on veg days?',
    options: ["Yes", "No", "Didn’t think about it before, but sounds good"],
    customOption: "Other (please specify)",
    estimatedTime: 30,
  },
  {
    question: "How do you feel about special dinner?",
    options: [
      "Exciting & should be regular",
      "Once in a while is enough",
      "Not needed, focus on daily food instead",
    ],
    customOption: "Other (please specify)",
    estimatedTime: 40,
  },
  {
    question:
      "What do you think about having a monthly state-based special dinner to celebrate India's cultural diversity?",
    options: [
      "I think it's a great idea and should be a regular event",
      "It's a nice idea, but should be occasional",
      "Not needed, daily meals should be the priority",
    ],
    customOption: "Other (please specify)",
    estimatedTime: 40,
  },
  {
    question: "Are the plates cleaned properly in the mess?",
    options: ["Yes", "No", "Sometimes, but needs improvement"],
    customOption: "Other (please specify)",
    estimatedTime: 25,
  },
  {
    question:
      "How often do you use the water coolers, and do you trust their hygiene?",
    options: [
      "Every day, but worried about hygiene",
      "Sometimes, depends on cleanliness",
      "Rarely, prefer bottled water",
    ],
    customOption: "Other (please specify)",
    estimatedTime: 35,
  },
  {
    question:
      'Would you support a visible "Last Filter Change" date sticker on water coolers to ensure regular maintenance?',
    options: ["Yes", "No, unnecessary", "Maybe, if enforced properly"],
    customOption: "Other (please specify)",
    estimatedTime: 25,
  },
  {
    question:
      "Have you ever taken food in the mess but ended up not eating it because of quality issues?",
    options: ["Yes, often", "Sometimes", "No, I always finish my food"],
    customOption: "Other (please specify)",
    estimatedTime: 30,
  },
  {
    question:
      "What do you think is the biggest reason for food wastage in the mess?",
    options: [
      "Food quality issues",
      "People take extra & don’t finish",
      "All of the above",
    ],
    customOption: "Other (please specify)",
    estimatedTime: 35,
  },

  {
    question: "What’re the things you’d like changed about the mess?",
    options: ["Share any suggestions"],
    customOption: "Other (please specify)",
    estimatedTime: 40,
  },
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [customAnswers, setCustomAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleAnswer = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      setAnswers([...answers, selectedOption]);
      setCustomAnswers({
        ...customAnswers,
        [currentQuestion]: customAnswers[currentQuestion],
      });
      setSelectedOption(null);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSurveyCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleCustomChange = (e) => {
    const value = e.target.value;
    setCustomAnswers({ ...customAnswers, [currentQuestion]: value });
  };

  const startSurvey = () => {
    setSurveyStarted(true);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const responseData = {
      answers,
      customAnswers,
      submitted_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("survey_responses").insert([
      {
        answers: JSON.stringify(responseData.answers),
        custom_answers: JSON.stringify(responseData.customAnswers),
        submitted_at: responseData.submitted_at,
      },
    ]);

    if (error) {
      console.error("Error submitting survey:", error);
    } else {
      console.log("Survey submitted:", data);
      setSurveyCompleted(true);
    }
    setSubmitting(false);
  };

  const progressPercentage = (currentQuestion / questions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 py-12">
      <div className="max-w-2xl w-full p-8 bg-white shadow-2xl rounded-xl border border-gray-100">
        {/* Survey Start */}
        {!surveyStarted && (
          <div className="text-center">
            <h1 className="text-4xl font-extrabold mb-6 text-blue-700">
              Mess Issues
            </h1>
            <p className="text-lg mb-6 text-gray-700">
            Please take a minute to fill out this anonymous form. Your input will help shape my manifesto, and with your support, I&apos;ll work with the mess committee to improve things for all of us.
            </p>
            <p className="text-lg mb-6 text-gray-600">
              Estimated time to complete:{" "}
              <span className="font-semibold text-gray-800">1 minute</span>
            </p>
            <button
              className="bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 transform hover:bg-blue-800 hover:scale-105"
              onClick={startSurvey}
            >
              Start Survey
            </button>
          </div>
        )}

        {/* Survey Questions */}
        {surveyStarted && !surveyCompleted && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl mb-6 font-semibold text-gray-800">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full py-3 px-6 rounded-md text-lg font-medium text-gray-800 border border-gray-300 hover:bg-blue-700 hover:text-white transition duration-200 transform ${
                      selectedOption === option
                        ? "bg-blue-700 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder={questions[currentQuestion].customOption}
                    value={customAnswers[currentQuestion] || ""}
                    onChange={handleCustomChange}
                    className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Navigation and Progress */}
            <div className="flex justify-between items-center mt-8">
              <div className="w-1/3">
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg text-lg transition duration-200 transform hover:bg-gray-600"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
              </div>

              <div className="w-1/3 flex justify-center">
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="w-1/3 flex justify-end">
                <button
                  className="bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 transform hover:bg-blue-800 hover:scale-105"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {/* Survey Completion */}
        {surveyCompleted && (
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-blue-700 mb-6">
              Great!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for your valuable input. Your responses will help us
              make the mess better for everyone!
            </p>
            <button
              className="bg-blue-700 text-white py-3 px-6 rounded-lg mt-8 text-lg font-semibold transition duration-300 transform hover:bg-blue-800 hover:scale-105"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
