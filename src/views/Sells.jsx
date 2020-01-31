import React from "react";
import { format } from 'date-fns';
import { withRouter } from 'react-router-dom';

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

class Tables extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sells: []
    }
    this.getSells = this.getSells.bind(this)
    this.goToDetail = this.goToDetail.bind(this)
    console.log('props ', props)
  }

  componentWillMount() {
    this.getSells()
  }

  async getSells() {
    let token = sessionStorage.getItem('token')
    const tokenobj = {}
    tokenobj.token = token
    const response = await fetch(`
      /sells
    `, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: token
          }
        });
    const result = await response.json()
    console.log('result Sells = ', result)
    this.setState({
      sells: result.data
    })
  }
    
  goToDetail(id) {
    console.log('goToDetail', id)
    this.props.history.push(`/admin/sell/${id}`)
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
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Data do Pedido</th>
                        <th>Data de Entrega</th>
                        <th>Última atualização</th>
                        <th>Valor</th>
                        <th></th>
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
                          <td className="td-actions">
                            <Button
                              color="link"
                              id="tooltip457194718"
                              title=""
                              type="button"
                              onClick={e => this.goToDetail(item.id)}
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button></td>
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

export default withRouter(Tables);
