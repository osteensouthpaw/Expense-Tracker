import { useState } from "react";
import { Button, Col, Row, Stack } from "react-bootstrap";
import { useBudgetContext } from "../hooks/useBudgetContext";
import BudgetCard from "./BudgetCard";
import NewExpenseModal from "./NewExpenseModal";

interface Props {
  onAddBudget: () => void;
}

const BudgetList = ({ onAddBudget }: Props) => {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const { budgets } = useBudgetContext();

  return (
    <>
      <Row className="mb-4">
        <Col>
          <h1>Budgets</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Button onClick={onAddBudget}>Add Budget</Button>
            <Button
              onClick={() => setShowExpenseModal(true)}
              variant="outline-primary"
            >
              Add Expense
            </Button>
          </Stack>
        </Col>
      </Row>
      <Row sm={1} md={2} lg={3} className="g-3">
        {budgets.map((budget) => (
          <Col>
            <BudgetCard key={budget.id} budget={budget} />
          </Col>
        ))}
      </Row>
      <NewExpenseModal
        show={showExpenseModal}
        handleClose={() => setShowExpenseModal(false)}
      />
    </>
  );
};

export default BudgetList;
