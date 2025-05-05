import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

import { RefObject } from "react";
import { IBusinesses } from "../../interfaces/BusinessAccount.interfaces";
import { useDispatch, useSelector } from "react-redux";
import { setUserBusinessAccount } from "./BusinessAccountSlice";
import { socket } from "../../services/socket.ts";
import { RootState } from "../../store/store.ts";

function BusinessAccountsMenu({
  menuRef,
  data,
}: {
  menuRef: RefObject<HTMLUListElement>;
  data: IBusinesses[];
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: userId } = useSelector((state: RootState) => state.user.user);
  return (
    <ul
      ref={menuRef}
      className="absolute top-[4rem] z-10 flex min-h-[15rem] flex-col justify-between rounded-md border bg-white pb-5 shadow-lg"
    >
      {data.map((company) => (
        <li
          key={company.id}
          onClick={() => {
            dispatch(setUserBusinessAccount(company));
            localStorage.setItem("businessAccountId", company.id.toString());
            navigate(
              `/businessDashboard/companySettings/companyAccount/${company.id}`,
            );
            socket.emit("connect_user_in_business", {
              userId,
              businessId: company.id,
            });
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
