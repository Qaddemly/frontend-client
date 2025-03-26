import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "../../common/Modal";
import {
  useDeleteRoleMutation,
  useGetListOfHrRolesQuery,
  useUpdateRoleMutation,
} from "../../../services/businessDashboardApi";
import toast from "react-hot-toast";
import Loader from "../../common/Loader";
import Button from "../../common/Button";
import { HrRole } from "../../../enums/index.enums";
import { IHRs } from "../../../interfaces/BusinessDashboard.interfaces";
import { useParams } from "react-router-dom";
import { formatDate, handleApiError } from "../../../utils/helpers";

function CompanyCadidatesItem({ candidate }: { candidate: IHRs }) {
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const [showUpdateModal, setUpdateShowModal] = useState(false);
  const { companyId } = useParams();
  const rolesValues = Object.values(HrRole);
  const [role, setRole] = useState<HrRole | "">("");
  const { refetch } = useGetListOfHrRolesQuery({
    id: companyId || "",
  });

  // handle deleting role
  const [deleteRole, { isLoading: isLoading1 }] = useDeleteRoleMutation();
  async function handleDeleteRole(account_email: string) {
    try {
      const res = await deleteRole({
        id: companyId?.toString() || "",
        account_email,
      }).unwrap();
      setDeleteShowModal(false);
      toast.success(res.message);
      refetch();
    } catch (err) {
      setDeleteShowModal(false);
      handleApiError(err);
    }
  }

  // handle udpate role
  const [updateRole, { isLoading: isLoading2 }] = useUpdateRoleMutation();
  async function handleUpdateRole(account_email: string, role: string) {
    try {
      const res = await updateRole({
        id: companyId?.toString() || "",
        account_email,
        role,
      }).unwrap();
      setUpdateShowModal(false);
      toast.success(res.message);
      refetch();
    } catch (err) {
      setUpdateShowModal(false);
      handleApiError(err);
    }
  }

  if (isLoading1 || isLoading2) return <Loader />;

  return (
    <tr className="border-b border-b-[#eee] hover:bg-[#eee]">
      <th className="flex items-center gap-2 px-6 py-4">
        {candidate.account.profile_picture ? (
          <img
            src={candidate.account.profile_picture}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            className="rounded-full border-2 border-gray-200 bg-gray-200 px-2 py-2"
          />
        )}
        <span>
          {candidate.account.first_name} {candidate.account.last_name}
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
      <td className="space-x-5 px-6 py-4">
        <button
          className="rounded-full bg-gray-600 px-2 py-1 font-medium text-white"
          onClick={() => setUpdateShowModal(true)}
        >
          Edit
        </button>
        {showUpdateModal && (
          <Modal setClose={() => setUpdateShowModal(false)}>
            <div className="flex flex-col gap-5 px-20 py-10">
              <p className="text-lg font-medium text-gray-400">Change Role</p>
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
              <Button
                className="px-3"
                onClick={() => handleUpdateRole(candidate.account.email, role)}
              >
                Update
              </Button>
            </div>
          </Modal>
        )}
        <button
          className="rounded-full bg-danger-300 px-2 py-1 font-medium text-white"
          onClick={() => setDeleteShowModal(true)}
        >
          Delete
        </button>
        {showDeleteModal && (
          <Modal setClose={() => setDeleteShowModal(false)}>
            <div className="p-4 text-center md:p-5">
              <svg
                className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this User?
              </h3>
              <button
                type="button"
                className="inline-flex items-center rounded-lg bg-danger-300 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                onClick={() => handleDeleteRole(candidate.account.email)}
              >
                Yes, I'm sure
              </button>
              <button
                type="button"
                className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium focus:ring-4"
                onClick={() => setDeleteShowModal(false)}
              >
                No, cancel
              </button>
            </div>
          </Modal>
        )}
      </td>
    </tr>
  );
}

export default CompanyCadidatesItem;
