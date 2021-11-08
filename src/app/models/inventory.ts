export interface IInventoryItemDetails {
  id: number;
  manufacturer: string;
  series?: string;
  model?: string;
  type?: string;
  count?: number;
  free?: number;
}

export interface IInventoryItemDef {
  category: string;
  items: IInventoryItemDetails[];
}
