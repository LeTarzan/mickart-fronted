import React from "react";
import { format } from 'date-fns';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

class Tables extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sells: []
    }
    this.getSells = this.getSells.bind(this)
  }

  componentWillMount() {
    this.getSells()
  }

  async getSells() {
    const response = await fetch(`/sells`)
    const result = await response.json()
    console.log('result Sells = ', result)
    this.setState({
      sells: result.data
    })
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Vendas ativas</CardTitle>
                </CardHeader>
                <CardBody>
                  {/*
                    {
                      "id": 1,
                      "amount": "99.99",
                      "date_delivery": "2018-12-26T03:00:00.000Z",
                      "created_at": "2018-12-25T05:09:06.336Z",
                      "updated_at": "2018-12-25T05:09:06.336Z",
                      "user_id": 1,
                      "status": true,
                      "deactivated_at": null
                    }
                  */}
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Data do Pedido</th>
                        <th>Data de Entrega</th>
                        <th>Última atualização</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.sells && this.state.sells.map((item, index) =>
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.name || item.user_id}</td>
                          <td>{format(item.created_at, 'DD/MM/YYYY HH:mm')}</td>
                          <td>{format(item.date_delivery, 'DD/MM/YYYY HH:mm')}</td>
                          <td>{format(item.updated_at, 'DD/MM/YYYY HH:mm')}</td>
                          <td>{item.amount}</td>
                        </tr>)
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Tables;
