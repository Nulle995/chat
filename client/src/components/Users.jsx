import { useEffect } from "react";
import { API } from "../services/api.js";

const Users = () => {
  useEffect(() => {
    const getAllUsers = async () => {
      const res = await API.get("user");
      console.log(res);
    };
    getAllUsers();
  }, []);
  return <div>Users</div>;
};

export default Users;
