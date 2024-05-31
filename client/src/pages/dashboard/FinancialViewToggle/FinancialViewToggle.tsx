import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FinancialViewToggleProps {
  setView: (view: "expense" | "income") => void;
}

const FinancialViewToggle: React.FC<FinancialViewToggleProps> = ({
  setView,
}) => {
  const toggleView = (currView: "expense" | "income") => {
    setView(currView);
    console.log(`View set to: ${currView}`);
  };

  return (
    <div className="pt-[4rem] flex justify-center items-center">
      <RadioGroup className="flex gap-5" defaultValue="expense">
        <div className="flex items-center space-x-2 ">
          <RadioGroupItem
            value="expense"
            id="expense"
            onClick={() => toggleView("expense")}
          />
          <Label htmlFor="expense" className="text-lg cursor-pointer">
            Expenses
          </Label>
        </div>
        <div className="flex items-center space-x-2 ">
          <RadioGroupItem
            value="income"
            id="income"
            onClick={() => toggleView("income")}
          />
          <Label htmlFor="income" className="text-lg cursor-pointer">
            Incomes
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default FinancialViewToggle;
