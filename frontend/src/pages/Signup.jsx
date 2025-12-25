import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        
        <Heading label="Sign Up" />
        <SubHeading label="Enter your information to create an account" />

        <div className="mt-6">
          <InputBox onChange={e => {setFirstName(e.target.value)}} title="First Name" inputEx="John"  />
          <InputBox onChange={e => {setLastName(e.target.value)}} title="Last Name" inputEx="Doe"  />
          <InputBox onChange={e => {setUsername(e.target.value)}} title="Email" inputEx="johndoe@gmail.com"   />
          <InputBox onChange={e => {setPassword(e.target.value)} } title="Password" inputEx="••••••••" />
        </div>

        <Button onClick={async () => {
          const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
            username,
            password,
            firstName,
            lastName
          });
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard")
        }} title="Sign Up" />

        <div className="text-sm text-center text-gray-600 mt-4">
          Already have an account?
          <span className="text-blue-600 cursor-pointer font-medium hover:underline ml-1">
            Sign in
          </span>
        </div>

      </div>
    </div>
  );
}

export default Signup;
