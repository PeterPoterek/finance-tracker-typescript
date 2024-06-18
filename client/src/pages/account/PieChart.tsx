import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useEffect, useState } from "react";
import useCategories from "@/hooks/useCategories";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const { expenseCategories, incomeCategories } = useCategories();

  const data = {
    labels: incomeCategories,
    datasets: [
      {
        label: "Expenses",
        data: [120, 60, 30, 90, 45],
        backgroundColor: [
          "#4ade80",
          "#22c55e",
          "#86efac",
          "#16a34a",
          "#10b981",
          "#34d399",
          "#10b981",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Expense Distribution",
      },
    },
  };

  return <Pie data={data} options={options} width={550} height={300} />;
};

export default PieChart;
