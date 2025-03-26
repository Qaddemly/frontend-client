import Input from "./Input.tsx";
import Button from "./Button.tsx";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
type InputWithLinkProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  value: string;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement> | ContentEditableEvent,
    field: string,
  ) => void;
  setShowLink: (s: boolean) => void;
  setValue: (s: string) => void;
  name: Path<T>;
  id: string;
};
function InputWithLink<T extends FieldValues>({
  register,
  value,
  handleOnChange,
  setShowLink,
  setValue,
  name,
  id,
}: InputWithLinkProps<T>) {
  return (
    <div className="absolute right-0 top-0 z-10 rounded-xl bg-white p-10 shadow-xl">
      <Input
        register={register}
        onChange={(e) => handleOnChange(e, id)}
        value={value}
        name={name}
        props={{
          placeholder: "Enter Link",
          type: "text",
          id: id,
        }}
      />
      <div className="mt-5 flex items-center gap-5">
        <Button
          onClick={() => {
            setValue("")
            setShowLink(false);
          }}
          type="button"
          className="rounded-full border border-[#eee] bg-white px-10 text-gray-300 hover:bg-white"
        >
          Cancel
        </Button>
        <Button
          onClick={() => setShowLink(false)}
          type="button"
          className="rounded-full px-10"
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default InputWithLink;
