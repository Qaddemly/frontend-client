import { useEffect, useRef, useState } from "react";

function Slider() {
  const [value, setValue] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.setProperty("--value", `${value}`);
    }
  }, [value]);

  return (
    <div className="text-light-secondary-200 relative mb-6 text-left">
      <label htmlFor="labels-range-input">Rating</label>
      <input
        ref={sliderRef}
        id="labels-range-input"
        type="range"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        min={0}
        max={10}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 focus:outline-none"
      />
      <span className="absolute -bottom-6 start-0 text-sm">0</span>
      <span className="absolute -bottom-6 start-[45%] text-sm">
        Value: {value}
      </span>
      <span className="absolute -bottom-6 end-0 text-sm">10</span>
    </div>
  );
}

export default Slider;
