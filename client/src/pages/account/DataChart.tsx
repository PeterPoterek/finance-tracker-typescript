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
import useCategories from "@/hooks/useCategories";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DataChart = () => {
  const { expenseCategories, incomeCategories } = useCategories();

  const [chartView, setChartView] = useState(expenseCategories);

  const data = {
    labels: chartView,
    datasets: [
      {
        label: "Expenses",
        data: [1200, 1500, 900, 1800, 1200, 2000],
        backgroundColor: "#ef4444",
        borderColor: "#f87171",
        borderWidth: 1,
      },
      {
        label: "Incomes",
        data: [2000, 1800, 2200, 1900, 2100, 2300],
        backgroundColor: "#22c55e",
        borderColor: "#4ade80",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Financial Overview",
      },
    },
  };

  return <Bar data={data} options={options} width={600} height={400} />;
};

export default DataChart;
