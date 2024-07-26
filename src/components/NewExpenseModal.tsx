import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { BudgetFormData } from "./NewBudgetModal";
import { useBudgetContext } from "../hooks/useBudgetContext";
import useExpenseContext from "../hooks/useExpenseContext";

interface Props {
  handleClose: () => void;
  show: boolean;
  currentBudget?: BudgetFormData;
}

export interface ExpenseFormData {
  id: string;
  description: string;
  amount: number;
  budgetName: string;
}

const NewExpenseModal = ({ currentBudget, handleClose, show }: Props) => {
  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const [selectedBudget, setSelectedBudget] = useState("");
  const { budgets } = useBudgetContext();
  const { setExpenses } = useExpenseContext();

  useEffect(() => {
    if (currentBudget) setSelectedBudget(currentBudget.name);
  }, [currentBudget]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (descriptionRef.current && amountRef.current && selectedBudget) {
      const expense: ExpenseFormData = {
        id: crypto.randomUUID(),
        description: descriptionRef.current.value,
        amount: parseInt(amountRef.current.value),
        budgetName: selectedBudget,
      };
      setExpenses((prevExpenses) => [...prevExpenses, expense]);
    } else return;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Stack gap={3}>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control ref={descriptionRef} type="text" />
            </Form.Group>

            <Form.Group controlId="amount">
              <Form.Label>amount</Form.Label>
              <Form.Control ref={amountRef} type="number" />
            </Form.Group>

            {currentBudget ? (
              <Form.Control type="hidden" value={selectedBudget} />
            ) : (
              <Form.Group controlId="budget">
                <Form.Label>Budget</Form.Label>
                <Form.Select
                  onChange={(event) => setSelectedBudget(event.target.value)}
                >
                  <option value="" disabled selected>
                    Select a budget
                  </option>
                  {budgets.map((budget) => (
                    <option key={budget.id} value={budget.name}>
                      {budget.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
            <Button
              onClick={handleClose}
              className="align-self-end"
              type="submit"
            >
              Add
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewExpenseModal;
