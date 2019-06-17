import React from 'react';
import Salao from './Salao'
import { Redirect } from 'react-router-dom';
import Menu from '../components/Menu';
import './Style.css';

class Dashboard extends React.Component {

  render() {
    if (!sessionStorage['userID']) return (<Redirect to='/login' />);
    const userName = sessionStorage['userName'];
    return (
      <React.Fragment>
        <Menu userName={userName} />
        <Salao />
      </React.Fragment>
    )
  }
}

export default Dashboard;