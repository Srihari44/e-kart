import { Modal } from "react-bootstrap";
import ProductUpdateForm from "./ProductUpdateForm";

function MyVerticallyCenteredModal(props) {
  let date = new Date();
  let generatedId = date.getMilliseconds();

  const handleSubmit = (e, formState) => {
    e.preventDefault();
    switch (props.data.actionType) {
      case "Add":
        props.addHandler({ id: generatedId, ...props.data, ...formState });
        break;
      case "Update":
        props.updHandler(props.data.id, { ...props.data, ...formState });
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.actionType} data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductUpdateForm
          handleClose={props.handleClose}
          data={props.data}
          submitHandler={handleSubmit}
        />
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
