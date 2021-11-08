import { IInventoryItemDetails } from "./inventory";

export interface IItem {
  id: number;
  category: string;
  model: number;
  serialNumber: string;
  assignedTo?: string;
  assignedDate?: Date;
  details?: IInventoryItemDetails;
}
