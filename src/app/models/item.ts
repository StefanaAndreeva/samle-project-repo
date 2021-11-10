export interface IInventoryItem {
  id: number;
  definitionId: number;
  serialNumber: string;
  userId?: number;
  assignee?: string;
  assignedDate?: Date;
}

export interface IItem {
  category: string;
  manufacturer: string;
  series?: string;
  model?: string;
  type?: string;
  serialNumber: string;
  assignedDate?: Date;
}
