import { forwardRef, useEffect, useRef } from "react";

function ActivationInputs() {
  const num1Ref = useRef<HTMLInputElement>(null);
  const num2Ref = useRef<HTMLInputElement>(null);
  const num3Ref = useRef<HTMLInputElement>(null);
  const num4Ref = useRef<HTMLInputElement>(null);
  const num5Ref = useRef<HTMLInputElement>(null);
  const num6Ref = useRef<HTMLInputElement>(null);

  useEffect(function () {
    if (num1Ref.current) {
      num1Ref.current.focus();
    }
  }, []);

  return (
    <>
      <ActivationNum name="num1" ref={num1Ref} nextRef={num2Ref} />
      <ActivationNum
        name="num2"
        ref={num2Ref}
        nextRef={num3Ref}
        prevRef={num1Ref}
      />
      <ActivationNum
        name="num3"
        ref={num3Ref}
        nextRef={num4Ref}
        prevRef={num2Ref}
      />
      <ActivationNum
        name="num4"
        ref={num4Ref}
        nextRef={num5Ref}
        prevRef={num3Ref}
      />
      <ActivationNum
        name="num5"
        ref={num5Ref}
        nextRef={num6Ref}
        prevRef={num4Ref}
      />
      <ActivationNum name="num6" ref={num6Ref} prevRef={num5Ref} />
    </>
  );
}

export default ActivationInputs;

type ActivationNum = {
  name: string;
  nextRef?: React.RefObject<HTMLInputElement>;
  prevRef?: React.RefObject<HTMLInputElement>;
};

const ActivationNum = forwardRef<HTMLInputElement, ActivationNum>(
  ({ name, nextRef, prevRef }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!/^\d$/.test(e.target.value)) {
        e.target.value = "";
        return;
      }

      if (e.target.value.length === 1 && nextRef?.current)
        nextRef.current.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        e.key === "Backspace" &&
        e.currentTarget.value === "" &&
        prevRef?.current
      )
        prevRef.current.focus();
    };

    return (
      <input
        ref={ref}
        type="text"
        maxLength={1}
        name={name}
        className="h-12 w-12 rounded-lg border-2 border-gray-100 text-center text-xl font-bold focus:outline-secondary"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
  },
);
