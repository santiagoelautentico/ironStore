import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useDispatch } from "react-redux";
import { setCoins } from "./redux/coinsReducer.js";
import { setTransactions } from "./redux/transactionReducer.js";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Primera solicitud para obtener las monedas
    fetch("https://crypto.develotion.com/monedas.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apiKey: localStorage.getItem("apiKey"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCoins(data.monedas));
        return fetch(
          "https://crypto.develotion.com/transacciones.php?idUsuario=1427",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              apiKey: localStorage.getItem("apiKey"),
            },
          }
        );
      })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTransactions(data.transacciones));
      })
      .catch((error) => {
        console.error("Error en las solicitudes:", error); // Manejo de errores para ambas solicitudes
      });
  }, [dispatch]);

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
