import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type SliderProps = {
  label: string;
  min: number;
  max: number;
  value?: number;
  setValue?: (value: number) => void;
};

function Slider({
  label,
  min,
  max,
  value = min,
  setValue = () => {},
}: SliderProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative mb-6 text-left text-light-secondary-200">
      <label>{label}</label>

      {label == "Salary Greater than" ? (
        <>
          <input
            type="range"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            min={min}
            max={max}
            className="h-2 w-full cursor-pointer rounded-lg accent-main hover:accent-main focus:outline-none"
          />
          <span className="absolute -bottom-6 start-0 text-sm">${value}</span>
          <span className="absolute -bottom-6 end-0 text-sm">${max}</span>
        </>
      ) : (
        <div className="text-yellow-500 mt-2 cursor-pointer select-none text-2xl">
          {Array.from({ length: max }, (_, i) => {
            const index = i + 1;
            return (
              <span
                key={index}
                onClick={() => setValue(index)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={
                    index <= (hovered ?? value) ? faStarSolid : faStarRegular
                  }
                  className="text-2xl text-main"
                />
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Slider;
