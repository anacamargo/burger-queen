import React from 'react';
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component {

    render(){
        if(!sessionStorage['userID']) return (<Redirect to='/login' />);
        return (<p>OK</p>);
        
    }
}

export default Dashboard;