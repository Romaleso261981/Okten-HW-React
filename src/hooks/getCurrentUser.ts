import { User } from "../shared/types/Types";

export function getCurrentUser() {
  try {
    const userString = localStorage.getItem("user");

    if (!userString) {
      return null;
    }

    const user: User = JSON.parse(userString);

    if (user && typeof user === "object" && "nickName" in user) {
      return user;
    }
    throw new Error("Invalid user data format");
  } catch (error) {
    return null;
  }
}
