import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  function loginAction() {
    fetch("https://crypto.develotion.com/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: user,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al iniciar sesión");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data, "login exitoso");
        localStorage.setItem("apiKey", data.apiKey);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    loginAction();
  }
  return (
    <>
      <h2>Login</h2>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">User</label>
          <input
            type="text"
            name="user"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
