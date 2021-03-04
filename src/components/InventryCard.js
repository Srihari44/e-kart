import { Card, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function InventryCard(props) {
  const reducedTitle = (str) => {
    let words = str.split(" ");
    return words.length <= 4 ? str : words.slice(0, 4).join(" ") + "...";
  };
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        style={{ height: "200px" }}
        variant="top"
        src={props.data.image}
      />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Card.Title>{reducedTitle(props.data.title)}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          #{props.data.category}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          ${props.data.price}
        </Card.Subtitle>
        <div>
          <Button onClick={() => props.showHandler(props.data.id, "update")}>
            Update Item
          </Button>
          <Button
            variant="danger"
            onClick={() => props.rmHandler(props.data.id)}
          >
            Remove Item
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
export default withRouter(InventryCard)