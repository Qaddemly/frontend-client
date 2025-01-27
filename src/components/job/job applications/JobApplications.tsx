import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApplicationsTable from "./ApplicationsTable";

const applicants = [
  {
    id: 1,
    name: "Lionel Messi",
    phone: "(225) 555-0118",
    email: "messi@goat.com",
    country: "Palestine",
  },
  {
    id: 2,
    name: "Jacob Jones",
    phone: "(629) 555-0129",
    email: "jacob@yahoo.com",
    country: "Palestine",
  },
  {
    id: 3,
    name: "Jerome Bell",
    phone: "(208) 555-0112",
    email: "jerome@google.com",
    country: "Palestine",
  },
  {
    id: 4,
    name: "Kathryn Murphy",
    phone: "(225) 555-0118",
    email: "kathryn@microsoft.com",
    country: "Palestine",
  },
];

function JobApplications() {
  return (
    <div className="-mt-8 flex flex-col items-center gap-3">
      <h2 className="text-center text-5xl font-bold">
        Senior UX designer - Full time
      </h2>
      <div className="flex w-fit flex-row rounded-lg bg-white p-5 shadow-md">
        <div className="flex items-center rounded-full bg-light-secondary p-4 text-center text-4xl text-main">
          <FontAwesomeIcon icon={faUsers} />
        </div>
        <div className="ml-4 flex flex-col">
          <p className="text-md text-gray-500">Total Applications</p>
          <p className="text-3xl font-bold">{applicants.length}</p>
          <p>
            <span className="font-medium text-yellow">↑ 16%</span> this month
            {/* TODO: remove or evaluate */}
          </p>
        </div>
      </div>
      <ApplicationsTable applicants={applicants} />
    </div>
  );
}

export default JobApplications;
