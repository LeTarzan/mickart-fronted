import React from "react";
import { format } from 'date-fns';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sells: []
    };
    this.getSellsFromAPI = this.getSellsFromAPI.bind(this)
  }

  async getSellsFromAPI() {
    let token = localStorage.getItem('token')
    const response = await fetch(`
      /sells
    `, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: token
          }
        });

    if(response.status !== 200){
      return this.props.history.push('/user/login')
    }

    const body = await response.json();

    this.setState({
      sells: body.data
    })
  }

  async componentWillMount() {
    this.getSellsFromAPI();
  }

  render() {
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Compras</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">Produto</th>
                      <th className="text-center">Quantidade</th>
                      <th className="text-center">Valor</th>
                      <th className="text-center">Forma de pagamento</th>
                      <th className="text-center">Data da Compra</th>
                      <th className="text-center">Data da Entrega</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log('vendas', this.state.sells)}
                    {this.state.sells.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center">{item.name}</td>
                        <td className="text-center">{item.qtd}</td>
                        <td className="text-center">{item.amount}</td>
                        <td className="text-center">{item.type}</td>
                        <td className="text-center">{format(item.created_at, 'DD/MM/YYYY HH:mm')}</td>
                        <td className="text-center">{item.status ? format(item.date_delivery, 'DD/MM/YYYY HH:mm') : '..'}</td>
                        <td className="text-center">{item.status ? 'Ativo' : 'Cancelado'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
