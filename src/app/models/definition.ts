export interface IInventoryItemDef {
  id: number;
  category: string;
  manufacturer: string;
  series?: string;
  model?: string;
  type?: string;
  count?: number;
  free?: number;
}
