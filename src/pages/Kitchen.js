import React from 'react';
import firebase from '../FirebaseWrapper';
import Order from '../components/Order';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import orderStatus from '../data/orderStatus';


class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state =
      {
        orders: []
      }
  }

  async componentDidMount() {
    await this.updateOrdersStateFromDB();
  }

  async updateOrdersStateFromDB(){
    const orders = await firebase.firestore.getOrdersByStatus(orderStatus.NEW);
    this.setState({ orders: orders.sort((a, b) => a.timeStamp - b.timeStamp) });
  }
  
  async orderReady(id){
    await firebase.firestore.changeOrderStatus(id, orderStatus.READY);
    await this.updateOrdersStateFromDB();
  }

  render() {
    return (<Container>
      <Row>
        <Col md='12' lg='12' className='d-flex flex-wrap justify-content-between'>
          {
            this.state.orders.map((order) => <Order key={order.id} order={order} onClick={this.orderReady.bind(this)}></Order>)
          }
        </Col>
      </Row>
    </Container>
    )
  }
}

export default Kitchen;