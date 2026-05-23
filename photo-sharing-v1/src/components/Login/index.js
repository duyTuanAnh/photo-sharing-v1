import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login({ onLogin }) {
  const [loginName, setLoginName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://x6vsmn-8081.csb.app/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login_name: loginName }),
      });
      const user = await res.json();
      if (res.ok) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("curUser", JSON.stringify(user));
        onLogin && onLogin(user);
        navigate(`/users/${user._id}`);
      } else setError("Invalid login name!");
    } catch (error) {
      console.log(error);
      setError("Cannot connect to server");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
