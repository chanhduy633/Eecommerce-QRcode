import { Types } from "mongoose";

export interface IChatMessage {
  _id?: Types.ObjectId;
  userId?: string;
  guestToken?: string;
  sender: 'user' | 'bot';
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ISendMessageDTO {
  userId?: string;
  guestToken?: string;
  message: string;
}

export interface IChatHistoryQuery {
  userId?: string;
  guestToken?: string;
}

export interface IClearHistoryDTO {
  userId?: string;
  guestToken?: string;
}

export interface IChatResponse {
  user: IChatMessage;
  bot: IChatMessage;
}
