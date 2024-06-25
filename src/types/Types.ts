export type ResDataUser = {
  id: string;
  editedUser: User | null;
};

export type SortedField = keyof User;

export type User = {
  id: string;
  email: string;
  rule: string;
  name: string;
  profilePic: string;
};

export type UserState = {
  user: User | null | undefined;
  usersData: User[];
  users: User[];
  loading: boolean;
};
export type AuthState = {
  userData: User | null;
  loading: boolean;
  isRegistered: boolean;
};
