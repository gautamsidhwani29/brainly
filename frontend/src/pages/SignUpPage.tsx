import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
  interface Signup {
    username: string;
    password: string;
  }
  const { signup } = useAuth();
  const [userData, setUserData] = useState<Signup>({
    username: "",
    password: "",
  });
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex border flex-col justify-center w-125 h-150 rounded-xl  items-center gap-6">
        <h2 className="text-2xl font-black"> Welcome to Brainly</h2>
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <InputField
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, username: e.target.value }))
            }
            value={userData.username}
            type="text"
            placeholder="Enter your username"
            classes="w-100"
          />
          <InputField
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, password: e.target.value }))
            }
            value={userData.password}
            type="password"
            placeholder="Enter your password"
            classes="w-100"
          />
          <Button
            variant="primary"
            size="lg"
            loading={false}
            title="Sign up"
            onClick={() => {
              signup(userData.username.trim(), userData.password.trim());
              setUserData({ username: "", password: "" });
            }}
            classes="w-100  rounded-xl"
          />
          <div className="border w-100 mt-5 border-gray-300"></div>
          <div className="text-l font-medium">
            {" "}
            Already Signed Up ?{" "}
            <a className="text-blue-700 underline" href="/login">
              Login Here{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
