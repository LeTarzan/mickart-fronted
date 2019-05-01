import React from "react";

import validateUser from "../validations/index"

import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
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
    super(props);
    this.state = {
      id: '',
      name: '',
      lastname: '',
      username: '',
      address: '',
      district: '',
      city: '',
      number: '',
      complement: '',
      zipcode: '',
      addressId: ''
    };
    this.getDataUser = this.getDataUser.bind(this)
  }

  async getDataUser() {
    let token = localStorage.getItem('token')
    const response = await fetch('/users/full/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    })
    const body = await response.json()

    if (response.status !== 200) throw Error(body.message)

    this.setState({
      id: body.data[0].id,
      name: body.data[0].name,
      lastname: body.data[0].lastname,
      username: body.data[0].username,
      address: body.data[0].address,
      district: body.data[0].district,
      city: body.data[0].city,
      number: body.data[0].number,
      complement: body.data[0].complement,
      zipcode: body.data[0].zipcode,
      addressId: body.data[0].a_id,
      currentPassword: '',
      newPassword: ''
    }, () => console.log('this.state', this.state))
  }

  async save() {
    try {
      let data = {}
      data.user = {}
      data.address = {}
      data.password = {}
      data.user = {
        id: this.state.id,
        lastname: this.state.lastname,
        name: this.state.name,
      }
      data.password = {
        id: this.state.id,
        currentPassword: this.state.currentPassword,
        newPassword: this.state.newPassword
      }
      data.address = {
        id: this.state.addressId,
        address: this.state.address,
        city: this.state.city,
        number: this.state.number,
        complement: this.state.complement,
        zipcode: this.state.zipcode,
        district: this.state.district,
        user_id: this.state.id
      }
      console.log('data..', data)
      let rs = await validateUser(data)
      console.log('rs ',rs)
      if (!rs.result) {
        return this.errorAlert(rs.msg)
      }
      let token = localStorage.getItem('token')
      console.log('data..', data)
      const response = await fetch('/users/', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        }
      })
      if (response.status === 200) {
        return this.successAlert('Atualizado com sucesso')
      }
      return this.errorAlert('Falha ao atualizar')
    } catch (error) {
      console.log('error save...', error)
    }
  }

  async componentDidMount() {
    this.getDataUser()
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
        {console.log('teste..', this.state.dataUser)}
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Editar Perfil</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Nome</label>
                          <Input
                            defaultValue={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                            placeholder="Nome"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Sobrenome</label>
                          <Input
                            defaultValue={this.state.lastname}
                            onChange={e => this.setState({ lastname: e.target.value })}
                            placeholder="Sobrenome"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label >Nome de usuário</label>
                          <Input
                            defaultValue={this.state.username}
                            disabled
                            placeholder="Usuário"
                            type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label >Senha atual</label>
                          <Input
                            placeholder="Senha"
                            onChange={e => this.setState({ currentPassword: e.target.value })}
                            type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label >Nova senha</label>
                          <Input
                            placeholder="Nova senha"
                            onChange={e => this.setState({ newPassword: e.target.value })}
                            type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Rua</label>
                          <Input
                            defaultValue={this.state.address}
                            onChange={e => this.setState({ address: e.target.value })}
                            placeholder="Rua"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Bairro</label>
                          <Input
                            defaultValue={this.state.district}
                            onChange={e => this.setState({ district: e.target.value })}
                            placeholder="Bairro"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Cidade</label>
                          <Input
                            defaultValue={this.state.city}
                            onChange={e => this.setState({ city: e.target.value })}
                            placeholder="Cidade"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Número</label>
                          <Input
                            defaultValue={this.state.number}
                            onChange={e => this.setState({ number: e.target.value })}
                            placeholder="Número"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Complemento</label>
                          <Input
                            defaultValue={this.state.complement}
                            onChange={e => this.setState({ complement: e.target.value })}
                            placeholder="Complemento"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>CEP</label>
                          <Input
                            defaultValue={this.state.zipcode}
                            onChange={e => this.setState({ zipcode: e.target.value })}
                            placeholder="Cep"
                            type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col md="8">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            cols="80"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo."
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" onClick={e => this.save()} color="primary" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            {/* <Col md="4">
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
            </Col> */}
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
