import { Columns } from "./Columns.tsx";
import { DataTable } from "./DataTable.tsx";

import { useState, useEffect } from "react";
import axios from "axios";

import { FinancialEntry } from "@/services/schemas/formSchemas";

const FinancialList = () => {
  const [placeholderData, setPlaceholderData] = useState<FinancialEntry[]>([]);

  const fetchPlaceholderData = async () => {
    try {
      const response = await axios.get(
        "https://665791ff5c36170526454459.mockapi.io/api/user/transactions"
      );

      // empty arr to test table without data
      // setPlaceholderData([]);

      //zod validation
      // const validatedData = response.data.map((item: any) =>
      //   financialSchema.parse(item)
      // );
      // setPlaceholderData(validatedData);

      setPlaceholderData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPlaceholderData();
  }, []);

  return (
    <div className="pb-10">
      <DataTable columns={Columns} data={placeholderData} />
    </div>
  );
};

export default FinancialList;
