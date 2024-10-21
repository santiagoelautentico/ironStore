import React from "react";
import ListAllCoins from "../components/ListAllCoins.jsx";
import BuySell from "../components/BuySell.jsx";
import TotalInvested from "../components/TotalInvested.jsx";
import List from "../components/List.jsx";
import GraphicForCoins from "../components/GraphicForCoins.jsx";
import GraphicForSells from "../components/GraphicForSells.jsx";
import GraphicCoinHistory from "../components/GraphicCoinHistory.jsx";
import { useDispatch } from "react-redux";
import { setCoins } from "../redux/coinsReducer.js";
import { setTransactions } from "../redux/transactionReducer.js";
import { useEffect } from "react";
import logo from "../assets/imgs/logoCriptoBlanco.svg";
import profile from "../assets/imgs/profile.svg";
import homeIcon from "../assets/imgs/home 1.svg";
import notification from "../assets/imgs/notification.svg";
import wallet from "../assets/imgs/cartera.svg";
import { Link } from "react-router-dom";
import { cleanUsername } from "../redux/userName.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  const apiKey = localStorage.getItem("apiKey");
  const user = useSelector((state) => state.username.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCleanUsername = () => {
    dispatch(cleanUsername());
  };
  function closeSession() {
    handleCleanUsername();
    localStorage.removeItem("userID");
    localStorage.removeItem("apiKey");
    navigate("/");
  }
  useEffect(() => {
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
          `https://crypto.develotion.com/transacciones.php?idUsuario=${localStorage.getItem(
            "userID"
          )}`,
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
      <header>
        <div className="containerLogo">
          <img src={logo} alt="IronStone" className="logo" />
        </div>
        <nav>
          <ul className="listNav">
            <li>
              <Link to={"/dashboard"} className="navIcons">
                <img src={homeIcon} alt="" className="iconNav" />
                <span className="titleNav">Inicio</span>
              </Link>
            </li>
            <li>
              <Link className="navIcons">
                <img src={notification} alt="" className="iconNav" />
                <span className="titleNav">Notificaciones</span>
              </Link>
            </li>
            <li>
              <Link to="/" className="navIcons">
                <img src={wallet} alt="" className="iconNav" />
                <span className="titleNav">Cartera</span>
              </Link>
            </li>
          </ul>
        </nav>
        {apiKey !== null ? (
          <div className="containerUser">
            <div className="nameContainer">
              <img src={profile} alt="logo" className="profileIcon" />
              <div>
                <h3 className="userName">{user ? user : ""}</h3>
                <p className="subtitle">Administrador</p>
              </div>
            </div>
            <div className="btn-container">
              <button className="btn-logout" onClick={closeSession}>
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </header>
      <section className="dashboard_container">
        <h1 className="title">Dashboard</h1>
        <section className="template">
          <BuySell />
          <List />
          <TotalInvested />
          <GraphicForCoins />
          <GraphicForSells />
          <GraphicCoinHistory />
        </section>
      </section>
      <ListAllCoins />
    </>
  );
}

export default Dashboard;
