
export type PizzaTypes = {
  _id: number;
  imageUrl: string;
  name: string;
  types: string[];
  sizes: number[];
  price: number;
  pizzasPrice: number;
  pizzasCount: number;
  rating: number;
  category: number;
  identity: string;
};

export type CartTypes = {
  _id: number;
  imageUrl: string;
  name: string;
  types: string;
  sizes: number;
  price: number;
  pizzasPrice: number;
  pizzasCount: number;
  rating: number;
  category: number;
  identity: string;
}

export type UserTypes = {
  _id: string;
  phone: string;
  isActivated: boolean;
  name: string;
  email: string;
  admin: false;
  publicId: string;
  token: string;
  color: string;
};