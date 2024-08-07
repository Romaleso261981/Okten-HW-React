import { CarsModel } from "../../models/CarsModel";

export type User = {
  id: number;
  email: string;
  address: {
    address: string;
    country: string;
    city: string;
    postalCode: string;
    state: string;
    stateCode: string;
    coordinates: {
      lat: string;
      lng: string;
    };
  };
  age: number;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  birthDate: string;
  bloodGroup: string;
  firstName: string;
  profilePic: string;
  company: {
    address: {
      coordinates: {
        lat: string;
        lng: string;
      };
      address: string;
      city: string;
      country: string;
      postalCode: string;
      state: string;
      stateCode: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  eyeColor: string;
  gender: string;
  height: string;
  image: string;
  ip: string;
  lastName: string;
  macAddress: string;
  maidenName: string;
  password: string;
  phone: string;
  role: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
  hair: {
    color: string;
    type: string;
  };
  crypto: {
    coin: string;
    network: string;
    wallet: string;
  };
};
export type UserFromJsonplaceholder = {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
  address: {
    city: string;
    geo: { lat: string; lng: string };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: { bs: string; catchPhrase: string; name: string };
};

export type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
  views: number;
  tags: string[];
  reactions: {
    dislikes: number;
    likes: number;
  };
};

export type Respons = {
  limit: number;
  skip: number;
  total: number;
};

export type UsersResponse = Respons & {
  users: User[];
};

export type PostsResponse = Respons & {
  posts: Post[];
};

export type TodoType = {
  userId: number;
  id: number;
  title: string;
  todo: string;
  completed: boolean;
};

type UserField = {
  username: string;
};

export type UserOcten = {
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string | null;
  userField: UserField;
};

export type FormData = {
  username: string;
  password: string;
};

export type AuthState = {
  access: string;
  refresh: string;
  isLogged: boolean;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string | null;
  userField: {
    username: string;
  };
};

export type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
  image: string;
};

export type CarsState = {
  isLogged: boolean;
  items: CarsModel[];
  error: string;
  currentPages: number;
  carsRespons: {
    total_pages: number;
    total_items: number;
    limit: number;
    page: number;
    data: CarsModel[];
  };
};

export type UsersState = {
  currentPages: number;
  itemsPerPage: number;
  isLogged: boolean;
  items: UserFromJsonplaceholder[];
  error: string;
  userPosts: Post[];
};

export type LoginData = {
  access: string;
  refresh: string;
  [key: string]: any;
};

export type TokenRefresh = {
  refresh: string;
  access: string;
};
