import React from 'react';
import Button from '../components/Button';
import Select from '../components/Select';
import Input from '../components/Input';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import { Link } from 'react-router-dom';
import firebase from '../FirebaseWrapper';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      role: null,
      buttonEnabled: true,
      userRoles: [
        { value: 'cozinha', text: 'cozinha' },
        { value: 'salão', text: 'salão' }
      ]
    };
  }

  createUser = async () => {
    const { role, email, name, password } = this.state;

    if (role) {
      this.setState({ ...this.state, buttonEnabled: false });
      const userCredential = await firebase.auth.createUserWithEmailAndPassword(email, password);
      await firebase.firestore.createUser(userCredential.user.uid, role, email, name);
      sessionStorage['userID'] = firebase.auth.currentUserId;
      const user = await firebase.firestore.getUserById(firebase.auth.getCurrentUserID());
      sessionStorage['userName'] = user.displayName;
      sessionStorage['role'] = user.role;
      this.props.history.push(`/`);
    }
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  }

  render() {

    const { userRoles, email, name, password, buttonEnabled } = this.state;

    return (
      <Row className='mx-0'>
        <Col md='12' lg='12'>
          <Figure className='d-flex justify-content-center'>
            <Figure.Image
              width="600px"
              height="400px"
              alt="Burger Queen"
              src="/images/logo.png"
            />
          </Figure>
        </Col>
        <Col md='12' lg='12'>
          <div className='d-flex flex-row justify-content-around'>
            <Link className='link text-center' to='/'>LOGIN</Link>
            <Link className='link active text-center' to='register'>CADASTRO</Link>
          </div>
          <div className='mx-5'>
            <Input text='Nome' value={name} onChange={(event) => this.handleChange(event, 'name')} />
            <Input text='E-mail' value={email} onChange={(event) => this.handleChange(event, 'email')} />
            <Input text='Senha' type='password' value={password} onChange={(event) => this.handleChange(event, 'password')} />
            <Select options={userRoles} onChange={(event) => this.handleChange(event, 'role')} />
          </div>
          <div className='text-center my-5'>
            <Button text='cadastrar' onClick={this.createUser} disabled={!buttonEnabled} />
          </div>
        </Col>
      </Row >
    )
  }
}

export default Register;