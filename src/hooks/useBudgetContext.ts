import { useContext } from "react";
import BudgetContext from "../contexts/budgetContext";

export const useBudgetContext = () => useContext(BudgetContext);
