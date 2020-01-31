import React, { Fragment } from "react";
import { format } from 'date-fns';

import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  Col,
  FormGroup,
  Form,
  Input,
  Row,
  Table
} from "reactstrap";
import Select from 'react-select';

class EditSell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      client_id: '',
      sell_id: '',
      clients: [],
      sells: [],
      sellsShow: [],

      product_id: '',
      product_qtd: '',
      product_amount: '',
      product_color: '',
      product_observation: '',
      products: [],
      sellProducts: [],
      typePayments: [],
      date_delivery: '',
      type_payment_id: '',
      token: ''
    }
    this.editSell = this.editSell.bind(this)
    this.addProductToList = this.addProductToList.bind(this)
    this.getClients = this.getClients.bind(this)
    this.getClientSells = this.getClientSells.bind(this)
    this.getProductsOfList = this.getProductsOfList.bind(this)
    this.getTypePayments = this.getTypePayments.bind(this)
    this.setClientId = this.setClientId.bind(this)
  }

  async getClients() {
    const response = await fetch(`
      /users
    `)
    const result = await response.json()
    console.log('result Clients = ', result)
    this.setState({
      clients: result.data.map(item => ({ value: item.id, label: `${item.name} | ${item.email}` }))
    })
  }

  setClientId(clientId) {
    this.setState({
      sells: []
    }, () =>
        this.setState({
          client_id: clientId.value
        }, () => this.getClientSells(clientId.value))
    )
  }

  setSellId(sellId) {
    this.setState({
      sell_id: sellId.value
    })
  }

  async getClientSells(clientId) {
    try {
      console.log('this.state.client_id', clientId)
      this.state.token = sessionStorage.getItem('token')
      const response = await fetch(`/sells/${clientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: this.state.token
        }
      })
      const result = await response.json()
      console.log('result Sells = ', result)
      this.setState({
        sells: result.data,
        sellsShow: result.data.map(item => {
          let data = format(item.created_at, 'DD/MM/YYYY HH:mm')
          return { value: item.sell_id, label: ` ${data} | ${item.amount} | ${item.type_payment_id}` }
        })
      })
    } catch (error) {
      console.log('error ..', error)
      this.errorAlert(error.message)
    }
  }
  async getProductsOfList(sellId) {
    try {
      const response = await fetch(`/lists/by-sell/${sellId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: this.state.token
        }
      })
      const result = await response.json()
      console.log('result list = ', result)
      this.setState({
        products: result.data
      })
    } catch (error) {
      console.log('error ..', error)
      this.errorAlert(error.message)
    }
  }
  // ----------------------------------------

  async getTypePayments() {
    console.log('typePayments ')
    const response = await fetch(`/type-payments`)
    const result = await response.json()
    console.log('result typePayments = ', result)
    this.setState({
      typePayments: result.data.map(item => ({ value: item.id, label: item.type }))
    })
  }

  addProductToList() {
    let produtos = [...this.state.sellProducts]
    console.log('addProductToList', produtos)

    produtos.push({
      id: this.state.product_id.value,
      name: this.state.product_id.label,
      color: this.state.product_color,
      qtd: this.state.product_qtd,
      amount: this.state.product_amount,
      observation: this.state.product_observation
    })

    console.log('produtos ', produtos)
    this.setState({
      sellProducts: produtos
    }, () => {
      this.setState({
        product_id: '',
        product_qtd: '',
        product_amount: '',
        product_color: '',
        product_observation: ''
      })
    })
  }

  async editSell() {
    console.log('editSell ', this.state)
    let { client_id, date_delivery, sellProducts, type_payment_id } = this.state
    try {
      const response = await fetch(`
        /sells
      `, {
          method: 'POST',
          body: JSON.stringify({
            sell: {
              amount: sellProducts.reduce((prev, curr) => (parseFloat(prev) + (parseFloat(curr.qtd) * parseFloat(curr.amount))), 0),
              date_delivery,
              user_id: client_id.value
            },
            list: [
              ...sellProducts.map(item => ({
                product_id: item.id,
                qtd: item.qtd,
                amount: item.amount,
                color: item.color,
                note: item.observation
              }))
            ],
            payment: [
              { type_payment_id: type_payment_id.value }
            ]
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const body = await response.json();
      console.log('body = ', body)
      if (body.data) {
        return this.successAlert('Venda cadastrada com sucesso!')
      }
      throw new Error()
    } catch (error) {
      console.log('error addUser ', error)
      this.errorAlert('Não foi possível cadastrar a venda!')
    }
  }

  componentWillMount() {
    this.getClientSells(5)
    this.getClients()
    // this.getProducts()
    // this.getTypePayments()
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
                  <h5 className="title">Editar Venda</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Cliente</label>
                          <Select
                            className="react-select primary"
                            classNamePrefix="react-select"
                            placeholder="Selecione o Cliente"
                            name="singleSelect"
                            value={this.state.client_id}
                            options={this.state.clients}
                            onChange={value => this.setClientId(value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {console.log('sell id', this.state.sell_id)}
                    {this.state.client_id && <Fragment>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Vendas</label>
                            <Select
                              className="react-select primary"
                              classNamePrefix="react-select"
                              placeholder="Selecione a venda"
                              name="singleSelect"
                              value={this.state.sell_id}
                              options={this.state.sellsShow}
                              onChange={value => this.setSellId(value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Fragment>}

                    {this.state.sell_id && <Fragment>
                      {/* {this.state.sells[this.state.sell_id].map(_ => )} */}
                      {/* {this.venda.produtos.map((it, index) => (<option key={index} >{{ it.nome }}</option>))} */}
                      {this.getProductsOfList(this.state.sell_id)}
                      {console.log('disgraça', this.state.products)}
                      {console.log('djabo', this.state.sell_id)}
                    </Fragment>}
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    disabled={!this.state.date_delivery}
                    className="btn-fill"
                    color="primary"
                    onClick={e => this.addSell()}>
                    Salvar
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

export default EditSell;
