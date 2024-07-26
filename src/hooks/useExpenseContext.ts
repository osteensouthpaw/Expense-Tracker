import { useContext } from "react";
import ExpenseContext from "../contexts/expenseContext";

const useExpenseContext = () => useContext(ExpenseContext);

export default useExpenseContext;
