import { Card, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function BootstrapCard(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        style={{ height: "250px" }}
        variant="top"
        src={props.data.image}
      />
      <Card.Body>
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          #{props.data.category}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          ${props.data.price}
        </Card.Subtitle>
        <Card.Text>
          {props.data.description.split(" ").slice(0, 10).join(" ") + "..."}
        </Card.Text>
        {props.location.pathname === "/inventry" ? (
          <div>
            <Button onClick={() => props.showHandler(props.data.id)}>
              Update Item
            </Button>
            <Button
              variant="danger"
              onClick={() => props.rmHandler(props.data.id)}
            >
              Remove Item
            </Button>
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
}
export default withRouter(BootstrapCard)