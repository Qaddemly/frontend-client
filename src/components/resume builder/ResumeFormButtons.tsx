import Button from "../common/Button.tsx";
import { useResumeBuilder } from "../../context/ResumeBuilderContext.tsx";
import { FormMode } from "../../interfaces/ResumeBuilder.interfaces.ts";
import { useCoverLetter } from "../../context/CoverLetterContext.tsx";

function ResumeFormButtons({
  mode,
  handleDelete,
  handleCancel,
  hiddenDeleteBtn,
  type = "resume",
}: {
  mode: FormMode;
  handleDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancel: () => void;
  hiddenDeleteBtn?: boolean;
  type?: "coverLetter" | "resume";
}) {
  const { setStatus: setResumeStatus } = useResumeBuilder();
  const { setStatus: setCoverLetterStatus } = useCoverLetter();

  return (
    <div
      className={`mt-5 flex gap-3 ${mode === "edit" ? "justify-between" : "justify-end"}`}
    >
      {mode === "edit" && (
        <div>
          {/* handle delete */}
          <Button
            type="button"
            onClick={(e) => handleDelete && handleDelete(e)}
            className={`rounded-full px-3 text-danger-300 hover:bg-danger-300 hover:text-white ${hiddenDeleteBtn ? "hidden" : "block"}`}
          >
            Delete
          </Button>
        </div>
      )}
      <div className="space-x-2">
        {/* handle cancel */}
        <Button
          type="button"
          onClick={() => {
            handleCancel();
            if (type === "resume") setResumeStatus(() => ["normal"]);
            else setCoverLetterStatus(() => ["normal"]);
          }}
          className="rounded-full bg-white px-3 text-main hover:bg-main hover:text-white"
        >
          Cancel
        </Button>
        {/* handle save */}
        <Button className="rounded-full px-3">
          {mode === "add" ? "Add" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}

export default ResumeFormButtons;
