
import FinancialForm from "./FinancialForm/FinancialForm";
import FinancialList from "./FinancialList/FinancialList";

const Dashboard = () => {

  return (
    <div>
      <div>
        <h1>Welcome !</h1>
        <p>Add Your Income/Expense</p>
      </div>

      <div className="m-auto max-w-[1000px]">
        <FinancialForm />
        <FinancialList />
      </div>
    </div>
  );
};

export default Dashboard;
