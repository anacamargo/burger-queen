import React from 'react';
import data from '../data/menu.json';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import v4 from 'uuid/v4';

class Salao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameClient: '',
      cart: []
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
    if (index < 0) {
      const newItem = { ...item, amount: 1 };
      this.setState({
        cart: this.state.cart.concat(newItem)
      });
    } else {
      let newCart = this.state.cart;
      newCart[index].amount += 1;
      this.setState({
        cart: newCart
      })
    }
  }

  finishOrder = () => {
    const userName = sessionStorage['userName'];
    const obj = {
      nameClient: this.state.nameClient,
      nameEmployee: userName,
      cart: this.state.cart
    }
  }

  deleteItem = (key) => {
    const item2remove = this.state.cart.filter(x => x.key === key)[0];
    const items2maintain = this.state.cart.filter(x => x.key != key);

    if (item2remove.amount > 1) {
      item2remove.amount--;
      this.setState({ ...this.state, cart: [item2remove, ...items2maintain] });
    }
    else {
      this.setState({ ...this.state, cart: items2maintain });
    }
  }

  render() {
    const total = this.state.cart.reduce((acc, cur) => {
      return acc + (cur.amount * cur.price)
    }, 0);

    return <Container>
      <Row>
        <Col md='12' lg='12'>
          <input className='w-100 p-2 my-3 border rounded' placeholder='Nome do Cliente' value={this.state.nameClient} onChange={(event) => this.handleChange(event, 'nameClient')} />
        </Col>
      </Row>
      <Row>
        <Col md='12' lg='12' className='text-center'>
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
              return <p key={key}>{item.amount} {item.name} - {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <i className="fas fa-trash-alt" onClick={() => this.deleteItem(item.key)}></i></p>
            })
          }
        <hr />
        
        <p className="justify-content-end">Total: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <Button className='btn btn-dark btn-lg ml-4' onClick={this.finishOrder}>Finalizar Pedido</Button></p>
        </Col>
      </Row>
    </Container>
  }
}

export default Salao; 