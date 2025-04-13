import { NotificationType } from "../enums/index.enums.ts";
import { IResponse } from "./Common.interfaces.ts";
import { IBusinessAccount } from "./BusinessAccount.interfaces.ts";

export interface INotification {
  accountId: number;
  businessId: number;
  isRead: boolean;
  isSeen: boolean;
  isSent: boolean;
  jobId: number;
  message: string;
  type: NotificationType;
  business: IBusinessAccount;
  jobApplicationId: number;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

//////////////////////////////////////////////////////////////////////////////
// Api Response Interfaces
export interface IGetAllNotificationsResponse extends IResponse {
  notifications: INotification[];
}
