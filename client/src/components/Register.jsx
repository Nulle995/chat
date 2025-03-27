import { API } from "../services/api";

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await API.post("user", formData);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" />{" "}
      <input type="password" name="password" />
      <button>Register</button>
    </form>
  );
};

export default Register;
