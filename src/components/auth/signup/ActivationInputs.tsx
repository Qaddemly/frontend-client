import React, { useRef, useEffect } from "react";

interface ActivationInputProps {
  length: number;
  onComplete: (code: string) => void;
}

const ActivationInput: React.FC<ActivationInputProps> = ({
  length,
  onComplete,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(length).fill(null),
  );

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    if (/^\d$/.test(value)) {
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      if (index === length - 1) {
        const code = inputRefs.current.map((input) => input?.value).join("");
        onComplete(code);
      }
    } else {
      event.target.value = "";
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      event.key === "Backspace" &&
      !inputRefs.current[index]?.value &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          className="h-12 w-12 rounded-md border border-gray-300 text-center text-xl font-medium text-main"
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
        />
      ))}
    </div>
  );
};

export default ActivationInput;
