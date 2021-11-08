import { IItem } from "./item";

export interface IAssignee {
  name: string;
  email: string;
  assignedDate: Date;
}

export interface IUser {
  id: number,
  name: string;
  email: string;
  role: string;
  inventory?: IItem[];
}
