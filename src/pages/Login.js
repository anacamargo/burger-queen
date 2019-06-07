import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import firebase from '../firebase-config';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const firebaseAppAuth = firebase.auth();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  }

  signIn = () => {
    firebaseAppAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        sessionStorage['userID'] = userCredential.user.uid;
        this.props.history.push(`/`);
      })
      .catch(alert);
  }

  render() {
    return (
      <section className='App-header'>
        <Link to='/'>LOGIN</Link>
        <Link to='register'>CADASTRO</Link>
        <Input text='E-mail' value={this.state.email} onChange={(event) => this.handleChange(event, 'email')} />
        <Input text='Senha' type='password' value={this.state.password} onChange={(event) => this.handleChange(event, 'password')} />
        <Button text='entrar' onClick={this.signIn} />
      </section>
    )
  }

}

export default Login;