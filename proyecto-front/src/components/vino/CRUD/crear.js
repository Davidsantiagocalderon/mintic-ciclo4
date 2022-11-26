import React from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import "../vinos.css";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";
import { request } from "../../helper/helper";

export default class VinosCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      message: {
        text: "",
        show: false,
      },
      loading: false,
      vino: {
        wine_name: "",
        liqueur_p: "",
        quantity: "",
        years_aged: "",
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
  }
  setValue(inicioc, value) {
    this.setState({
      vino: {
        ...this.state.vino,
        [inicioc]: value,
      },
    });
  }
  guardarVino() {
    this.setState({ loading: true });
    request
      .post("/vino", this.state.vino)
      .then((response) => {
        if (response.data.exito) {
          this.setState({
            redirect: response.data.exito,
            message: {
              text: response.data.msg,
              show: true,
            },
          });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: true });
      });
  }
  onExitedMessage() {
    if (this.state.redirect) this.props.changeTab("buscar");
  }
  render() {
    return (
      <Container id="vinoss-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />
        <Loading show={this.state.loading} />

        <Row>
          <h1> Crear Vino</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("wine_name", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Porcentaje de Alcohol</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("liqueur_p", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Cantidad (mL)</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("quantity", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Años</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("years_aged", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => console.log(this.guardarVino())}
            >
              Guardar Vino
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
