import React from "react";
import NotificationAlert from "react-notification-alert";
// reactstrap components
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
  Col
} from "reactstrap";

import { validateProduct } from "../validations/validateProduct" 

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

  async addProduct() {
    console.log('addProduct ', this.state)
    let { name, qtdStore, value, size } = this.state
    let data = { name, qtd_stored: qtdStore, value, size_available: size }
    let rs = await validateProduct(data)
    console.log('rs..', rs)
    if (!rs.result) {
      return this.errorAlert(rs.msg)
    }
    let token = sessionStorage.getItem('token')
    try {
      await fetch(`http://localhost:3000/products`, {
        method: 'POST',
        body: JSON.stringify(
          data
        ),
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        }
      })
        .then(async response => {
          
          if (response.status !== 200) {
            throw new Error()
          }

          return this.successAlert('Produto inserido com sucesso')
        })
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
                            onChange={e => this.setState({ qtdStore: e.target.value })} />
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
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
