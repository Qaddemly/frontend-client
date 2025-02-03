// CompanyJobs should take jobs from Backend and pass each one to EditJobCard
import { useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import EditJobCard from "../../job/EditJobCard";
import { useGetAllJobsQuery } from "../../../services/jobApi";
import Loader from "../../common/Loader";

// const jobCards = [
//   {
//     active: false,
//     jobTitle: "Senior UX Designer",
//     locationType: "In-place",
//     location: "Gaza, Palastine",
//     salary: "$2,000 - $5,000",
//     skills: [
//       "Networking Basics",
//       "System Diagnostics",
//       "Customer Service Orientation",
//       "Experience with Remote Support Tools",
//       "Team collaboration",
//       "Strong time management",
//       "Analytical thinking",
//       "Empathy",
//     ],
//     employmentType: "Part-time",
//     experience: "2+ Years",
//     keyWords: ["UX", "UI", "Design", "Frontend", "Canva"],
//     position: "Team member",
//     decsription:
//       "We are seeking a highly motivated and customer-focused Technical Support Specialist to join our team. As a key member of the support team, you will be responsible for providing exceptional technical assistance to clients, resolving their issues, and ensuring seamless operation of our products and services. If you thrive in a fast-paced environment and enjoy solving technical problems, we'd love to hear from you!",
//   },
//   {
//     active: true,
//     jobTitle: "Senior UX Designer",
//     locationType: "In-place",
//     location: "Gaza, Palastine",
//     salary: "$52,000 - $55,000",
//     skills: [
//       "Networking Basics",
//       "System Diagnostics",
//       "Customer Service Orientation",
//       "Experience with Remote Support Tools",
//       "Team collaboration",
//       "Analytical thinking",
//       "Empathy",
//     ],
//     employmentType: "Full-time",
//     experience: "10+ Years",
//     keyWords: ["UX", "UI", "Design", "Frontend", "Canva"],
//     position: "Team leader",
//     decsription:
//       "As a key member of the support team, you will be responsible for providing exceptional technical assistance to clients, resolving their issues, and ensuring seamless operation of our products and services. If you thrive in a fast-paced environment and enjoy solving technical problems, we'd love to hear from you!",
//   },
//   {
//     active: true,
//     jobTitle: "Senior UX Designer",
//     locationType: "In-place",
//     location: "Gaza, Palastine",
//     salary: "$52,000 - $55,000",
//     skills: [
//       "Networking Basics",
//       "System Diagnostics",
//       "Customer Service Orientation",
//       "Experience with Remote Support Tools",
//       "Team collaboration",
//       "Analytical thinking",
//       "Empathy",
//     ],
//     employmentType: "Full-time",
//     experience: "10+ Years",
//     keyWords: ["UX", "UI", "Design", "Frontend", "Canva"],
//     position: "Team leader",
//     decsription:
//       "As a key member of the support team, you will be responsible for providing exceptional technical assistance to clients, resolving their issues, and ensuring seamless operation of our products and services. If you thrive in a fast-paced environment and enjoy solving technical problems, we'd love to hear from you!",
//   },
//   {
//     active: false,
//     jobTitle: "Senior UX Designer",
//     locationType: "In-place",
//     location: "Gaza, Palastine",
//     salary: "$52,000 - $55,000",
//     skills: [
//       "Networking Basics",
//       "System Diagnostics",
//       "Customer Service Orientation",
//       "Experience with Remote Support Tools",
//       "Team collaboration",
//       "Analytical thinking",
//       "Empathy",
//     ],
//     employmentType: "Full-time",
//     experience: "No experience",
//     keyWords: ["UX", "UI", "Design", "Frontend", "Canva"],
//     position: "Team leader",
//     decsription:
//       "As a key member of the support team, you will be responsible for providing exceptional technical assistance to clients, resolving their issues, and ensuring seamless operation of our products and services. If you thrive in a fast-paced environment and enjoy solving technical problems, we'd love to hear from you!",
//   },
// ];
function CompanyJobs() {
  const { data, isLoading } = useGetAllJobsQuery({});
  const jobs = data?.jobs.data;
  const [selectedValue, setSelectedValue] = useState("all");
  const { companyId } = useParams();
  const isJobApplicationsRoute = location.pathname.includes(
    `/businessDashboard/companyJobs/${companyId}/jobApplications`,
  );
  const isJobRoute = location.pathname.endsWith(companyId?.toString() || "");

  const isPostJobRoute = location.pathname.endsWith(`/postjob`);

  // const filteredJobCards = jobCards.filter((job) => {
  //   if (selectedValue === "available") return job.active === true;
  //   if (selectedValue === "unavailable") return job.active === false;
  //   return true; // Default: show all
  // });

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex items-center bg-[#eee] p-2">
        <div className="border-r border-r-gray-100 px-10 py-3">
          <p className="text-xl font-semibold">Employer Jobs</p>
        </div>
        <div className="flex gap-5 pl-5 text-lg font-medium">
          <NavLink
            to={`/businessDashboard/companyJobs/${companyId}`}
            className={`px-2 py-1 ${isJobApplicationsRoute || isJobRoute ? "rounded-md bg-main text-white" : ""}`}
          >
            Jobs
          </NavLink>
          <NavLink
            to={`/businessDashboard/companyJobs/${companyId}/postjob`}
            className={`px-2 py-1 ${isPostJobRoute ? "rounded-md bg-main text-white" : ""}`}
          >
            Post New Job
          </NavLink>
        </div>
      </div>

      {isJobApplicationsRoute || isPostJobRoute ? (
        <Outlet />
      ) : (
        <div className="my-10 flex flex-col-reverse justify-center gap-8 px-7 lg:flex-row">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {jobs?.map((job) => <EditJobCard key={job.id} job={job} />)}
          </div>
          <div className="flex h-full flex-col-reverse content-between gap-2 lg:flex-col lg:gap-4">
            {/* GAD TODO : is selected : button gap-32 */}
            <select
              name="Show All"
              value={selectedValue}
              className={`rounded-md border-2 p-2 shadow-md outline-none ${selectedValue === "available" ? "border-green-100 text-green-100" : selectedValue === "unavailable" ? "border-danger-300 text-danger-300" : "border-main text-main"} cursor-pointer`}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="all" className="text-main">
                Show All
              </option>
              <option value="available" className="text-green-100">
                Show Available
              </option>
              <option value="unavailable" className="text-danger-300">
                Show Unavailable
              </option>
              <option value="archived" className="text-main">
                {/* GAD TODO : connect with backend */}
                Show Archived
              </option>
            </select>
          </div>
        </div>
      )}
    </>
  );
}

export default CompanyJobs;
