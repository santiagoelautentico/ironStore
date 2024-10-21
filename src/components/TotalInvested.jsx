import React from "react";
import { useSelector } from "react-redux";

function TotalInvested() {
  const transactions = useSelector((state) => state.transactions.transactions);
  const totalCompras = transactions.reduce((acc, transaction) => {
    if (transaction.tipoOperacion === 1) {
      return acc + transaction.cantidad * transaction.valorActual;
    }
    return acc;
  }, 0);

  const totalSell = transactions.reduce((acc, transaction) => {
    if (transaction.tipoOperacion === 2) {
      return acc + transaction.cantidad * transaction.valorActual;
    }
    return acc;
  }, 0);

  const total = totalCompras - totalSell;

  return (
    <div className="sectionArticle totalInvestedArticle">
      <h2>Monto final de inversiones</h2>
      <span className={total > 0 ? "red" : "green"}>{total > 0 ? total : total * -1 }</span>
    </div>
  );
}

export default TotalInvested;
