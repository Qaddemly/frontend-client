import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../common/Button";
import {
  useAddNewRoleMutation,
  useGetListOfHrRolesQuery,
} from "../../../services/businessDashboardApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Loader from "../../common/Loader";
import { formatDate } from "../../../utils/helpers";
import { useRef, useState } from "react";
import { HrRole } from "../../../enums/index.enums";
import { useClickOutside } from "../../../hooks/useOutsideClick";
import { IError } from "../../../interfaces/Common.interfaces";
import toast from "react-hot-toast";

function CompanyCandidates() {
  const { businessAccount } = useSelector(
    (state: RootState) => state.businessAccount,
  );
  // handle adding new role
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<HrRole | "">("");
  const [addNewRole, { isLoading: isLoading1 }] = useAddNewRoleMutation();
  const divRef = useRef<HTMLDivElement>(null);
  const menuRef = useClickOutside<HTMLDivElement>(
    () => setIsOpen(false),
    divRef,
  );

  async function handleAddNewRole() {
    if (email && role) {
      try {
        const res = await addNewRole({
          id: businessAccount.id?.toString(),
          newRole: { account_email: email, role },
        }).unwrap();
        toast.success(res.message);
      } catch (err) {
        const error = err as IError;
        toast.error(error.message);
        if (typeof error.details !== "string" && error.details.msg) {
          toast.error(error.details.msg);
        }
      }
    }
  }

  // handle apis
  const { isLoading: isLoading2, data } = useGetListOfHrRolesQuery({
    id: businessAccount.id?.toString(),
  });
  const listOfHRs = data?.HRs;
  const rolesValues = Object.values(HrRole);

  // handle error
  // useEffect(() => {
  //   if (isError) {
  //     const error = isError as unknown as IError;
  //     toast.error(error.message);
  //   }
  // }, [isError]);

  if (isLoading1 || isLoading2) return <Loader />;

  return (
    <div className="my-10 flex flex-col items-center justify-center">
      <p className="mb-16 text-3xl">Users In Business Company</p>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <p className="font-medium">
              All Users <span className="text-gray-300">5</span>
            </p>
            <p className="font-medium">
              Selected <span className="text-gray-300">0</span>
            </p>
          </div>
          <div className="relative flex gap-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3">
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 block w-72 rounded-lg border border-gray-300 p-2 ps-10 text-sm"
              placeholder="Search for"
            />
            <div ref={divRef}>
              <Button className="px-3" onClick={() => setIsOpen((s) => !s)}>
                Add User
              </Button>
            </div>

            {isOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 top-14 z-10 flex flex-col gap-5 rounded-md bg-gray-200 p-10 text-white shadow-md"
              >
                <input
                  type="text"
                  placeholder="Enter user email"
                  className="h-[2rem] w-[15rem] rounded-md border-2 border-gray-100 px-2 text-gray-500"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <select
                  className="w-full rounded-md border-2 border-gray-100 py-1 text-gray-500 outline-none focus:border-secondary"
                  onChange={(e) => setRole(e.target.value as HrRole | "")}
                >
                  {rolesValues.map((role) => (
                    <option value={role} key={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <Button onClick={handleAddNewRole}>Add</Button>
              </div>
            )}
          </div>
        </div>

        <div className="relative overflow-x-auto rounded-lg border-2 border-[#eee] shadow-md">
          <table className="w-[60rem] text-left text-sm">
            <thead className="bg-main uppercase text-white">
              <tr>
                <th className="p-4"></th>
                <th className="px-6 py-5">Name</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Date Added</th>
                <th className="px-6 py-5">Last Active</th>
                <th className="px-6 py-5">Action</th>
              </tr>
            </thead>

            <tbody className="font-medium">
              {listOfHRs?.map((candidate) => (
                <tr className="border-b border-b-[#eee] hover:bg-[#eee]">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 rounded-sm border-gray-300 bg-gray-100 focus:ring-2"
                      />
                    </div>
                  </td>
                  <th className="flex items-center gap-2 px-6 py-4">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="rounded-full border-2 border-gray-200 bg-gray-200 px-2 py-2"
                    />
                    <span>
                      {candidate.account_first_name}{" "}
                      {candidate.account_last_name}
                    </span>
                  </th>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-main px-2 py-1 text-white">
                      {candidate.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {formatDate(candidate.created_at)}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {formatDate(candidate.updated_at)}
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium hover:underline">
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CompanyCandidates;
