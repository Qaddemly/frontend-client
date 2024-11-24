import DatePicker from "./DatePicker";

function AuthStartToEndDate() {
  return (
    <>
      <label htmlFor="education">Start & End Date</label>
      <div className="flex items-center gap-4">
        <DatePicker id="education" />
        <span className="text-gray-300">to</span>
        <DatePicker id="education" />
      </div>
    </>
  );
}

export default AuthStartToEndDate;
