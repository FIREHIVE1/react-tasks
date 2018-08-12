import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        jwt: ''
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _login = async () => {
        const {email, password, jwt} = this.state;

        const response = await axios.post('http://api.tasks.local/v1/login', {
            email, password , jwt
        });

        if (response && response.data && response.data.data) {
            sessionStorage.setItem('jwt', response.data.data.jwt);
            this.props.history.push('/users');
        } else {
            //afisam eroare
        }
    };

    render() {
        const {email, password} = this.state;

        return (
            <div>
                <p>Hello, login!</p>
                <input type={'text'} name={'email'} value={email} onChange={this._onChange} />
                <input type={'password'} name={'password'} value={password} onChange={this._onChange} />
                <button onClick={this._login}>Login</button>
            </div>
        )
    }
}