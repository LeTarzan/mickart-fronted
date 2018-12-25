import React, { Fragment } from "react";

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
      products: [],
      clients: [],
      address: '',
      sellProducts: []
    }
    this.getClients = this.getClients.bind(this)
    this.getClientAddress = this.getClientAddress.bind(this)
    this.getProducts = this.getProducts.bind(this)
    this.setClientId = this.setClientId.bind(this)
    this.addProductToList = this.addProductToList.bind(this)
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
      address: ''
    }, () =>
      this.setState({
        client_id: clientId
      }, () => this.getClientAddress(clientId.value))
    )
  }

  async getProducts() {
    const response = await fetch(`/products`)
    const result = await response.json()
    console.log('result Products = ', result)
    this.setState({
      products: result.data.map(item => ({ value: item.id, label: `${item.name} | comp: ${item.size_available}` }))
    })
  }

  async getClientAddress(clientId) {
    console.log('this.state.client_id', clientId)
    const response = await fetch(`/address/${clientId}`)
    const result = await response.json()
    console.log('result Address = ', result)
    this.setState({
      address: { ...result.data[0] }
    })
  }

  addProductToList() {
    let produtos = [...this.state.sellProducts]
    console.log('addProductToList', produtos)

    produtos.push({
      name: this.state.product_id,
      color: this.state.product_color,
      qtd: this.state.product_qtd,
      amount: this.state.product_amount
    })

    this.setState({
      sellProducts: produtos
    }, () => {
      this.setState({
        product_id: '',
        product_qtd: '',
        product_amount: '',
        product_color: ''
      })
    })
  }

  componentWillMount() {
    this.getClients()
    this.getProducts()
  }

  render() {
    return (
      <>
        <div className="content">
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
                            style={{display: 'block',
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
                        <Col className="px-md-1" md="4">
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
                    {this.state.client_id && <Row>
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
                      <Col className="pr-md-1" md="3">
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
                            value={this.state.comment}
                            onChange={e => this.setState({ comment: e.target.value })}
                          />
                        </FormGroup>
                        <Button onClick={e => this.addProductToList()}>
                          Adicionar Produto
                        </Button>
                      </Col>
                    </Row>}
                    {this.state.sellProducts.length && <Table><thead className="text-primary">
                      <tr>
                        <th>Descrição</th>
                        <th>Cor</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.sellProducts.map((item, index) => <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.color}</td>
                        <td>{item.qtd}</td>
                        <td>{item.amount}</td>
                        <td>{item.qtd * item.amount}</td>
                      </tr>)}
                    </tbody>
                    </Table>}
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    disabled={!this.state.product_id}
                    className="btn-fill"
                    color="primary"
                    type="submit">
                    Save
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
