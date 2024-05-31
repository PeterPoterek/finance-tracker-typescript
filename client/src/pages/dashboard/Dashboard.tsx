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
        <h2 className="text-2xl">
          Add {view} <span>{view === "expense" ? "🤑" : "💸"}</span>
        </h2>
        <FinancialForm view={view} />
      </div>

      <FinancialList />
    </div>
  );
};

export default Dashboard;
