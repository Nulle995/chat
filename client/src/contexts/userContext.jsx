import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../services/api.js";
export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    const getUserData = async () => {
      const res = await API.get("auth/token/me");
      console.log(res);
    };
    getUserData();
  }, []);
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
