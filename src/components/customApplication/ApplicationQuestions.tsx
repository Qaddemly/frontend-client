import { useApplication } from "../../context/ApplicationContext";
import Select from "../common/Select";
import InputField from "../common/InputField";
import Input from "../common/Input";

function ApplicationQuestions() {
  const { answers, setAnswers } = useApplication();

  const questions = [
    {
      id: 1,
      text: "First question the business want?",
      type: "multiple-choice",
      options: ["Option 1", "Option 2", "Option 3"],
    },
    { id: 2, text: "Second question the business want?", type: "long-answer" },
    { id: 3, text: "Third question the business want?", type: "short-answer" },
  ];

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionId - 1] = value; // Subtract 1 from questionId
      return newAnswers;
    });
  };

  return (
    <>
      {questions.map((question) => (
        <div key={question.id} className="flex flex-col gap-2">
          <label className="text-lg font-medium">{question.text}</label>
          {question.type === "multiple-choice" ? (
            <div className="flex flex-col gap-2">
              <Select
                value={answers[question.id - 1] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
              >
                {/* TODO : solve option 1  problem  */}
                <option value="" disabled>
                  Select an option
                </option>
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
                value={answers[question.id - 1] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
              />
            </InputField>
          )}
        </div>
      ))}
    </>
  );
}

export default ApplicationQuestions;
