import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useDispatch } from "react-redux";
import { setCoins } from "./redux/coinsReducer.js";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://crypto.develotion.com/monedas.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apiKey: localStorage.getItem("apiKey"),
      },
    })
      .then((response) => response.json())
      .then((data) => dispatch(setCoins(data.monedas)));
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
