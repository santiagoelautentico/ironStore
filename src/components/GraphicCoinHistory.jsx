import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js/auto";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function GraphicCoinHistory() {
  const coins = useSelector((state) => state.coins.coins);
  const transactions = useSelector((state) => state.transactions.transactions);
  const [coinSelected, setCoinSelected] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Cotizaciones",
        data: [],
        borderColor: "#2962FF",
        backgroundColor: "rgba(41, 98, 255, 0.2)",
        fill: true,
      },
    ],
  });

  const handleCoinChange = (event) => {
    const selectedCoinId = event.target.value;
    setCoinSelected(selectedCoinId);
  };

  useEffect(() => {
    if (coinSelected) {
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.moneda === parseInt(coinSelected)
      );

      const labels = filteredTransactions.map(
        (_, index) =>
          `${index + 1} ${
            filteredTransactions[index].tipoOperacion === 1 ? "compra" : "venta"
          }`
      );
      const dataValues = filteredTransactions.map(
        (transaction) => transaction.valorActual
      );

      setChartData({
        labels,
        datasets: [
          {
            label: "Cotizaciones",
            data: dataValues,
            borderColor: "#2962FF",
            backgroundColor: "rgba(41, 98, 255, 0.2)",
            fill: true,
          },
        ],
      });
    }
  }, [coinSelected, transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: "Gráfico de Cotizaciones",
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className="graphicCoinHistory-container">
      <div className="graphicCoinHistory-header">
        <h4>Historial Por Moneda</h4>
        <select onChange={handleCoinChange} value={coinSelected}>
          <option value="" disabled>
            Seleccione una moneda
          </option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.nombre}
            </option>
          ))}
        </select>
      </div>
      {coinSelected && <Line options={options} data={chartData} />}
    </div>
  );
}

export default GraphicCoinHistory;
