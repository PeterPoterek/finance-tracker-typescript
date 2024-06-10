import { Columns } from "./Columns";
import { DataTable } from "./DataTable";

import { useState, useEffect } from "react";
import axios from "axios";

import { FinancialEntry } from "@/services/schemas/formSchemas";

import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";

const FinancialList = () => {
  const [financialData, setFinancialData] = useState<FinancialEntry[]>([]);

  const { expenses, fetchExpensesData } = useExpenses();
  const { incomes, fetchIncomesData } = useIncomes();

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchExpensesData();
        fetchIncomesData();
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    console.log(expenses);
    console.log(incomes);

    fetchData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      const [expensesResponse, incomesResponse] = await Promise.all([
        axios.get(
          "https://665791ff5c36170526454459.mockapi.io/api/user/expenses"
        ),
        axios.get(
          "https://665791ff5c36170526454459.mockapi.io/api/user/incomes"
        ),
      ]);

      const incomes = incomesResponse.data.map((entry: any) => ({
        ...entry,
        type: "income",
      }));

      const combinedData = [...expenses, ...incomes].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      setFinancialData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, []);

  return (
    <div className="pb-10">
      <DataTable columns={Columns} data={financialData} />
    </div>
  );
};

export default FinancialList;
