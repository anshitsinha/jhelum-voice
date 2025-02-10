"use client";

import { useState, useEffect } from "react";

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
      "How do you feel about paying extra for bulk ingredients, like paying ₹7 for an egg when the market rate for bulk purchases is ₹6?",
    options: [
      "Annoying",
      "Never realized it before",
      "Acceptable if justified",
    ],
    customOption: "Other (please specify)",
    estimatedTime: 30,
  },
  {
    question: "What’s a fair way to ensure transparency in mess expenses?",
    options: [
      "Weekly reports",
      "WhatsApp updates",
      "Notice board updates",
      "Meetings",
    ],
    customOption: "Other (please specify)",
    estimatedTime: 40,
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
    question:
      "What’s the one thing you’d change about the mess if given the chance?",
    options: ["Open-ended"],
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

  const handleSubmit = () => {
    console.log("Survey answers:", answers);
    console.log("Custom answers:", customAnswers);
    setSurveyCompleted(true);
  };

  const handleCustomChange = (e) => {
    const value = e.target.value;
    setCustomAnswers({ ...customAnswers, [currentQuestion]: value });
  };

  const startSurvey = () => {
    setSurveyStarted(true);
  };

  const progressPercentage = (currentQuestion / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white text-gray-800 rounded-lg shadow-lg">
      {!surveyStarted && (
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-6 text-blue-700">
            Mess Transparency Survey
          </h1>
          <p className="text-lg mb-6">
            Your feedback is crucial in improving the mess services for all
            residents. This survey is designed to collect your valuable insights
            to ensure fairness, transparency, and a more diverse menu. Please
            take a moment to share your thoughts.
          </p>
          <p className="text-lg mb-6">
            Estimated time to complete:{" "}
            <span className="font-semibold">3 minutes</span>
          </p>
          <button
            className="bg-blue-700 text-white py-2 px-4 rounded-lg"
            onClick={startSurvey}
          >
            Start Survey
          </button>
        </div>
      )}

      {surveyStarted && !surveyCompleted && (
        <>
          <div className="mb-6">
            <h2 className="text-2xl mb-4">
              {questions[currentQuestion].question}
            </h2>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full py-2 px-4 rounded-md text-gray-700 hover:bg-blue-700 hover:text-white transition duration-200 ${
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div
            className="flex justify-between items-center"
            style={{ minHeight: "60px" }}
          >
            <div className="w-1/3">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
            </div>

            <div className="w-1/3 flex justify-center">
              {/* Progress Bar */}
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="w-1/3 flex justify-end">
              <button
                className="bg-blue-700 text-white py-2 px-4 rounded-lg"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {surveyCompleted && (
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-blue-700">
            Survey Complete!
          </h1>
          <p className="text-lg mt-6">
            Thank you for sharing your valuable feedback. Your responses will
            help us make the mess better for everyone!
          </p>
        </div>
      )}
    </div>
  );
}
