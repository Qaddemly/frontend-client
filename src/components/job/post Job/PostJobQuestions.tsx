import { useState } from "react";
import Button from "../../common/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Select from "../../common/Select.tsx";
import Input from "../../common/Input.tsx";

function PostJobQuestions() {
  const [questionType, setQuestionType] = useState("Short answer");
  const [questions, setQuestions] = useState<string[]>([]);
  const [questionInput, setQuestionInput] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [answerInput, setAnswerInput] = useState("");

  const handleAdd = (type: "question" | "answer") => {
    if (questionInput.trim() && type === "question") {
      setQuestions([...questions, questionInput]);
      setQuestionInput("");
    } else {
      setAnswers([...answers, answerInput]);
      setAnswerInput("");
    }
  };

  const handleRemove = (index: number, type: "question" | "answer") => {
    if (type === "question")
      setQuestions(questions.filter((_, i) => i !== index));
    else setAnswers(answers.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="m-auto w-1/2 text-center">
        <Select
          className="mb-5"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option>Short answer</option>
          <option>Multi answers</option>
        </Select>

        <div className="mb-5 flex gap-3">
          <Input
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            props={{
              id: "question",
              type: "text",
              placeholder: "Enter your question",
            }}
          />
          <Button
            className="px-3"
            type="button"
            onClick={() => handleAdd("question")}
          >
            Add
          </Button>
        </div>

        {questionType === "Multi answers" && (
          <div className="mb-5 flex gap-3">
            <Input
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              props={{
                id: "answer",
                type: "text",
                placeholder: "Enter your answer",
              }}
            />
            <Button
              className="px-3"
              type="button"
              onClick={() => handleAdd("answer")}
            >
              Add
            </Button>
          </div>
        )}

        <div className="mb-8">
          {questions.length > 0 && (
            <p className="pt-5 font-medium text-gray-600">Questions</p>
          )}
          <ul className="space-y-3">
            {questions.map((question, index) => (
              <li
                key={index}
                className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
              >
                <p>{question}</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer text-xl"
                  onClick={() => handleRemove(index, "question")}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          {answers.length > 0 && (
            <p className="pt-5 font-medium text-gray-600">Answers</p>
          )}
          <ul className="space-y-3">
            {answers.map((question, index) => (
              <li
                key={index}
                className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
              >
                <p>{question}</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer text-xl"
                  onClick={() => handleRemove(index, "answer")}
                />
              </li>
            ))}
          </ul>
        </div>
        {/* TODO: handle submit with backend */}
        <Button className="w-full">Submit</Button>
      </div>
    </>
  );
}

export default PostJobQuestions;
