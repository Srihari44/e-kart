import { Modal, Button } from "react-bootstrap";

function ShowModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          alt="Product"
          style={{ width: "40%", maxHeight: "225px", marginLeft: "30%" }}
          src={props.data.image}
        ></img>
        <h4>$ {props.data.price}</h4>
        <p>{props.data.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ShowModal;
