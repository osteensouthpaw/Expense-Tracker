import { useState } from "react";
import { Button, Card, Col, ProgressBar, Row, Stack } from "react-bootstrap";
import useExpenseContext from "../hooks/useExpenseContext";
import ExpenseViewModal from "./ExpenseViewModal";
import { BudgetFormData } from "./NewBudgetModal";
import NewExpenseModal from "./NewExpenseModal";

interface Props {
  budget: BudgetFormData;
}

const BudgetCard = ({ budget }: Props) => {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const { expenses } = useExpenseContext();

  const findExpense = () => {
    console.log("budget: ", expenses);
    const filteredExpenses = findExpensesByBudget(budget.name);
    return filteredExpenses.reduce((acc, expense) => {
      return (acc += expense.amount);
    }, 0);
  };

  const findExpensesByBudget = (name: string) => {
    return expenses.filter((expense) => expense.budgetName === name);
  };

  const progressPercentage = () => {
    return parseFloat(((findExpense() / budget.budgetAmount) * 100).toFixed(2));
  };

  const variant: string =
    progressPercentage() > 99
      ? "danger"
      : progressPercentage() > 49
      ? "warning"
      : "";

  return (
    <Card className=" mb-3">
      <Card.Header>
        <Row>
          <Col>
            <Card.Title>{budget.name}</Card.Title>
          </Col>
          <Col>
            ${findExpense()}/<span>${budget.budgetAmount}</span>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <ProgressBar now={progressPercentage()} variant={variant} />
      </Card.Body>
      <Card.Footer>
        <Stack direction="horizontal" gap={2}>
          <Button
            onClick={() => setShowAddExpenseModal(true)}
            variant="outline-primary"
          >
            Add Expense
          </Button>
          <Button
            onClick={() => setShowExpenseModal(true)}
            variant="outline-secondary"
          >
            View Expenses
          </Button>
        </Stack>
      </Card.Footer>
      <ExpenseViewModal
        show={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        budget={budget}
      />
      <NewExpenseModal
        currentBudget={budget}
        handleClose={() => setShowAddExpenseModal(false)}
        show={showAddExpenseModal}
      />
    </Card>
  );
};

export default BudgetCard;
