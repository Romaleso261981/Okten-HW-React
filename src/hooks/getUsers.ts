import { API } from "../API";

export const getAllUsers = async <T>(path: string): Promise<T> => {
  const { data } = (await API.get<T>(path)) as { data: T };
  return data;
};
