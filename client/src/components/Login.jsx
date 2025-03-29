import { API } from "../services/api";
import "../styles/login.css";

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    console.log(formData);
    try {
      const res = await API.post("user/login", userData);
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="login">
      <h2>Access your account!</h2>
      <input type="text" name="username" autoComplete="off" />{" "}
      <input type="password" name="password" /> <button>Login</button>
    </form>
  );
};

export default Login;
