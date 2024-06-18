import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useEffect, useState } from "react";
import useCategories from "@/hooks/useCategories";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";

import { Button } from "@/components/ui/button";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const { expenseCategories, incomeCategories } = useCategories();
  const { expenses } = useExpenses();
  const { incomes } = useIncomes();

  const [expenseCategoriesTotal, setExpenseCategoriesTotal] = useState(
    Array(expenseCategories.length).fill(0)
  );
  const [incomeCategoriesTotal, setIncomeCategoriesTotal] = useState(
    Array(incomeCategories.length).fill(0)
  );
  const [selectedType, setSelectedType] = useState("expense");

  const calculateCategoryTotal = () => {
    const expensesTotal = Array(expenseCategories.length).fill(0);
    expenses.forEach(expense => {
      const categoryIndex = expenseCategories.indexOf(expense.category);
      if (categoryIndex > -1) {
        expensesTotal[categoryIndex] += expense.value;
      }
    });
    setExpenseCategoriesTotal(expensesTotal);

    const incomesTotal = Array(incomeCategories.length).fill(0);
    incomes.forEach(income => {
      const categoryIndex = incomeCategories.indexOf(income.category);
      if (categoryIndex > -1) {
        incomesTotal[categoryIndex] += income.value;
      }
    });
    setIncomeCategoriesTotal(incomesTotal);
  };

  useEffect(() => {
    calculateCategoryTotal();
  }, [expenses, incomes]);

  const handleToggle = (type: string) => {
    setSelectedType(type);
  };

  const data = {
    labels: selectedType === "expense" ? expenseCategories : incomeCategories,
    datasets: [
      {
        label: selectedType === "expense" ? "Expenses" : "Incomes",
        data:
          selectedType === "expense"
            ? expenseCategoriesTotal
            : incomeCategoriesTotal,
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
        text:
          selectedType === "expense"
            ? "Expense Distribution"
            : "Income Distribution",
      },
    },
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <Pie data={data} options={options} width={550} height={300} />
      <div className="flex gap-5 justify-center">
        <Button
          variant="secondary"
          onClick={() => handleToggle("expense")}
          disabled={selectedType === "expense"}
        >
          Show Expenses
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleToggle("income")}
          disabled={selectedType === "income"}
        >
          Show Incomes
        </Button>
      </div>
    </div>
  );
};

export default PieChart;
