import { useState } from "react";

import FinancialForm from "./FinancialForm/FinancialForm";
import FinancialList from "./FinancialList/FinancialList";
import FinancialViewToggle from "./FinancialViewToggle/FinancialViewToggle";

const Dashboard = () => {
  const [view, setView] = useState<"expense" | "income">("expense");

  return (
    <div className="m-auto max-w-5xl">
      <div className="m-auto max-w-5xl ">
        <FinancialViewToggle setView={setView} />
        <FinancialForm view={view} />
      </div>

      <FinancialList />
    </div>
  );
};

export default Dashboard;
