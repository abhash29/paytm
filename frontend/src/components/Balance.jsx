import axios from "axios";
import { useEffect, useState } from "react";


function Balance() {
    const [bal, setbal] = useState(null);
    useEffect(() => {
  const fetchBal = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      setbal(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  fetchBal();
}, []);
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
      <span className="text-sm text-gray-600">
        Your Balance:
      </span>
      <span className="text-lg font-semibold text-gray-900">
        {bal}
      </span>
    </div>
  );
}

export default Balance;
