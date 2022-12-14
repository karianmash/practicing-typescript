export interface Product {
  id: number;
  name: string;
  icon: string;
  description?: string;
  validate(): boolean;
}

export interface Customer {
  id: number;
  name: string
}

// Examples of using a type alias
type ProductAlias =
  | string
  | number
  | {
    id: number;
    name: string;
    icon: string;
    description?: string;
  };

let product: ProductAlias = 'Food';

// Using a type alias versus an enum
enum ProductType {
  Sporting,
  Home,
}

type ProductTypeList = 'SPORTING' | 'HOME';
let p: ProductTypeList = 'SPORTING';
