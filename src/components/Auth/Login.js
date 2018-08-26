import React, {Component} from 'react';
import axios from 'axios';
import {Button,Container,FormGroup,Form,Label,Input} from 'reactstrap';
import '../../css/Auth.css';
import {Link} from "react-router-dom";


export default class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _login = async () => {
        const {email, password} = this.state;

        const response = await axios.post(process.env.REACT_APP_API_URL + 'login', {
            email, password
        });

        if (response && response.data && response.data.data) {
            sessionStorage.setItem('token', response.data.data.jwt);
            this.props.history.push('/users');
        } else {
         //error
        }
    };

    render() {
        const {email, password} = this.state;

        return (
            <Container className={'cont'}>
            <div>
                <Form className={'sms'}>
                    <h2>Login</h2>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type={'text'} name={'email'} value={email} placeholder="Email" onChange={this._onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type={'password'} name={'password'} value={password} placeholder="Password"  onChange={this._onChange}/>
                    </FormGroup>
                        <Button className={'authbtn'}  color="primary" onClick={this._login}>Login</Button>
                    <p><Link to={'/forgot-password'}>Forgot password?</Link></p>
                    <p>Don't have an account? Please <Link to={'/register'}>Register.</Link></p>
                </Form>
            </div>
            </Container>
        )
    }
}
