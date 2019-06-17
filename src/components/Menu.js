import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import firebase from '../FirebaseWrapper';

function Menu(props) {
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src="/images/logo-white.png"
            width="80"
            height="auto"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Usuário: <a href="/">{props.userName}</a>
          </Navbar.Text>
          <Navbar.Text>
            <a className="ml-3" onClick={firebase.auth.signOut}>Sair</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  )
}

export default Menu;