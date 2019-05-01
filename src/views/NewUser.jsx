import React from "react";

import NotificationAlert from "react-notification-alert";
// reactstrap components
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
  Col
} from "reactstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      name: '',
      lastname: '',
      address: '',
      city: '',
      district: '',
      number: '',
      complement: '',
      zipcode: '',
      comment: ''
    }
    this.addUser = this.addUser.bind(this)
    this.errorAlert = this.errorAlert.bind(this)
    this.successAlert = this.successAlert.bind(this)
  }

  async addUser() {
    console.log('addUser ', this.state)

    let { email, password, username, name, lastname, comment, ...address } = this.state
    try {
      const response = await fetch(`
        /users
      `, {
        method: 'POST',
        body: JSON.stringify({
          user: {
            email,
            password,
            username,
            name,
            lastname,
            comment
          },
          address
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const body = await response.json();
      console.log('body = ', body)
      if (body.data) {
        return this.successAlert('Cliente cadastrado com sucesso!')
      }
      throw new Error()
    } catch (error) {
      console.log('error addUser ', error)
      this.errorAlert('Não foi possível cadastrar o cliente!')
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
      <>
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Adicionar Cliente</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label>Apelido</label>
                          <Input
                            placeholder="Nome do cliente"
                            type="text"
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email
                          </label>
                          <Input
                            placeholder="Digite o email"
                            type="email"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Primeiro Nome</label>
                          <Input
                            placeholder="Primeiro Nome"
                            type="text"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Sobrenome</label>
                          <Input
                            placeholder="Sobrenome"
                            type="text"
                            value={this.state.lastname}
                            onChange={e => this.setState({ lastname: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Endereço</label>
                          <Input
                            placeholder="Endereço"
                            type="text"
                            value={this.state.address}
                            onChange={e => this.setState({ address: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Cidade</label>
                          <Input
                            placeholder="City"
                            type="text"
                            value={this.state.city}
                            onChange={e => this.setState({ city: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Bairro</label>
                          <Input
                            placeholder="Bairro"
                            type="text"
                            value={this.state.district}
                            onChange={e => this.setState({ district: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Número</label>
                          <Input
                            placeholder="Número"
                            type="text"
                            value={this.state.number}
                            onChange={e => this.setState({ number: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Complemento</label>
                          <Input
                            placeholder="Complemento"
                            type="text"
                            value={this.state.complement}
                            onChange={e => this.setState({ complement: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>CEP</label>
                          <Input
                            placeholder="CEP"
                            type="text"
                            value={this.state.zipcode}
                            onChange={e => this.setState({ zipcode: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <label>Observação</label>
                          <Input
                            cols="80"
                            placeholder="Adicione aqui a observação"
                            type="textarea"
                            value={this.state.comment}
                            onChange={e => this.setState({ comment: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button onClick={this.addUser} className="btn-fill" color="primary" type="submit">
                    Adicionar
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/emilyz.jpg")}
                      />
                      <h5 className="title">Mike Andrew</h5>
                    </a>
                    <p className="description">Ceo/Co-Founder</p>
                  </div>
                  <div className="card-description">
                    Do not be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
