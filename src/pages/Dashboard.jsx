import React from "react";
import ListAllCoins from "../components/ListAllCoins.jsx";
import BuySell from "../components/BuySell.jsx";
import TotalInvested from "../components/TotalInvested.jsx";
import List from "../components/List.jsx";
import GraphicCoin from "../components/GraphicCoin.jsx";
import GraphicBuyCoin from "../components/graphicBuyCoin.jsx";
import Article from "../components/Article.jsx";
import SellGraphicCoin from "../components/SellGraphicCoin.jsx";
function Dashboard() {
  return (
    <>
      <section className="dashboard_container">
        <h1 className="title">Dashboard</h1>
        <section className="template">
          <BuySell />
          <SellGraphicCoin />
          <TotalInvested />
          <GraphicCoin />
          <List />
          <GraphicBuyCoin />
          <Article />
        </section>
      </section>
      <ListAllCoins />
    </>
  );
}

export default Dashboard;
