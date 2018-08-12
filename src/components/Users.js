import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";

export default class Users extends Component {
    state = {
        users: []
    };

    async componentDidMount() {
        let users = await axios.get('http://api.tasks.local/v1/admin/users',{headers: { "Authorization":'Bearer ' + sessionStorage.getItem('jwt')}});
        this.setState({users: users.data.data});
    }

    _logout = () => {
        sessionStorage.removeItem('jwt');

        this.props.history.push('/');
    };

    render() {
        if (!sessionStorage.getItem('jwt')) {
            return <Redirect to={'/login'}/>
        }

        const {users} = this.state;

        return (
            <Fragment>

                {users.map((user, key) => <p key={key}>{user.name}</p>)}
                <p>Return <Link to={'/'}>Home</Link>.</p>
                <button onClick={this._logout}>Logout</button>
            </Fragment>
        )
    }
}

