import { useUser } from "@clerk/clerk-react";

import FinancialForm from "./FinancialForm/FinancialForm";
import FinancialList from "./FinancialList/FinancialList";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>Welcome {user?.firstName}!</h1>

      <div>
        <FinancialForm />
        <FinancialList />
      </div>
    </div>
  );
};

export default Dashboard;
