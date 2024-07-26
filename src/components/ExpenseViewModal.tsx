import { Button, Col, Modal, Row, Stack } from "react-bootstrap";
import { useBudgetContext } from "../hooks/useBudgetContext";
import useExpenseContext from "../hooks/useExpenseContext";
import { BudgetFormData } from "./NewBudgetModal";

interface Props {
  budget: BudgetFormData;
  show: boolean;
  onClose: () => void;
}

const ExpenseViewModal = ({ budget, show, onClose }: Props) => {
  const { setBudgets } = useBudgetContext();
  const { setExpenses, expenses } = useExpenseContext();

  const deleteBudget = (id: string) => {
    setBudgets((prevBudget) => prevBudget.filter((budget) => budget.id !== id));
  };

  const deleteExpense = (description: string) => {
    setExpenses((prevExpense) =>
      prevExpense.filter((expense) => expense.description !== description)
    );
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Stack direction="horizontal" gap={4}>
          <h2>Expenses - {budget.name}</h2>
          <Button
            onClick={() => deleteBudget(budget.id)}
            variant="outline-danger"
          >
            Delete
          </Button>
        </Stack>
      </Modal.Header>
      <Modal.Body>
        {expenses
          .filter((expense) => expense.budgetName === budget.name)
          .map((expense) => (
            <Row className="mb-3">
              <Col>
                <h5>{expense.description}</h5>
              </Col>
              <Col xs="auto">
                <Stack direction="horizontal" gap={2}>
                  <Col>${expense.amount}</Col>
                  <Button
                    onClick={() => deleteExpense(expense.description)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Stack>
              </Col>
            </Row>
          ))}
      </Modal.Body>
    </Modal>
  );
};

export default ExpenseViewModal;
