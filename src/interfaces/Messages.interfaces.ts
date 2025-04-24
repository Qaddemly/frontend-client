import { IBusinessAccount } from "./BusinessAccount.interfaces.ts";
import { IUser } from "./Auth.interfaces.ts";

export type ChatType = "USER" | "BUSINESS";

export interface IMessage {
  id: number;
  business_id: number;
  account_id: number;
  chat_id: number;
  content: string;
  sent_status: "USER" | "BUSINESS";
  is_delivered: boolean;
  is_seen: boolean;
  created_at: string;
}

export interface IChat {
  id: number;
  business_id: number;
  account_id: number;
  created_at: string;
  business: IBusinessAccount;
  account: IUser;
}

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Api Response Interfaces /////////////////////////////
export interface IGetAllChatsResponse {
  success: boolean;
  chats: IChat[];
}

export interface IGetAllMessagesResponse {
  success: boolean;
  messages: IMessage[];
}

export interface ICreateChatResponse {
  success: boolean;
  chat: IChat;
}
