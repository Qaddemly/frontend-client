import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

import { RefObject } from "react";
import { IBusinesses } from "../../interfaces/BusinessAccount.interfaces";
import { useDispatch } from "react-redux";
import { setUserBusinessAccount } from "./BusinessAccountSlice";

function BusinessAccountsMenu({
  menuRef,
  data,
}: {
  menuRef: RefObject<HTMLUListElement>;
  data: IBusinesses[];
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <ul
      ref={menuRef}
      className="absolute top-[4rem] flex min-h-[15rem] flex-col justify-between rounded-md border bg-white pb-5 shadow-lg"
    >
      {data.map((company) => (
        <li
          key={company.id}
          onClick={() => {
            dispatch(setUserBusinessAccount(company));
            navigate(
              `/businessDashboard/companySettings/companyAccount/${company.id}`,
            );
          }}
          className="flex cursor-pointer flex-col rounded-tl-md rounded-tr-md border-b border-gray-100 px-4 py-2 font-medium hover:bg-[#eee]"
        >
          {company.name}
          <span className="italic text-gray-300">{company.role}</span>
        </li>
      ))}
      <Button
        onClick={() => navigate("/createBusinessAccount")}
        className="mx-5 mt-5 px-4"
      >
        Create new company
      </Button>
    </ul>
  );
}

export default BusinessAccountsMenu;
