function SliderIndicators({
  step,
  setStep,
}: {
  step: number;
  setStep: (s: (prevStep: number) => number) => void;
}) {
  return (
    <div className="z-30 mt-5 flex space-x-3 rtl:space-x-reverse">
      <button
        type="button"
        className={`h-3 w-3 rounded-full ${step == 1 ? "bg-main" : "bg-gray-100"}`}
        onClick={() => setStep(() => 1)}
      ></button>
      <button
        type="button"
        className={`h-3 w-3 rounded-full bg-gray-100 ${step == 2 ? "bg-main" : "bg-gray-100"}`}
        onClick={() => setStep(() => 2)}
      ></button>
      <button
        type="button"
        className={`h-3 w-3 rounded-full bg-gray-100 ${step == 3 ? "bg-main" : "bg-gray-100"}`}
        onClick={() => setStep(() => 3)}
      ></button>
      <button
        type="button"
        className={`h-3 w-3 rounded-full bg-gray-100 ${step == 4 ? "bg-main" : "bg-gray-100"}`}
        onClick={() => setStep(() => 4)}
      ></button>
      <button
        type="button"
        className={`h-3 w-3 rounded-full bg-gray-100 ${step == 5 ? "bg-main" : "bg-gray-100"}`}
        onClick={() => setStep(() => 5)}
      ></button>
    </div>
  );
}

export default SliderIndicators;
