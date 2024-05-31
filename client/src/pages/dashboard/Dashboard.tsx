import FinancialForm from "./FinancialForm/FinancialForm";
import FinancialList from "./FinancialList/FinancialList";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Dashboard = () => {
  return (
    <div className="m-auto max-w-5xl">
      <div className="pt-[4rem] flex justify-center items-center">
        <RadioGroup className="flex" defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one" className="text-lg">
              Expenses
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two" className="text-lg">
              Incomes
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="m-auto max-w-5xl ">
        <FinancialForm />
        <FinancialList />
      </div>
    </div>
  );
};

export default Dashboard;
