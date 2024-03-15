import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import { validateSignin } from "../utils/helper";

const Signin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });

  async function sendRequest() {
    setError("");
    const message = validateSignin(userInput.username, userInput.password);
    if (message) return setError(message);
    try {
      const response = await axios.post("/api/v1/user/signin", {
        ...userInput,
      });
      const token = response.data;
      localStorage.setItem("token", token.jwt);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center min-h-screen h-full p-2 w-[420px]">
        <div className="font-bold text-3xl">Create an account</div>
        <div className="text-slate-400 text-sm">
          Don't have an account? &nbsp;
          <Link to={"/signUP"} className="underline">
            Signup
          </Link>
        </div>
        <form className="pt-4 w-full p-4" onSubmit={(e) => e.preventDefault()}>
          <Input
            title="Username"
            placeholder="Enter your username"
            onChange={(e) => {
              setUserInput((prev) => ({ ...prev, username: e.target.value }));
            }}
          />
          <Input
            title="Password"
            placeholder="Enter your password"
            type="password"
            onChange={(e) => {
              setUserInput((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
          {error && (
            <div className="text-red-600 p-1 w-full text-center">{error}</div>
          )}
          <div className="mt-8">
            <Button type="submit" onClick={sendRequest}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
