import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./AdminRevenueChart.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [5000, 10000, 15000, 20000, 25000, 30000],
        borderColor: "#3ca267",
        backgroundColor: "rgba(49, 27, 146, 0.1)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Revenue Overview" },
    },
  };

  return (
    <div className="admin-chart-widget">
      <h2>Revenue Overview</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueChart;