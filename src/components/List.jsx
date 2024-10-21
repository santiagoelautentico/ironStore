import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

function RecomendTransactions(trasaccionType, historic, actual) {
  console.log(actual, historic, trasaccionType, "fino");

  if (trasaccionType === 1) {
    if (actual > historic) {
      return "Se recomienda Vender";
    } else {
      return "";
    }
  } else {
    if (actual < historic) {
      return "Se recomienda comprar";
    } else {
      return "";
    }
  }
}

function List() {
  const transactions = useSelector((state) => state.transactions.transactions);
  const coins = useSelector((state) => state.coins.coins);
  const [recomendedTransactions, setRecomendedTransactions] = useState([]);
  const recomendedTransaction = useCallback(
    (transaction) => {
      // console.log(transaction, transaction.moneda,"gulle");

      if (!recomendedTransactions.includes(transaction.moneda)) {
        recomendedTransactions.push(transaction.moneda);
        // console.log(recomendedTransactions, "joseluis");
        // console.log(transaction.id, "joselu");

        const currentValue = coins.find(
          (coin) => coin.id === transaction.moneda
        ).cotizacion;
        console.log(transaction.moneda);

        return RecomendTransactions(
          transaction.tipoOperacion,
          transaction.valorActual,
          currentValue
        );
      } else {
        return "";
      }
    },
    [coins, recomendedTransactions, setRecomendedTransactions]
  );

  const clearList = useEffect(() => {
    setRecomendedTransactions([]);
  }, [transactions]);

  const getCoinName = (idMoneda) => {
    const coin = coins.find((coin) => coin.id === idMoneda);
    return coin ? coin.nombre : "Moneda no encontrada";
  };

  return (
    <div className="sectionArticleList">
      <ul className="listObj">
        <h3 className="titleList">Historial de transacciones</h3>
        {transactions
          .slice()
          .reverse()
          .map((transaction) => (
            <li key={transaction.id} className="transaction">
              <div className="headerList">
                <h3 className="headerTitleList">{`${getCoinName(
                  transaction.moneda
                )}`}</h3>
                <span
                  className={transaction.tipoOperacion === 1 ? "red" : "green"}
                >
                  {transaction.tipoOperacion === 1 ? "Compra" : "Venta"}
                </span>
              </div>
              <div className="contentTransaction">
                <div className="headerContentTransaction">
                  <p>Cant:{transaction.cantidad}</p>
                  <p>Cotizado por: ${transaction.valorActual}</p>
                </div>
                <div className="footerContentTransaction">
                  <h4>
                    {transaction.tipoOperacion === 1
                      ? `Total: $${
                          transaction.valorActual * transaction.cantidad
                        }`
                      : `Ganancia: $${
                          transaction.cantidad * transaction.valorActual
                        }`}
                  </h4>
                  <span className="recomended">
                    {console.log(getCoinName(transaction.moneda))}
                    {recomendedTransaction(transaction)}
                  </span>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default List;
