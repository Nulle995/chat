import { API } from "../services/api";

const Logout = () => {
  const handleClick = async () => {
    try {
      const res = API.get("user/logout");
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <button onClick={handleClick} type="button">
      Logout
    </button>
  );
};

export default Logout;
