import { API } from "../services/api";

const Logout = () => {
  const handleClick = async () => {
    try {
      const res = await API.get("user/logout");
      console.log(res);
      window.location.reload();
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
