import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  //Filtering process
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
        return;   
    }
    const fetchUsers = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/bulk?filter="+filter, {
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token")
            }
        });
      setUsers(response.data.user);
    };
    fetchUsers();
  }, [filter]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mt-4 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Users</h2>

      <input
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        placeholder="Search users"
        className="w-full px-3 py-2 mb-4 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                {user.firstName?.[0]}
              </div>

              <span className="text-sm font-medium text-gray-800">
                {user.firstName} {user.lastName}
              </span>
            </div>

            <button 
            onClick={(e) => {navigate('/transfer?id='+user._id+"&name="+user.firstName+"&lname"+user.lastName)}}
            className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Send Money
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
