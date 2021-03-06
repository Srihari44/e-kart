import { Card, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import FindColor from "../FindColor";

const reducedTitle = (str) => {
  let words = str.split(" ");
  return words.length <= 4 ? str : words.slice(0, 4).join(" ") + "...";
};

function ShowCard(props) {
  let categoryColors = FindColor(props.data.category);
  return (
    <Card style={{ width: "16rem", maxHeight: "fit-content" }}>
      <Card.Img
        style={{ height: "220px", padding: "25px", paddingBottom: "0" }}
        variant="top"
        src={props.data.image}
      />
      <Card.Body className="d-flex flex-column align-items-center justify-content-between">
        <Card.Title>
          {props.data.title && reducedTitle(props.data.title)}
        </Card.Title>
        <Card.Subtitle
          style={{
            width: "fit-content",
            backgroundColor: categoryColors[0],
            color: categoryColors[1],
          }}
          className="mb-2 rounded p-1 category"
        >
          # {props.data.category}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 price" style={{ fontSize: "25px" }}>
          ${props.data.price}
        </Card.Subtitle>

        {props.addCartHandler && (
          <div className="d-flex flex-column align-items-stretch">
            <Button onClick={() => props.addCartHandler(props.data.id)}>
              Add to Cart
            </Button>
            <Button onClick={() => props.showHandler(props.data.id)}>
              View Product
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default withRouter(ShowCard);
