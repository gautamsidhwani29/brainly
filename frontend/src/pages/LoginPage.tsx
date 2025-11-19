import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  interface LoginForm {
    username: string;
    password: string;
  }
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userData, setUserData] = useState<LoginForm>({
    username: "",
    password: "",
  });
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex border  border-gray-300 flex-col justify-center w-125 h-150 rounded-xl  items-center gap-6">
        <h2 className="text-2xl font-black"> Welcome back to Brainly</h2>
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <InputField
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, username: e.target.value }))
            }
            type="text"
            value={userData.username}
            placeholder="Enter your username"
            classes="w-100"
          />
          <InputField
            value={userData.password}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            placeholder="Enter your password"
            classes="w-100"
          />
          <Button
            variant="primary"
            size="lg"
            loading={false}
            title="Login"
            classes="w-100  rounded-xl"
            onClick={async () => {
              await login(userData.username.trim(), userData.password.trim());
              navigate("/home");

              setUserData({ username: "", password: "" });
            }}
          />
          <div className="border w-100 mt-5 border-gray-300"></div>
          <div className="text-l font-medium">
            {" "}
            New to Brainly ?{" "}
            <a className="text-blue-700 underline" href="/signup">
              Sign up{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
