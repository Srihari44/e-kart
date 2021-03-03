import { Card, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
const reducedTitle = (str) => {
    let words = str.split(" ");
    return words.length<=4 ? str : words.slice(0,4).join(" ") + "..."
}
function ShowCard(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        style={{ height: "200px" }}
        variant="top"
        src={props.data.image}
      />
      <Card.Body>
        <Card.Title>{reducedTitle(props.data.title)}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          #{props.data.category}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          ${props.data.price}
        </Card.Subtitle>
        <div>
          <Button style={{alignSelf: "flex-end"}} onClick={() => props.showHandler(props.data.id)}>
            View Product
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
export default withRouter(ShowCard);
