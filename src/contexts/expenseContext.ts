import React, { Dispatch, SetStateAction } from "react";
import { ExpenseFormData } from "../components/NewExpenseModal";

export interface ExpenseContextType {
  expenses: ExpenseFormData[];
  setExpenses: Dispatch<SetStateAction<ExpenseFormData[]>>;
}

const ExpenseContext = React.createContext<ExpenseContextType>(
  {} as ExpenseContextType
);
export default ExpenseContext;
