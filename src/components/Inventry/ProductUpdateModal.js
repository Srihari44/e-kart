import { Modal } from "react-bootstrap";
import ProductUpdateForm from "./ProductUpdateForm";

function MyVerticallyCenteredModal(props) {
  let date = new Date();
  let generatedId = date.getMilliseconds();

  const updateProducts = (formState) => {
    switch (props.data.actionType) {
      case "Add":
        props.addHandler({ id: generatedId, ...formState });
        break;
      case "Update":
        props.updHandler(formState.id, formState);
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
          submitHandler={updateProducts}
        />
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
