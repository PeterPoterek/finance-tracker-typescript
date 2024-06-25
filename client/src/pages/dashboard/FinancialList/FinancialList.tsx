import { Columns } from "./Columns";
import { DataTable } from "./DataTable";

import { useState, useEffect } from "react";

import { FinancialEntry } from "@/services/schemas/formSchemas";

import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";

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
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const combineData = () => {
      const combinedData = [...expenses, ...incomes].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      setFinancialData(combinedData);
    };

    combineData();
  }, [expenses, incomes]);

  return (
    <div className="pb-10">
      <DataTable columns={Columns} data={financialData} />
    </div>
  );
};

export default FinancialList;
