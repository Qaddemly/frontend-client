export type Message = {
  text: string;
  sender: "user" | "business";
  time: string;
};

export type Chat = {
  avatar: string;
  name: string;
  website: string;
  isStarred: boolean;
  unreadMessages: number;
  messages: Message[];
};
