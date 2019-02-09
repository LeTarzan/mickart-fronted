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
      name: '',
      qtdStore: '',
      value: '',
      size: ''
    }
    this.addProduct = this.addProduct.bind(this)
    this.errorAlert = this.errorAlert.bind(this)
    this.successAlert = this.successAlert.bind(this)
  }

  async dataValidate(data){
    if(!data.name || data.name < 3){
      return { result: false, msg: 'Nome inválido' }
    }
    if(!data.qtd_stored || data.qtd_stored <= 0){
      return { result: false, msg: 'Quantidade em estoque inválida' }
    }
    if(!data.value || data.value <= 0){
      return { result: false, msg: 'Valor inválido' }
    }
    if(!data.size_available || data.size_available <= 0){
      return { result: false, msg: 'Tamanho inválido' }
    }
    return { result: true }
  }

  async addProduct() {
    console.log('addProduct ', this.state)
    let { name, qtdStore, value, size } = this.state
    let data = { name, qtd_stored: qtdStore, value, size_available: size }
    let rs = await this.dataValidate(data)
    console.log('rs..', rs)
    if(!rs.result){
      return this.errorAlert(rs.msg)
    }
    console.log('aaa')
    let token = localStorage.getItem('token')
    try {
      const response = await fetch(`
        /products
      `, {
        method: 'POST',
        body: JSON.stringify(
          data
        ),
        headers:{
          'Content-Type': 'application/json',
          authorization: token
        }
      })
      const body = await response.json();
      console.log('body = ', body)
      if (body.data) {
        return this.successAlert(body.msg)
      }
      throw new Error()
    } catch (error) {
      console.log('error addProduct ', error)
      this.errorAlert('Não foi possível cadastrar o produto!')
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
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Adicionar produto</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Nome</label>
                          <Input
                            placeholder="Nome do produto"
                            type="text"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>
                            Quantidade em estoque
                          </label>
                          <Input
                            placeholder="Quantidade"
                            min="1" step="1"
                            type="number"
                            value={this.state.qtdStore}
                            onChange={e => this.setState({ qtdStore: e.target.value })}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Valor (em Reais)</label>
                          <Input
                            placeholder="Valor"
                            type="number"
                            min="1" step="1"
                            value={this.state.value}
                            onChange={e => this.setState({ value: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Tamanho disponível (Em metros)</label>
                          <Input
                            placeholder="Tamanho"
                            type="number"
                            min="0.1" step="1"
                            value={this.state.size}
                            onChange={e => this.setState({ size: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button onClick={this.addProduct} className="btn-fill" color="primary" type="submit">
                    Adicionar
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
