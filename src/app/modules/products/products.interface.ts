export interface TInventory {
  quantity: number;
  inStock: boolean;
}

export interface TProductVariant {
  type: string;
  value: string;
}

export interface TProducts {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  inventory: TInventory;
  variants?: TProductVariant[];
}
