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
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

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
                <CardTitle tag="h4">Vendas</CardTitle>
                <Button className="btn-fill" color="primary" type="submit">
                  Nova venda
                </Button>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">Cliente</th>
                      <th className="text-center">Valor</th>
                      <th className="text-center">Data da Venda</th>
                      <th className="text-center">Data da Entrega</th>
                      <th className="text-center">Atualização</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.sells.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center">{item.user_id}</td>
                        <td className="text-center">{item.amount}</td>
                        <td className="text-center">{format(item.created_at, 'DD/MM/YYYY HH:mm')}</td>
                        <td className="text-center">{format(item.date_delivery, 'DD/MM/YYYY HH:mm')}</td>
                        <td className="text-center">{format(item.updated_at, 'DD/MM/YYYY HH:mm')}</td>
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
