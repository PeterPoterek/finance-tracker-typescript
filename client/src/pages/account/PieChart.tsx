import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useEffect, useState } from "react";
import useCategories from "@/hooks/useCategories";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const { expenseCategories, incomeCategories } = useCategories();

  const { expenses } = useExpenses();
  const { incomes } = useIncomes();

  const [expenseCategoriesTotal, setExpenseCategoriesTotal] = useState(
    Array(expenseCategories.length).fill(0)
  );
  const [incomeCategoriesTotal, setIncomeCategoriesTotal] = useState(
    Array(expenseCategories.length).fill(0)
  );

  const calculateCategoryTotal = (type: string) => {
    if (type === "expense") {
      const expensesTotal = Array(expenseCategories.length).fill(0);

      expenses.forEach(expense => {
        const categoryIndex = expenseCategories.indexOf(expense.category);

        if (categoryIndex > -1) {
          expensesTotal[categoryIndex] += expense.value;
        }
      });

      setExpenseCategoriesTotal(expensesTotal);
    } else {
      const incomesTotal = Array(incomeCategories.length).fill(0);

      incomes.forEach(income => {
        const categoryIndex = incomeCategories.indexOf(income.category);

        if (categoryIndex > -1) {
          incomesTotal[categoryIndex] += income.value;
        }
      });

      setIncomeCategoriesTotal(incomesTotal);
    }
  };

  useEffect(() => {
    calculateCategoryTotal("income");
  }, [expenses, incomes]);

  const data = {
    labels: incomeCategories,
    datasets: [
      {
        label: "Expenses",
        data: incomeCategoriesTotal,
        backgroundColor: [
          "#F87171",
          "#FBBF24",
          "#34D399",
          "#60A5FA",
          "#A78BFA",
          "#F472B6",
          "#C4B5FD",
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
