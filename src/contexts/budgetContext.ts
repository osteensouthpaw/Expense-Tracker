import React, { Dispatch, SetStateAction } from "react";
import { BudgetFormData } from "../components/NewBudgetModal";

export interface BudgetContextType {
  budgets: BudgetFormData[];
  setBudgets: Dispatch<SetStateAction<BudgetFormData[]>>;
}

const BudgetContext = React.createContext<BudgetContextType>(
  {} as BudgetContextType
);
export default BudgetContext;
