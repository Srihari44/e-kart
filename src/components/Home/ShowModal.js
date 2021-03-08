import { Modal, Button } from "react-bootstrap";
import FindColor from "../FindColor";

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
          {props.data?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          alt="Product"
          style={{ width: "40%", maxHeight: "225px", marginLeft: "30%" }}
          src={props.data?.image}
        ></img>
        <div className="d-flex justify-content-between px-1 flex-wrap">
          <h4>$ {props.data?.price}</h4>
          <p
            style={{
              backgroundColor: FindColor(props.data?.category)[0],
              color: FindColor(props.data?.category)[1],
              fontWeight: "bold",
            }}
            className="rounded p-1 category"
          >
            # {props.data?.category}
          </p>
        </div>
        <p>{props.data?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ShowModal;
