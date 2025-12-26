import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/update" element={<UpdateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
