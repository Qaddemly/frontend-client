import { useState } from "react";
import Button from "../../common/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Select from "../../common/Select.tsx";
import Input from "../../common/Input.tsx";
import { Iquestion } from "../../../interfaces/BusinessDashboard.interfaces.ts";

function PostJobQuestions({
  questions,
  setQuestions,
  onSubmit,
  onBack,
}: {
  questions: Iquestion[];
  setQuestions: React.Dispatch<React.SetStateAction<Iquestion[]>>;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const [questionType, setQuestionType] = useState<
    "short_answer" | "multiple_choice"
  >("short_answer");
  const [questionInput, setQuestionInput] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [answerInput, setAnswerInput] = useState("");

  const handleAddQuestion = () => {
    if (!questionInput.trim()) {
      return;
    }

    const newQuestion: Iquestion = {
      questionText: questionInput,
      questionType: questionType,
      options: questionType === "multiple_choice" ? answers : [],
      isRequired: true, // Default to true as per requirements
    };

    setQuestions([...questions, newQuestion]);
    resetQuestionForm();
  };

  const resetQuestionForm = () => {
    setQuestionInput("");
    setAnswers([]);
    setAnswerInput("");
  };

  const handleAddAnswer = () => {
    if (answerInput.trim()) {
      setAnswers([...answers, answerInput.trim()]);
      setAnswerInput("");
    }
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleRemoveAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  return (
    <div className="m-auto w-1/2 text-center">
      <h3 className="mb-6 text-2xl font-semibold">Add Application Questions</h3>

      <div className="bg-gray-50 mb-6 rounded-lg p-4 shadow-sm">
        <div className="mb-4">
          <label
            htmlFor="questionType"
            className="mb-2 block font-medium text-gray-700"
          >
            Question Type
          </label>
          <Select
            className="w-full"
            value={questionType}
            onChange={(e) => {
              setQuestionType(
                e.target.value as "short_answer" | "multiple_choice",
              );
              resetQuestionForm();
            }}
          >
            <option value="short_answer">Short answer</option>
            <option value="multiple_choice">Multiple choice</option>
          </Select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="question"
            className="mb-2 block font-medium text-gray-700"
          >
            Question Text
          </label>
          <div className="flex gap-2">
            <Input
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              props={{
                id: "question",
                type: "text",
                placeholder: "Enter your question",
                className: "flex-1",
              }}
            />
          </div>
        </div>

        {questionType === "multiple_choice" && (
          <div className="mb-4">
            <label
              htmlFor="answers"
              className="mb-2 block font-medium text-gray-700"
            >
              Answers
            </label>
            <div className="mb-2 flex gap-2">
              <Input
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
                props={{
                  id: "answer",
                  type: "text",
                  placeholder: "Enter an answer option",
                  className: "flex-1",
                }}
              />
              <Button
                type="button"
                onClick={handleAddAnswer}
                className="cursor-pointer px-4 py-2"
                disabled={!answerInput.trim()}
              >
                Add Answer
              </Button>
            </div>

            {answers.length > 0 && (
              <div className="space-y-2">
                {answers.map((answer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md bg-gray-100 px-3 py-2"
                  >
                    <span>{answer}</span>
                    <Button
                      type="button"
                      onClick={() => handleRemoveAnswer(index)}
                      className="bg-none text-danger-200 hover:text-danger-300"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <Button
          type="button"
          onClick={handleAddQuestion}
          className="w-full"
          disabled={
            !questionInput.trim() ||
            (questionType === "multiple_choice" && answers.length === 0)
          }
        >
          Add Question
        </Button>
      </div>

      {questions.length > 0 && (
        <div className="mb-8">
          <h4 className="mb-4 text-xl font-semibold">Added Questions</h4>
          <ul className="space-y-3">
            {questions.map((question, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-medium">
                    {question.questionText}
                    {question.questionType === "multiple_choice" && (
                      <span className="ml-2 text-sm text-gray-500">
                        (Multiple choice)
                      </span>
                    )}
                  </p>
                  {question.questionType === "multiple_choice" &&
                    question.options.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {question.options.map((option, i) => (
                          <li key={i} className="text-sm text-gray-600">
                            • {option}
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
                <Button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="bg-none text-danger-200 hover:text-danger-300"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="button" className="w-full" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          className="w-full"
          onClick={onSubmit}
          disabled={questions.length === 0}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default PostJobQuestions;
