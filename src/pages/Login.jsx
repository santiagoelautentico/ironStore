import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUsername } from "../redux/userName.js";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("apiKey");
    localStorage.removeItem("userID");
  }, []);

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
        dispatch(setUsername(user));
        localStorage.setItem("apiKey", data.apiKey);
        localStorage.setItem("userID", data.id);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al iniciar sesión");
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    loginAction();
  }
  return (
    <>
      <section className="sectionLogin">
        <form action="" onSubmit={handleSubmit} className="formLogin">
          <h1>Login</h1>
          <div className="formInput">
            <label htmlFor="user">User</label>
            <input
              type="text"
              name="user"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="buttonBuy btn-login">Login</button>
        </form>
        <span className="link"><Link to="/signin">No tienes cuenta? Registrate</Link></span>

        <Toaster position="top-center" richColors />
      </section>
    </>
  );
}

export default Login;
