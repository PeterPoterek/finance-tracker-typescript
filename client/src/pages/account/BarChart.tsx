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

import { useEffect, useState } from "react";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const { expenses } = useExpenses();
  const { incomes } = useIncomes();
  const [monthlyExpenses, setMonthlyExpenses] = useState(Array(12).fill(0));
  const [monthlyIncomes, setMonthlyIncomes] = useState(Array(12).fill(0));

  const calculateMonthlyTotal = () => {
    const expensesByMonth = Array(12).fill(0);
    const incomesByMonth = Array(12).fill(0);

    expenses.forEach(expense => {
      const month = new Date(expense.createdAt).getMonth();
      expensesByMonth[month] += expense.value;
    });

    incomes.forEach(income => {
      const month = new Date(income.createdAt).getMonth();
      incomesByMonth[month] += income.value;
    });

    setMonthlyExpenses(expensesByMonth);
    setMonthlyIncomes(incomesByMonth);
  };

  useEffect(() => {
    calculateMonthlyTotal();
  }, [expenses, incomes]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: "Expenses",
        data: monthlyExpenses,
        backgroundColor: "#ef4444",
        borderColor: "#f87171",
        borderWidth: 1,
      },
      {
        label: "Incomes",
        data: monthlyIncomes,
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

  return <Bar data={data} options={options} width={1200} height={400} />;
};

export default BarChart;
