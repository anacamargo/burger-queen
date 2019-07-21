import React from 'react';
import data from '../data/menu.json';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import v4 from 'uuid/v4';
import firebase from '../FirebaseWrapper';
import AlertDismissible from '../components/AlertDismissible';
import orderStatus from '../data/orderStatus';

class Saloon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      cart: [],
      total: 0,
      alert: null
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  }

  order = (item) => {
    const index = this.state.cart.findIndex((ordered) => {
      return ordered.name === item.name;
    });

    let newCart = this.state.cart;

    if (index < 0) newCart.push({ ...item, amount: 1 });
    else newCart[index].amount += 1;

    const total = this.calcTotal(newCart);

    this.setState({ cart: newCart, total });
  }

  calcTotal(cart){
    return cart.reduce((acc, cur) => {
      return acc + (cur.amount * cur.price)
    }, 0);
  }

  finishOrder = () => {
    const userID = sessionStorage['userID'];
    const userName = sessionStorage['userName'];

    const obj = {
      employeeID: userID,
      employeeName: userName,
      clientName: this.state.clientName,
      cart: this.state.cart,
      total: this.state.total,
      timeStamp: Date.now(),
      status: orderStatus.NEW
    }
    try {
      firebase.firestore.createOrder(obj, v4());
      this.toast('success', 'Pedido enviado para cozinha!');
      this.setState({clientName: '', cart: [], total: 0, alert: null });
    }
    catch (error) { this.toast('danger', 'Erro ao enviar o pedido!'); }
  }

  deleteItem = (key) => {
    const index = this.state.cart.findIndex((ordered) => {
      return ordered.key === key;
    });
    
    let newCart = this.state.cart;

    if (newCart[index].amount > 1) newCart[index].amount--;
    else newCart.splice(index,1);
    
    const total = this.calcTotal(newCart);

    this.setState({cart : newCart, total})
  }

  toast(variant, text) {
    this.setState({ alert: { variant, text } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  }

  toCurrency(value){
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  render() {
    return <Container>
      <Row>
        <Col md='12' lg='12'>
          {this.state.alert && <AlertDismissible variant={this.state.alert.variant} text={this.state.alert.text}></AlertDismissible>}
        </Col>
      </Row>
      <Row>
        <Col md='12' lg='12'>
          <input className='w-100 p-2 my-3 border rounded' placeholder='Nome do Cliente' value={this.state.clientName} onChange={(event) => this.handleChange(event, 'clientName')} />
        </Col>
      </Row>
      <Row>
        <Col md='6' lg='6' className='text-center'>
          <Accordion>
            <Card className='border-0'>
              <Card.Header className='bg-transparent '>
                <Accordion.Toggle as={Button} variant='link' className='text-dark' eventKey="0">
                  Café da Manhã
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {
                    data.breakfast.map((item) => {
                      const key = v4();
                      item = { ...item, key };
                      return <Button type='button' className='btn btn-dark btn-lg btn-block' key={key} onClick={() => this.order(item)}>{item.name}</Button>
                    })
                  }
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card className='border-0'>
              <Card.Header className='bg-transparent '>
                <Accordion.Toggle as={Button} variant='link' className='text-dark' eventKey="1">
                  Lanches
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <p className='mb-0'>Tamanho do Hambúrguer</p>
                  {
                    data.allDay.hamburger.map((item) => {
                      const key = v4();
                      item = { ...item, key };
                      return <Button type='button' className='btn btn-dark btn-lg btn-block' key={key} onClick={() => this.order(item)}>{item.name}</Button>
                    })
                  }
                  <p className='mb-0'>Tipo de Carne</p>
                  {
                    data.allDay.hamburgerType.map((item) => {
                      const key = v4();
                      item = { ...item, key };
                      return <Button type='button' className='btn btn-dark btn-lg btn-block' key={key} onClick={() => this.order(item)}>{item.name}</Button>
                    })
                  }
                  <p className='mb-0'>Adicional</p>
                  {
                    data.allDay.extra.map((item) => {
                      const key = v4();
                      item = { ...item, key };
                      return <Button type='button' className='btn btn-dark btn-lg btn-block' key={key} onClick={() => this.order(item)}>{item.name}</Button>
                    })
                  }
                  <p className='mb-0'>Acompanhamento</p>
                  {
                    data.allDay.sideDish.map((item) => {
                      const key = v4();
                      item = { ...item, key };
                      return <Button type='button' className='btn btn-dark btn-lg btn-block' key={key} onClick={() => this.order(item)}>{item.name}</Button>
                    })
                  }
                  <p className='mb-0'>Bebidas</p>
                  {
                    data.allDay.drinks.map((item) => {
                      const key = v4();
                      item = { ...item, key };
                      return <Button type='button' className='btn btn-dark btn-lg btn-block' key={key} onClick={() => this.order(item)}>{item.name}</Button>
                    })
                  }
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
        <Col md='6' lg='6'>
          {
            this.state.cart.map((item, key) => {
              return <p key={key}>
                {item.amount} {item.name} - {this.toCurrency(item.price)}&nbsp;
                <i className="fas fa-trash-alt" onClick={() => this.deleteItem(item.key)}></i>
              </p>
            })
          }
          <hr />
          <p className='justify-content-end font-weight-bold'>
            Total: {this.toCurrency(this.state.total)}
            {
              this.state.clientName &&
              this.state.cart.length > 0 &&
              <Button className='btn btn-dark btn-lg ml-4' onClick={this.finishOrder}>Finalizar Pedido</Button>
            }
          </p>
        </Col>
      </Row>
    </Container>
  }
}

export default Saloon; 