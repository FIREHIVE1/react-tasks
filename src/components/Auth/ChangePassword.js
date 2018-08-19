import React, {Component} from 'react';
import axios from 'axios';
import {Button, Container, FormGroup, Form, Label, Input} from 'reactstrap';
import '../../css/Auth.css';

export default class ChangePassword extends Component {
    state = {
        email: '',
        password: '',
        code: ''
    };


    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _changePassword = async () => {
        const {email, password, code} = this.state;

        const response = await axios.post(process.env.REACT_APP_API_URL + 'change-password', {
            email, password, code
        });

        if (response && response.data && response.data.responseType === 'success') {
             this.props.history.push('/login');
        } else {
            //error
        }
    };

    render() {
        const {email, password, code} = this.state;

        return (
            <Container className={'cont'}>
                <div>
                    <Form>
                        <h2>Change Password</h2>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type={'text'} name={'email'} value={email} placeholder="Email"
                                   onChange={this._onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="code">Code</Label>
                            <Input type={'text'} name={'code'} value={code} placeholder="Code"
                                   onChange={this._onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">New Password</Label>
                            <Input type={'password'} name={'password'} value={password} placeholder="Password"
                                   onChange={this._onChange}/>
                        </FormGroup>
                        <Button className={'authbtn'} color="primary" onClick={this._changePassword}>Send</Button>
                    </Form>
                </div>
            </Container>
        )
    }
}
