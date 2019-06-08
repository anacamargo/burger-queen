import React from 'react';
import Button from '../components/Button';
import Select from '../components/Select';
import Input from '../components/Input';
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
      <section>
        <form className='align-form'>
          <div className='align-text-link'>
            <Link className='link' to='/'>LOGIN</Link>
            <Link className='link active' to='/register'>CADASTRO</Link>
          </div>
          <Input text='Nome' value={name} onChange={(event) => this.handleChange(event, 'name')} />
          <Input text='E-mail' value={email} onChange={(event) => this.handleChange(event, 'email')} />
          <Input text='Senha' type='password' value={password} onChange={(event) => this.handleChange(event, 'password')} />
          <Select options={userRoles} onChange={(event) => this.handleChange(event, 'role')} />
          <div>
            <Button text='cadastrar' onClick={this.createUser} disabled={!buttonEnabled} />
          </div>
        </form>
      </section>
    )
  }
}

export default Register;