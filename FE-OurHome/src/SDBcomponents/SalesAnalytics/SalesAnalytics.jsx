import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./SalesAnalytics.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesAnalytics = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales ($)",
        data: [5000, 10000, 15000, 8000, 12000],
  backgroundColor: "rgba(36, 106, 65, 0.6)",
  borderColor: "rgba(37, 89, 77, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Sales Analytics" },
    },
  };

  return (
    <div className="seller-sales-analytics">
      <h2>Sales Analytics</h2>
      <div className="seller-chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesAnalytics;