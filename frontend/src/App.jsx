import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./styles.css";
function App() {
  const [user, setUser] = useState(localStorage.getItem("token"));

  return user ? <Dashboard /> : <Login setUser={setUser} />;
}

export default App;
