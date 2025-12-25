import Button from "./Button";
import { useSearchParams } from "react-router-dom";
import InputBox from "./InputBox";
import axios from "axios";
import { useState } from "react";

function SendMoney() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const firstName = searchParams.get('name');
    const lastName = searchParams.get('lname');

    const [amount, setAmount] = useState("");
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        
        <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center">
          Send Money 
        </h2>

        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold mb-2">
            {firstName[0]}
          </div>
          <span className="text-sm font-medium text-gray-800">
            {firstName} {lastName}
          </span>
        </div>

        <InputBox
          onChange={(e) => setAmount(e.target.value)}
          title="Amount (in Rs.)"
          inputEx="Enter amount"
        />

        <Button title="Transfer" 
        onClick={async () => {
            if(!amount){
                alert("Please enter the amount");
                return;
            }

            const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount: amount,
            }, {
                headers: {
                    Authorization: "Bearer "+localStorage.getItem("token")
                }
            })
            alert("Transfer successful");
        }}
        />
      </div>
    </div>
  );
}

export default SendMoney;
