import { useState } from "react";

type SliderProps = {
  label: string;
  min: number;
  max: number;
};

function Slider({ label, min, max }: SliderProps) {
  const [value, setValue] = useState(0);

  return (
    <div className="relative mb-6 text-left text-light-secondary-200">
      <label>{label}</label>
      <input
        type="range"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        min={min}
        max={max}
        className="h-2 w-full cursor-pointer rounded-lg accent-main hover:accent-main focus:outline-none"
      />
      <span className="absolute -bottom-6 start-0 text-sm">
        {label === "Salary" ? "$" : ""} {value}
      </span>
      <span className="absolute -bottom-6 end-0 text-sm">
        {label === "Salary" ? "$" : ""} {max}
      </span>
    </div>
  );
}

export default Slider;
