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
import { color } from "chart.js/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function GraphicForCoins() {
  const transactions = useSelector((state) => state.transactions.transactions);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Inversiones",
        data: [],
        borderColor: "#2962FF",
        backgroundColor: "rgba(41, 98, 255, 0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    if (transactions.length === 0) return;

    const purchaseTransactions = transactions.filter(
      (transaction) => transaction.tipoOperacion === 1
    );

    const labels = purchaseTransactions.map((_, index) => index + 1 + " compra");
    const dataValues = purchaseTransactions.map((transaction) => {
      return transaction.cantidad * transaction.valorActual;
    });

    setChartData({
      labels,
      datasets: [
        {
          label: "Inversiones",
          data: dataValues,
          borderColor: "#2962FF",
          backgroundColor: "rgba(41, 98, 255, 0.2)",
          fill: true,
        },
      ],
    });
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 16,
            color: "red",
          },
        },
      },
      title: {
        display: true,
          text: "Gráfico de Inversiones",
          font: {
            size: 20,
            color: "red",
          },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line options={options} data={chartData} />
    </div>
  );
}

export default GraphicForCoins;
