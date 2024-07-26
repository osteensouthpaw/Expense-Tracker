import { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import BudgetList from "./components/BudgetList";
import NewBudgetModal from "./components/NewBudgetModal";
import ExpenseProvider from "./contexts/ExpenseProvider";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <ExpenseProvider>
      <Container className="my-4 ">
        <BudgetList onAddBudget={() => setShow(true)} />
        <NewBudgetModal show={show} handleClose={handleClose} />
      </Container>
    </ExpenseProvider>
  );
}

export default App;
