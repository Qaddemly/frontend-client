import Button from "../../common/Button.tsx";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { EducationFront } from "../../../interfaces/ResumeBuilder.interfaces.ts";

type ResumeSectionProps = {
  title: string;
  titles?: string[];
  handleEdit: React.MouseEventHandler<HTMLButtonElement>;
  type?: string;
  education?: EducationFront[];
};

function ResumeSection({
  title,
  titles,
  handleEdit,
  education,
  type = "",
}: ResumeSectionProps) {
  const { setCurrEduId } = useResumeBuilder();
  return (
    <div className="flex flex-col items-center justify-between rounded-lg bg-white px-8 py-5 shadow-md">
      <div className="flex w-full items-center justify-between pb-3">
        <p className="text-xl font-semibold">{title}</p>
      </div>
      {type === "aboutme" &&
        titles?.map((title) => (
          <div className="flex w-full items-center justify-between border-t border-gray-200 py-3">
            <p
              dangerouslySetInnerHTML={{ __html: title }}
              className="text-lg font-medium text-gray-300"
            ></p>
            <Button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-white text-gray-300 hover:bg-white"
            >
              <span>Edit</span>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="cursor-pointer text-xl text-gray-400"
              />
            </Button>
          </div>
        ))}
      {type === "" &&
        education?.map((edu) => (
          <div className="flex w-full items-center justify-between border-t border-gray-200 py-3">
            <p className="text-lg font-medium text-gray-300">{edu.degree}</p>
            <Button
              onClick={(e) => {
                setCurrEduId(edu.id);
                handleEdit(e);
              }}
              className="flex items-center gap-2 bg-white text-gray-300 hover:bg-white"
            >
              <span>Edit</span>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="cursor-pointer text-xl text-gray-400"
              />
            </Button>
          </div>
        ))}
    </div>
  );
}

export default ResumeSection;
