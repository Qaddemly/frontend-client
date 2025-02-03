import { NavLink } from "react-router-dom";
import PostJobForm from "./PostJobForm";

function PostJob() {
  return (
    <>
      <div className="flex items-center bg-[#eee] p-2">
        <div className="border-r border-r-gray-100 px-10 py-3">
          <p className="text-xl font-semibold">Employer Jobs</p>
        </div>
        <div className="flex gap-5 pl-5 text-lg font-medium">
          <NavLink
            to="/businessDashboard/companyJobs"
            className={({ isActive }) =>
              `px-2 py-1 ${isActive ? "rounded-md bg-main text-white" : ""}`
            }
          >
            Jobs
          </NavLink>
        </div>
      </div>
      <h2 className="m-4 pt-2 text-center text-3xl font-bold">
        Post your Job 💼
      </h2>
      <p className="m-4 text-center text-2xl opacity-50">
        Few steps give the power to your Job
      </p>
      <PostJobForm />
    </>
  );
}

export default PostJob;
