import React from "react";
import { withRouter } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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

    let { username, password } = this.state
    
    await fetch(`http://localhost:3000/login/`, {
      method: 'POST',
      body: JSON.stringify({
        password,
        username
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async result => await result.json())
      .then(result => {
        if (result.token) {
          sessionStorage.setItem('token', result.token);
          if (result.rid === 2) {
            return this.props.history.push('/user/dashboard-user')
          }
          return this.props.history.push('/admin/dashboard')
        }
        if (result.msg) return this.errorAlert('Usuário ou senha incorreto!')
        throw new Error('Erro ao logar!')
      })
      .catch(err => {
        console.log('error.. ', err)
        return this.errorAlert(err.message) 
      })
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
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Usuário</label>
                        <Input
                          placerholder="username"
                          type="text"
                          position="absolute"
                          top="20px"
                          left="50px"
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
                <Col className="pr-md-1" md="12">
                  <Button onClick={this.login} className="btn-fill" color="primary" type="submit">
                    Entrar
                  </Button>
                </Col>
              </CardFooter>
              <CardFooter>
                <Button onClick={() => this.props.history.push('/user/esqueci-senha')} style={{ float: "center" }} color="link">Esqueci minha senha</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default withRouter(Login)