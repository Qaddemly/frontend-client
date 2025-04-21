import { useState } from "react";
import { useApplication } from "../../context/ApplicationContext";
import Select from "../common/Select";
import InputField from "../common/InputField";
import Input from "../common/Input";

interface ApplicationQuestionsProps {
  prevStep: () => void;
}

function ApplicationQuestions({ prevStep }: ApplicationQuestionsProps) {
  const { answers, setAnswers } = useApplication(); //  jobId
  const [currentAnswers, setCurrentAnswers] =
    useState<Record<string, string>>(answers);

  const questions = [
    {
      id: 1,
      text: "First question the business want?",
      type: "multiple-choice",
      options: ["Option 1", "Option 2"],
    },
    { id: 2, text: "Second question the business want?", type: "long-answer" },
    { id: 3, text: "Third question the business want?", type: "short-answer" },
  ];

  const handleAnswerChange = (questionId: number, value: string) => {
    setCurrentAnswers((prev) => ({
      ...prev,
      [questionId.toString()]: value,
    }));
  };

  const handleSubmit = () => {
    setAnswers(currentAnswers);
    // Here you would submit the application to the API
    console.log("Submitting application with answers:", currentAnswers);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-center text-3xl font-bold">Application Questions</h2>
      {questions.map((question) => (
        <div key={question.id} className="flex flex-col gap-2">
          <label className="text-lg font-medium">{question.text}</label>
          {question.type === "multiple-choice" ? (
            <div className="flex flex-col gap-2">
              <Select
                name={`question-${question.id}`}
                value={currentAnswers[question.id.toString()] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
              >
                {question.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
          ) : (
            <InputField
              id={`question-${question.id}`}
              props={{ className: "w-full" }}
            >
              <Input
                props={{
                  type: "text",
                  id: `question-${question.id}`,
                  placeholder: "Enter your answer",
                }}
                value={currentAnswers[question.id.toString()] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
              />
            </InputField>
          )}
        </div>
      ))}
    </div>
  );
}

export default ApplicationQuestions;
