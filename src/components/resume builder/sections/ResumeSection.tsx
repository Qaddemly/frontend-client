import Button from "../../common/Button.tsx";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ResumeSectionProps<T> = {
  title: string;
  items?: T[];
  idField?: keyof T;
  displayField?: keyof T;
  handleEdit?: (id: T[keyof T]) => void;
  type?: string;
  handleEditAboutme?: React.MouseEventHandler<HTMLButtonElement>;
  titles?: string[];
};

function ResumeSection<T>({
  title,
  items,
  idField,
  displayField,
  handleEdit,
  type,
  handleEditAboutme,
  titles,
}: ResumeSectionProps<T>) {
  return (
    <div className="flex flex-col items-center justify-between rounded-lg bg-white px-8 py-5 shadow-md">
      <div className="flex w-full items-center justify-between pb-3">
        <p className="text-xl font-semibold">{title}</p>
      </div>
      {type === "aboutme" &&
        titles?.map((title) => (
          <div className="flex w-full items-center justify-between break-words border-t border-gray-200 py-3">
            <p
              dangerouslySetInnerHTML={{ __html: title }}
              className="w-[14rem] break-words text-lg font-medium text-gray-300"
            ></p>
            <Button
              onClick={handleEditAboutme}
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
      {items?.map((item) => (
        <div
          key={idField ? (item[idField] as string) : undefined}
          className="flex w-full items-center justify-between border-t border-gray-200 py-3"
        >
          <p className="text-lg font-medium text-gray-300">
            {displayField ? (item[displayField] as string) : undefined}
          </p>
          <Button
            onClick={() => handleEdit && idField && handleEdit(item[idField])}
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
