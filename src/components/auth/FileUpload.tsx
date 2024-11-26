import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type FileUploadProps<T extends FieldValues> = {
  icon: IconDefinition;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  register?: UseFormRegister<T>;
  options?: RegisterOptions<T>;
  name?: Path<T>;
};
function FileUpload<T extends FieldValues>({
  icon,
  onChange,
  register,
  options,
  name,
}: FileUploadProps<T>) {
  return (
    <div className="flex w-full items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-[#eee] hover:bg-light-secondary"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <FontAwesomeIcon icon={icon} className="ml-2 text-5xl text-main" />
          <p className="text-gray-50 mb-2 text-sm">
            <span className="font-semibold text-main underline">
              Click to upload
            </span>
          </p>
          <p className="text-xs text-gray-500">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          {...(register && name ? register(name, options) : {})}
          onChange={onChange}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </label>
    </div>
  );
}

export default FileUpload;
