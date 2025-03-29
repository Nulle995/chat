import { API } from "../services/api";
import "../styles/register.css";

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    try {
      const res = await API.post("user", userData);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="register">
      <h2>Register an account!</h2>
      <input type="text" name="username" />{" "}
      <input type="password" name="password" />
      <button>Register</button>
    </form>
  );
};

export default Register;
