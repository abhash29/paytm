import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        
        <Heading label="Sign In" />
        <SubHeading label="Enter your information to login into your account" />

        <div className="mt-6">
          <InputBox onChange={(e) => {setUsername(e.target.value)}} title="Email" inputEx="johndoe@gmail.com" />
          <InputBox onChange={(e) => {setPassword(e.target.value)}} title="Password" inputEx="••••••••" />
        </div>

        <Button 
          onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
              username,
              password,
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard")
          }}
        title="Sign in" />

        <div className="text-sm text-center text-gray-600 mt-4">
          Does not have an Account?
          <span className="text-blue-600 cursor-pointer font-medium hover:underline ml-1">
            Sign up
          </span>
        </div>

      </div>
    </div>
  );
}

export default Signin;
