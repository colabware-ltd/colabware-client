import { Card, Button, Form, InputGroup } from "react-bootstrap";

const NewRequest = (props) => {
  return (
    <div>
      <p
        style={{ width: "50px" }}
        className="secondary-text label-link"
        onClick={() => {
          console.log("Hello!");
          props.newRequest(false);
        }}
      >
        &lsaquo; Back
      </p>
      <Card className="card-content">
        <h3>Create a new request</h3>
        <p>Submit a new feature or enhancement request for this project</p>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="title" placeholder="Title" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select aria-label="Default select example">
              <option>Select the request type</option>
              <option value="1">New feature</option>
              <option value="2">Existing feature enhancement</option>
              <option value="3">Bug fix</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              as="textarea"
              placeholder="Description"
              rows={3}
              style={{ marginBottom: "20px" }}
            />
          </Form.Group>
          <Form.Group>
            <h5>Set a bounty</h5>
            <p>
              Attach a starting bounty to attract project contributors to your
              request
            </p>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
              <Form.Control
                placeholder="1,000"
                aria-label="1,000"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default NewRequest;
