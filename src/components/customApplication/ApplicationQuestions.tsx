import { useApplication } from "../../context/ApplicationContext";
import Select from "../common/Select";
import InputField from "../common/InputField";
import Input from "../common/Input";
import { IQuestion } from "../../interfaces/Job.interfaces.ts";

function ApplicationQuestions({ questions }: { questions: IQuestion[] }) {
  const { answers, setAnswers } = useApplication();

  const handleAnswerChange = (question: IQuestion, value: string) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(
      (ans) => ans.question._id === question._id,
    );

    const newAnswer = { question, answer: value };

    if (existingIndex !== -1) {
      newAnswers[existingIndex] = newAnswer;
    } else {
      newAnswers.push(newAnswer);
    }

    setAnswers(newAnswers);
  };

  const getAnswerValue = (questionId: string) => {
    return answers.find((ans) => ans.question._id === questionId)?.answer || "";
  };

  return (
    <>
      {questions.map((question) => (
        <div key={question._id} className="flex flex-col gap-2">
          <label className="text-lg font-medium">{question.questionText}</label>

          {question.questionType === "multiple_choice" ? (
            <Select
              value={getAnswerValue(question._id)}
              onChange={(e) => handleAnswerChange(question, e.target.value)}
            >
              <option value="" disabled>
                Select an option
              </option>
              {question.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          ) : (
            <InputField
              id={`question-${question._id}`}
              props={{ className: "w-full" }}
            >
              <Input
                props={{
                  type: "text",
                  id: `question-${question._id}`,
                  placeholder: "Enter your answer",
                }}
                value={getAnswerValue(question._id)}
                onChange={(e) => handleAnswerChange(question, e.target.value)}
              />
            </InputField>
          )}
        </div>
      ))}
    </>
  );
}

export default ApplicationQuestions;
