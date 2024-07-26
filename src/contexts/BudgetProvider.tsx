import { ReactNode, useState } from "react";
import BudgetContext from "./budgetContext";
import { BudgetFormData } from "../components/NewBudgetModal";

interface Props {
  children: ReactNode;
}

const BudgetProvider = ({ children }: Props) => {
  const [budgets, setBudgets] = useState<BudgetFormData[]>([]);

  return (
    <BudgetContext.Provider value={{ budgets, setBudgets }}>
      {children}
    </BudgetContext.Provider>
  );
};

export default BudgetProvider;
