import React, {Component} from 'react';
import axios from 'axios';
import {Button,Container,FormGroup,Form,Label,Input} from 'reactstrap';
import '../../css/Auth.css';
import {Link} from "react-router-dom";

export default class Forgot extends Component {
    state = {
        email: ''
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _forgotPassword = async () => {
        const {email} = this.state;

        const response = await axios.post(process.env.REACT_APP_API_URL + 'forgot-password', {
            email
        });

        if (response && response.data && response.data.responseType === 'success') {

            this.props.history.push('/change');
        } else {
            //error
        }
    };

    render() {
        const {email} = this.state;

        return (
            <Container className={'cont'}>
                <div>
                    <Form>
                        <h2>Forgot Password</h2>
                        <FormGroup>
                            <Label for="email">Please enter your email and we will send you a code to reset your password.</Label>
                            <Input type={'text'} name={'email'} value={email} placeholder="Email" onChange={this._onChange}/>
                            <Button className={'authbtn'}  color="primary" onClick={this._forgotPassword}>Send</Button>
                        </FormGroup>
                    </Form>
                </div>
            </Container>
        )
    }
}
