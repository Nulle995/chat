import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API } from "../services/api.js";
import UserCard from "./UserCard.jsx";

const Users = () => {
  const [searchParams] = useSearchParams();
  const [singleUser, setSingleUser] = useState(null);
  const [userList, setUserList] = useState(null);
  const [loading, setLoading] = useState(true);
  const userParam = searchParams.get("u");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const queryString = new URLSearchParams(searchParams).toString();
        const res = await API.get(`/user?${queryString}`);

        if (userParam) {
          setSingleUser(res.data); // viene un objeto
          console.log(res.data);
        } else {
          setUserList(res.data.users); // viene un array
          console.log(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchParams]);
  return singleUser ? <UserCard user={singleUser} /> : <>users</>;
};

export default Users;
