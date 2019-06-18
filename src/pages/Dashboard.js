import React from 'react';
import Saloon from './Saloon';
import Kitchen from './Kitchen';
import { Redirect } from 'react-router-dom';
import Menu from '../components/Menu';
import './Style.css';

class Dashboard extends React.Component {

  render() {
    if (!sessionStorage['userID']) return (<Redirect to='/login' />);
    const userName = sessionStorage['userName'];
    const role = (sessionStorage['role'] === 'salao') ? <Saloon /> : <Kitchen />;
    
    return (
      <React.Fragment>
        <Menu userName={userName} />
        {role}
      </React.Fragment>
    )
  }
}

export default Dashboard;