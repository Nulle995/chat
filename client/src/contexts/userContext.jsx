import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {}, []);
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
