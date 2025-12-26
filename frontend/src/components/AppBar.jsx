import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AppBar() {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginDetail = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: "Bearer "+localStorage.getItem("token"),
        },
      });
      setFirstName(response.data.firstName);
    }
    fetchLoginDetail();
  }, []);

  return (
    <div className="w-full h-16 flex items-center justify-between px-6 bg-blue-50 shadow-md border-b border-blue-200">
      <div className="text-xl font-bold text-blue-700">
        Paytm
      </div>

      <div className="flex items-center gap-4">

  <div 
    onClick={() => console.log("Update profile")}
    className="flex items-center gap-2 cursor-pointer hover:bg-blue-100 p-1 rounded-md transition-colors"
  >
    <span className="text-sm font-medium text-blue-800">
      {firstName}
    </span>

    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
      {firstName[0]}
    </div>
  </div>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      navigate("/signup");
    }}
    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
  >
    Logout
  </button>

</div>

    </div>
  );
}

export default AppBar;
