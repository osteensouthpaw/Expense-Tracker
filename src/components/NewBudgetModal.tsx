import { FormEvent, useRef } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useBudgetContext } from "../hooks/useBudgetContext";

export interface BudgetFormData {
  id: string;
  name: string;
  budgetAmount: number;
}

interface BudgetModalProps {
  show: boolean;
  handleClose: () => void;
}

const NewBudgetModal = ({ handleClose, show }: BudgetModalProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const budgetRef = useRef<HTMLInputElement>(null);
  const { setBudgets } = useBudgetContext();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (nameRef.current && budgetRef.current) {
      const newBudget: BudgetFormData = {
        id: crypto.randomUUID(),
        name: nameRef.current.value,
        budgetAmount: parseInt(budgetRef.current.value),
      };
      setBudgets((prevBudgets: BudgetFormData[]) => [
        ...prevBudgets,
        newBudget,
      ]);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Stack gap={4}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control ref={nameRef} type="text" />
            </Form.Group>
            <Form.Group controlId="expense">
              <Form.Label>Maximum Spending</Form.Label>
              <Form.Control ref={budgetRef} type="number" />
            </Form.Group>
            <Button
              className="align-self-end"
              onClick={handleClose}
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

export default NewBudgetModal;
