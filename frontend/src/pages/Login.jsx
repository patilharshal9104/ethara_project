import { useState } from "react";
import { loginUser, registerUser } from "../api";

export default function Login({ setUser }) {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (isRegister) {
      // REGISTER
      const res = await registerUser({
        name,
        email,
        password,
        role: "member",
      });

      if (res.message) {
        alert(res.message);
        setIsRegister(false);
      } else {
        alert("Registration failed");
      }
    } else {
      // LOGIN
      const res = await loginUser({ email, password });

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);
        localStorage.setItem("userId", res.userId);
        setUser(true);
      } else {
        alert(res.message || "Login failed");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegister ? "Register" : "Login"}</h2>

        {isRegister && (
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        )}

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {isRegister ? "Register" : "Login"}
        </button>

        <p
          onClick={() => setIsRegister(!isRegister)}
          style={{ cursor: "pointer", marginTop: "10px" }}
        >
          {isRegister ? "Already have an account? Login" : "New user? Register"}
        </p>
      </div>
    </div>
  );
}
