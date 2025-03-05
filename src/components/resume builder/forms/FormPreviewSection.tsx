import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses } from "@fortawesome/free-solid-svg-icons";

function FormPreviewSection({
  children,
  title,
  tips,
  autoFill,
}: {
  children: React.ReactNode;
  title: string;
  tips: boolean;
  autoFill: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-between rounded-lg bg-white px-8 py-5 shadow-md">
      <div className="mt-5 flex w-full justify-between">
        <p className="mb-10 text-xl font-semibold">{title}</p>
        <div className="flex flex-col">
          {tips && (
            <p>
              <FontAwesomeIcon icon={faGlasses} />
              <span className="ml-1">Tips?</span>
            </p>
          )}
          {autoFill && (
            <p>
              <FontAwesomeIcon icon={faGlasses} />
              <span className="ml-1">Autofill?</span>
            </p>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

export default FormPreviewSection;
