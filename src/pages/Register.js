import React from 'react';
import Button from '../components/Button';
import Select from '../components/Select';
import Input from '../components/Input';
import firebase from '../firebase-config';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

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

  createUser = () => {
    const {role, email, name, password} = this.state;
    
    if (role) {
      this.setState({ ...this.state, buttonEnabled: false });
      firebaseAppAuth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          database.doc(`users/${userCredential.user.uid}`).set({
            email: email,
            displayName: name,
            photoURL: '../images/avatar.png',
            createdAt: new Date(),
            role: role
          })
            .then(_ => {
              sessionStorage['userID'] = (firebaseAppAuth.currentUser.uid);
              this.props.history.push(`/`);
            });
        })
        .catch(alert);
    }
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  }

  render() {

    const {userRoles, email, name, password, buttonEnabled} = this.state;

    return (
      <section className='App-header'>
        <Link to='/'>LOGIN</Link>
        <Link to='/register'>CADASTRO</Link>
        <Input text='Nome' value={name} onChange={(event) => this.handleChange(event, 'name')} />
        <Input text='E-mail' value={email} onChange={(event) => this.handleChange(event, 'email')} />
        <Input text='Senha' type='password' value={password} onChange={(event) => this.handleChange(event, 'password')} />
        <Select options={userRoles} onChange={(event) => this.handleChange(event, 'role')} />
        <Button text='cadastrar' onClick={this.createUser} disabled={!buttonEnabled} />
      </section>
    )
  }
}

export default Register;