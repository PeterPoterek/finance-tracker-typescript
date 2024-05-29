import { Columns } from "./Columns.tsx";
import { DataTable } from "./data-table.tsx";

import { useState, useEffect } from "react";
import axios from "axios";

const FinancialList = () => {
  const [placeholderData, setPlaceholderData] = useState([]);

  const fetchPlaceholderData = async () => {
    try {
      const response = await axios.get(
        "https://665791ff5c36170526454459.mockapi.io/api/user/transactions"
      );
      setPlaceholderData(response.data);
      // setPlaceholderData([]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPlaceholderData();
  }, [placeholderData]);

  return <DataTable columns={Columns} data={placeholderData} />;
};

export default FinancialList;
