import { ReactNode, useState } from "react";
import { ExpenseFormData } from "../components/NewExpenseModal";
import ExpenseContext from "./expenseContext";

interface Props {
  children: ReactNode;
}

const ExpenseProvider = ({ children }: Props) => {
  const [expenses, setExpenses] = useState<ExpenseFormData[]>([]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
