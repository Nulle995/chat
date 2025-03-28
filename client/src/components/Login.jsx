import { API } from "../services/api";

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
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" />{" "}
      <input type="password" name="password" /> <button>Login</button>
    </form>
  );
};

export default Login;
