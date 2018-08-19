import React, {Component} from 'react';
import axios from 'axios';
import {Button,Container,FormGroup,Form,Label,Input} from 'reactstrap';
import '../../css/Auth.css';
import {Link} from "react-router-dom";


export default class Register extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _register = async () => {
        const {name,email, password} = this.state;

        const response = await axios.post(process.env.REACT_APP_API_URL + 'register', {
            name, email, password
        });

        if (response && response.data && response.data.responseType === 'success') {
            this.props.history.push('/login');
        } else {
            //afisam eroare
        }
    };

    render() {
        const {name, email, password} = this.state;

        return (
            <div>
                <Container className={'cont'}>
                    <Form>
                        <h2>Register</h2>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type={'text'} name={'name'} value={name} placeholder="Name" onChange={this._onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type={'text'} name={'email'} value={email} placeholder="Email"  onChange={this._onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type={'password'} name={'password'} value={password} placeholder="Password"  onChange={this._onChange}/>
                        </FormGroup>
                        <Button className={'authbtn'} color="primary" onClick={this._register}>Register</Button>
                        <p>Already have an account? Please <Link to={'/login'}>Login.</Link></p>
                    </Form>
                </Container>
            </div>
        )
    }
}
