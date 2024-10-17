import React from "react";
import { useSelector } from "react-redux";

function List() {
  const transactions = useSelector((state) => state.transactions.transactions);
  const coins = useSelector((state) => state.coins.coins);
  
  const getCoinName = (idMoneda) => {
    const coin = coins.find((coin) => coin.id === idMoneda);
    return coin ? coin.nombre : "Moneda no encontrada";
  };

  return (
    <div className="sectionArticleList">
      <ul>
        <h3>Historial de transacciones</h3>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="listObj">
            <p>{`${getCoinName(transaction.moneda)}`}</p>
            <p>{`Cantidad: ${transaction.cantidad}`}</p>
            <p>{`Valor al momento de la compra: ${transaction.valorActual}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
