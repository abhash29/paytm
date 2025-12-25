import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

function Signin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        
        <Heading label="Sign In" />
        <SubHeading label="Enter your information to login into your account" />

        <div className="mt-6">
          <InputBox title="Email" inputEx="johndoe@gmail.com" />
          <InputBox title="Password" inputEx="••••••••" />
        </div>

        <Button title="Sign in" />

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
