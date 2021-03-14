import { Modal, Button } from "react-bootstrap";
import ShowCard from "../Home/ShowCard";

export default function RemoveModal(props) {
  const submitHandler = () => {
    props.rmHandler(props.data.id);
    props.handleClose();
  };
  return (
    <Modal show={props.show} onHide={props.handleClose} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Remove Confirmation</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex align-items-center p-2 flex-wrap">
          <div style={{ maxWidth: "175px" }}>
            <p className="mr-3" style={{ fontSize: "1.5rem" }}>
              Are you sure you want to remove this item?
            </p>
            <p className="text-muted">This item will be removed permanantly.</p>
          </div>
          {props.data && <ShowCard data={props.data} />}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.handleClose} variant="secondary">
          No
        </Button>
        <Button onClick={submitHandler} variant="primary">
          Yes, proceed
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
