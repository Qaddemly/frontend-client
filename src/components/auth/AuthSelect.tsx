import { ReactNode } from "react";

type AuthSelectProps = {
  label: string;
  id: string;
  children: ReactNode;
  className?: string;
  value?: string | number | string[];
  onChange?: (props: React.ChangeEvent<HTMLSelectElement>) => void;
};

function AuthSelect({
  label,
  id,
  children,
  className,
  value,
  onChange,
}: AuthSelectProps) {
  return (
    <div className="text-left">
      <label htmlFor={id} className="mb-2 block font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md border-2 border-gray-100 px-2 py-2 text-gray-300 outline-none focus:border-secondary ${className}`}
      >
        {children}
      </select>
    </div>
  );
}

export default AuthSelect;
