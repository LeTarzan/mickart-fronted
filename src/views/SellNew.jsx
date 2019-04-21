import React, { Fragment } from "react";


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

class NewSell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      client_id: '',
      product_id: '',
      product_qtd: '',
      product_amount: '',
      product_color: '',
      product_observation: '',
      products: [],
      clients: [],
      address: '',
      sellProducts: [],
      typePayments: [],
      date_delivery: '',
      type_payment_id: ''
    }
    this.addSell = this.addSell.bind(this)
    this.addProductToList = this.addProductToList.bind(this)
    this.getClients = this.getClients.bind(this)
    this.getClientAddress = this.getClientAddress.bind(this)
    this.getProducts = this.getProducts.bind(this)
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


  async getProducts() {
    const response = await fetch(`/products`)
    const result = await response.json()
    console.log('result Products = ', result)
    this.setState({
      products: result.data.map(item => ({ value: item.id, label: `${item.name} | comp: ${item.size_available}` }))
    })
  }

  setClientId(clientId) {
    this.setState({
      address: ''
    }, () =>
        this.setState({
          client_id: clientId
        }, () => this.getClientAddress(clientId.value))
    )
  }

  async getClientAddress(clientId) {
    console.log('this.state.client_id', clientId)
    const response = await fetch(`/addresses/${clientId}`)
    const result = await response.json()
    console.log('result Address = ', result)
    this.setState({
      address: { ...result.data[0] }
    })
  }

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

  async addSell() {
    console.log('addSell ', this.state)
    /*
      client_id: '',
      product_id: '',
      product_qtd: '',
      product_amount: '',
      product_color: '',
      product_observation: '',
      products: [],
      clients: [],
      address: '',
      sellProducts: []
    */

    /*
      {
        "sell": {
          "amount": 0.00,
          "user_id": 1,
          "date_delivery": "2018-12-24"
        },
        "list": [
          {
            "qtd": 2,
            "amount": 119.99,
            "product_id": 1
          }
        ],
        "payment": [
          {
            "type_payment_id": 1
          }
        ]
      }
    */
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
    this.getClients()
    this.getProducts()
    this.getTypePayments()
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
                  <h5 className="title">Nova Venda</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="8">
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
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Novo Cliente?</label>
                          <Button
                            className="btn-fill"
                            color="primary"
                            style={{
                              display: 'block',
                              margin: 0,
                              height: '38px'
                            }}
                          >
                            Adicionar
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.state.address && <Fragment>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Endereço</label>
                            <Input
                              placeholder="Endereço"
                              readOnly={true}
                              type="text"
                              value={this.state.address.address}
                            // onChange={e => this.setState({ address: e.target.value })}
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
                              readOnly={true}
                              type="text"
                              value={this.state.address.city}
                            // onChange={e => this.setState({ city: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="4">
                          <FormGroup>
                            <label>Bairro</label>
                            <Input
                              placeholder="Bairro"
                              readOnly={true}
                              type="text"
                              value={this.state.address.district}
                            // onChange={e => this.setState({ district: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <label>Número</label>
                            <Input
                              placeholder="Número"
                              readOnly={true}
                              type="text"
                              value={this.state.address.number}
                            // onChange={e => this.setState({ number: e.target.value })}
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
                              readOnly={true}
                              type="text"
                              value={this.state.address.complement}
                            // onChange={e => this.setState({ complement: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <label>CEP</label>
                            <Input
                              placeholder="CEP"
                              readOnly={true}
                              type="number"
                              value={this.state.address.zipcode}
                            // onChange={e => this.setState({ zipcode: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Fragment>}
                    {this.state.client_id &&
                      <Row>
                        <Col className="pr-md-1" md="8">
                          <FormGroup>
                            <label>Produto</label>
                            <Select
                              className="react-select primary"
                              classNamePrefix="react-select"
                              placeholder="Selecione o Produto"
                              name="singleSelect"
                              value={this.state.product_id}
                              options={this.state.products}
                              onChange={value =>
                                this.setState({ product_id: value })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>}
                    {this.state.product_id && <Row>
                      <Col className="pr-md-1" md="2">
                        <FormGroup>
                          <label>Valor</label>
                          <Input
                            placeholder="Valor"
                            type="text"
                            value={this.state.product_amount}
                            onChange={e => this.setState({ product_amount: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="2">
                        <FormGroup>
                          <label>Quantidade</label>
                          <Input
                            placeholder="Valor"
                            type="text"
                            value={this.state.product_qtd}
                            onChange={e => this.setState({ product_qtd: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Cor</label>
                          <Input
                            placeholder="Cor"
                            type="text"
                            value={this.state.product_color}
                            onChange={e => this.setState({ product_color: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>}
                    {this.state.product_id && <Row>
                      <Col md="8">
                        <FormGroup>
                          <label>Observação</label>
                          <Input
                            cols="80"
                            placeholder="Adicione aqui a observação"
                            type="textarea"
                            value={this.state.product_observation}
                            onChange={e => this.setState({ product_observation: e.target.value })}
                          />
                        </FormGroup>
                        <Button onClick={e => this.addProductToList()}>
                          Adicionar Produto
                        </Button>
                      </Col>
                    </Row>}
                    {this.state.sellProducts.length ? <Table>
                      <thead className="text-primary">
                        <tr>
                          <th>Descrição</th>
                          <th>Cor</th>
                          <th>Observações</th>
                          <th>Quantidade</th>
                          <th>Valor</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.sellProducts.map((item, index) => <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.color}</td>
                          <td>{item.observation}</td>
                          <td>{item.qtd}</td>
                          <td>{item.amount}</td>
                          <td>{item.qtd * item.amount}</td>
                        </tr>)}
                      </tbody>
                    </Table> : ''}
                    {this.state.sellProducts.length ? <Row>
                      <Col className="pr-md-1" md="8">
                        <FormGroup>
                          <label>Forma de Pagamento</label>
                          <Select
                            className="react-select primary"
                            classNamePrefix="react-select"
                            placeholder="Selecione o Tipo de Pagamento"
                            name="typePaymentsSelect"
                            value={this.state.type_payment_id}
                            options={this.state.typePayments}
                            onChange={value => this.setState({ type_payment_id: value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Data Entrega</label>
                          <Input
                            placeholder="Data Entrega"
                            type="text"
                            value={this.state.date_delivery}
                            onChange={e => this.setState({ date_delivery: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row> : ''}
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

export default NewSell;
