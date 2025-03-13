import Button from "../common/Button.tsx";
import { useResumeBuilder } from "../../context/ResumeBuilderContext.tsx";
import { FormMode } from "../../interfaces/ResumeBuilder.interfaces.ts";

function ResumeFormButtons({
  mode,
  handleDelete,
  handleCancel,
}: {
  mode: FormMode;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancel: () => void;
}) {
  const { setStatus } = useResumeBuilder();
  return (
    <div
      className={`mt-5 flex gap-3 ${mode === "edit" ? "justify-between" : "justify-end"}`}
    >
      {mode === "edit" && (
        <div>
          {/* handle delete */}
          <Button
            type="button"
            onClick={(e) => handleDelete(e)}
            className="rounded-full px-3 text-danger-300 hover:bg-danger-300 hover:text-white"
          >
            Delete
          </Button>
        </div>
      )}
      <div className="space-x-2">
        <Button
          type="button"
          onClick={() => {
            handleCancel();
            setStatus(() => ["normal"]);
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
