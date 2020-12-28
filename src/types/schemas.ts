export type Address = {
  country: string;
  city: string;
  street: string;
  building: string;
};

export type SchemaType = {
  _id: string;
  created_at: string;
  updated_at: string;
};

export interface Product extends SchemaType {
  title: string;
  description: string;
  mass: string;
  amount: number;
}

export interface Shop extends SchemaType {
  title: string;
  address: Address;
  description: string;
  c_procuct: string[];
}
