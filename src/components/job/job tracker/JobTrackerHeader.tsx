import { NavLink } from "react-router-dom";
import SearchBar from "../../common/SearchBar";

function JobTrackerHeader() {
  return (
    <div className="relative">
      <p className="text-4xl font-semibold text-gray-800">Track your jobs</p>
      <div className="mt-4 flex gap-10 pb-2">
        <p className="font-medium">4 Total Jobs</p>
        <NavLink
          end
          to="/jobTracker"
          className={({ isActive }: { isActive: boolean }) =>
            `cursor-pointer border-b-4 pb-2 hover:border-main hover:text-main ${
              isActive
                ? "border-b-main text-main"
                : "border-b-background text-gray-600"
            }`
          }
        >
          Active (4)
        </NavLink>
        <NavLink
          end
          to="/jobTracker/archived"
          className={({ isActive }: { isActive: boolean }) =>
            `cursor-pointer border-b-4 pb-2 hover:border-main hover:text-main ${
              isActive
                ? "border-b-main text-main"
                : "border-b-background text-gray-600"
            }`
          }
        >
          Archived (4)
        </NavLink>
      </div>
      <hr className="absolute top-[5.7rem] w-full border border-gray-200" />

      <div className="mt-4 flex items-center gap-5">
        <SearchBar
          placeholder="Search for roles or companies"
          buttonName="Search"
          className="flex w-[1200rem] items-center rounded-lg border border-gray-100 bg-white px-5 py-2 shadow-sm outline-none focus-within:ring-2"
          btnClassName="hidden"
        />

        <select className="rounded-md border border-gray-100 px-2 py-2 text-gray-400 outline-none focus:border-secondary">
          <option value="All">Job Type</option>
        </select>

        <input
          placeholder="Applied from"
          type="text"
          className="w-32 rounded-md border-gray-100 px-2 py-2"
        />
        <input
          placeholder="Applied until"
          type="text"
          className="w-32 rounded-md border-gray-100 px-2 py-2"
        />
      </div>
    </div>
  );
}

export default JobTrackerHeader;
