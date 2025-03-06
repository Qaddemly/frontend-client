import Button from "../../common/Button.tsx";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ResumeSectionProps = {
  title: string;
  titles: string[];
  handleEdit: React.MouseEventHandler<HTMLButtonElement>;
};

function ResumeSection({ title, titles, handleEdit }: ResumeSectionProps) {
  return (
    <div className="flex flex-col items-center justify-between rounded-lg bg-white px-8 py-5 shadow-md">
      <div className="flex w-full items-center justify-between pb-3">
        <p className="text-xl font-semibold">{title}</p>
        <Button className="bg-white px-3 text-danger-300 hover:border-danger-300 hover:bg-danger-300 hover:text-white">
          Delete
        </Button>
      </div>
      {titles.map((title: string) => (
        <div className="flex w-full items-center justify-between border-t border-gray-200 py-3">
          <p className="text-lg font-medium text-gray-300">{title}</p>
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
    </div>
  );
}

export default ResumeSection;
