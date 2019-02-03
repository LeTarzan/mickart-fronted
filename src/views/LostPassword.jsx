import React from "react";
import { withRouter } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { Fragment } from "react";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  CardTitle
} from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
    }
    this.restorePassword = this.restorePassword.bind(this)
  }

  async restorePassword() {
    try {
      const response = await fetch(`
      http://localhost:3000/password/restore
    `, {
          method: 'POST',
          body: JSON.stringify({
            email: this.state.email
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const body = await response.json();
      console.log(body)
      if (body.result) {
        this.successAlert(body.msg)
      } else {
        this.errorAlert(body.msg)
      }
      throw new Error()
    } catch (error) {
      console.log('error login ', error)
      return this.errorAlert('Usuário ou senha incorreto!')
    }
  }

  errorAlert(text) {
    this.refs.notificationAlert.notificationAlert({
      place: "tc",
      message: (
        <div>
          <div>
            {text}
          </div>
        </div>
      ),
      type: "danger",
      icon: "tim-icons icon-alert-circle-exc"
    });
  }

  successAlert(text) {
    this.refs.notificationAlert.notificationAlert({
      place: 'tc',
      message: (
        <div>
          <div>
            {text}
          </div>
        </div>
      ),
      type: 'success',
      icon: "tim-icons icon-check-2"
    });
  }

  render() {
    return (
      // eslint-disable-next-line react/style-prop-object
      <div style={{ textAlign: 'center' }} className="content centralize">
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <Row>
          <Col sm="12" md={{ size: 5, offset: 2 }}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4"></CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row style={{ justifyContent: "center" }}>
                    <Col className="pr-md-1" md="10x">
                      <FormGroup>
                        <label>Digite seu email</label>
                        <Input
                          placerholder="email"
                          type="text"
                          position="absolute"
                          top="20px"
                          left="50px"
                          value={this.state.username}
                          onChange={e => this.setState({ email: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button onClick={() => this.restorePassword()} className="btn-fill" color="primary" type="submit">
                  Recuperar senha
                  </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default withRouter(Login)