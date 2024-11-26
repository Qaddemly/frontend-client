import AuthInput from "../auth/AuthInput";
import AuthSelect from "../auth/AuthSelect";
import AuthStartToEndDate from "../auth/AuthStartToEndDate";
import Navbar from "../home/Navbar";
// import Head from "./Head";
import Sidebar from "./Sidebar";
// import YourResume from "./YourResume";

function Experience() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      {/* <Head /> */}
      <div className="space-x-10">
        <div className="flex space-x-3">
          <label className="font-semibold">Job Title</label>
          <AuthInput
            props={{
              placeholder: "EX. Sales Manager",
              type: "text",
            }}
          />
        </div>
        <div className="flex space-x-3">
          <AuthSelect label="Employment type" id="employmentType">
            <option value="fullTime">Full Time</option>
            <option value="internship">Internship</option>
            <option value="partTime">Part Time</option>
          </AuthSelect>
        </div>
        <div className="flex space-x-3">
          <label className="font-semibold">Company name</label>
          <AuthInput
            props={{
              placeholder: "EX. Microsoft",
              type: "text",
            }}
          />
        </div>
        <div className="flex space-x-3">
          <label className="font-semibold">Location</label>
          <AuthInput
            props={{
              placeholder: "EX. London , Tanta",
              type: "text",
            }}
          />
        </div>
        <div className="flex space-x-3">
          <AuthSelect label="Location type" id="locationType">
            <option value="insite">Insite</option>
            <option value="remote">Remote</option>
          </AuthSelect>
        </div>

        <AuthStartToEndDate />
        <button className="mt-5 rounded-md border-2 border-main bg-main px-4 py-2 text-white">
          Save Changes
        </button>
        {/* <YourResume /> */}
      </div>
    </div>
  );
}

export default Experience;
