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
};

// export type UserTypes = {
//   email?: string;
//   name?: string;
//   phone?: string;
//   activationLink?: string;
//   isActivated?: boolean;
//   password?: string;
//   publicId?: string;
//   token?: string;
//   color?: string;
//   admin?: false;
//   _id?: string;
// };

export type UserTypes = {
  // accessToken?: string;
  // refreshToken?: string;
  publicId?: string;
  phone?: string;
  email: string;
  name?: string;
  isActivated?: boolean;
  password?: string;
  color?: string;
  id?: string;
};

export type RegisterTypes = {
  accessToken?: string;
  refreshToken?: string;
  user: {
    publicId?: string;
    phone?: string;
    email: string;
    name?: string;
    isActivated?: boolean;
    password?: string;
    color?: string;
    id?: string;
  };
};
