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
      username: '',
      password: '',
    }
    this.login = this.login.bind(this)
  }

  async login() {
    console.log('Login ', this.state)
    let { username, password } = this.state
    try {
      const response = await fetch(`
      http://localhost:3000/login/
    `, {
          method: 'POST',
          body: JSON.stringify({
            user: {
              password,
              username
            }
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const body = await response.json();
      console.log('body = ', body)
      if (body.data) {
        return this.props.history.push('/dashboard')
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

  render() {
    return (
      <div className="content">
        <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
        </div>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Login</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Usuário</label>
                        <Input
                          placerholder="username"
                          type="text"
                          value={this.state.username}
                          onChange={e => this.setState({ username: e.target.value })}
                        />
                        <label>Senha</label>
                        <Input
                          placerholder="password"
                          type="password"
                          value={this.state.password}
                          onChange={e => this.setState({ password: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                  <Button onClick={this.login} className="btn-fill" color="primary" type="submit">
                    Entrar
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