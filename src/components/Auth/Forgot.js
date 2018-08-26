import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Button, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";

export default class Forgot extends Component {
    state = {
        showCode: false,
        email: '',
        code: '',
        password: ''
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _changeRender = showCode => {
        this.setState({
            showCode
        })
    };

    _forgot = async () => {
        const {email} = this.state;

        const response = await axios.post(process.env.REACT_APP_API_URL + 'forgot-password', {
            email
        });

        if (response && response.data && response.data.responseType === 'success') {
            this.setState({
                showCode: true
            });
        } else {
            //afisam eroare
        }
    };

    _change = async () => {
        const {email, code, password} = this.state;

        const response = await axios.post(process.env.REACT_APP_API_URL + 'change-password', {
            email, code, password
        });

        if (response && response.data && response.data.responseType === 'success') {
            this.props.history.push('/login');
        } else {
            //afisam eroare
        }
    };

    _renderMain() {
        const {email} = this.state;

        return (
            <Fragment>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" value={email} onChange={this._onChange}/>
                </FormGroup>
                <Button color="primary" onClick={this._forgot}>Reset Password</Button>
                <Link to={'login'}>Login</Link>
                <span onClick={() => this._changeRender(true)}>Have a code?</span>
            </Fragment>
        );
    }

    _renderCode() {
        const {code, password} = this.state;

        return (
            <Fragment>
                <FormGroup>
                    <Label for="exampleCode">Code</Label>
                    <Input type="text" name="code" id="exampleCode" value={code} onChange={this._onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" value={password}
                           onChange={this._onChange}/>
                </FormGroup>
                <Button color="primary" onClick={this._change}>Change Password</Button>
                <Link to={'login'}>Login</Link>
            </Fragment>
        );
    }

    render() {
        const {showCode} = this.state;

        return (
            <div className={'card'}>
                {!showCode && this._renderMain()}
                {showCode && this._renderCode()}
            </div>
        )
    }
}


// import React, {Component} from 'react';
// import axios from 'axios';
// import {Button,Container,FormGroup,Form,Label,Input} from 'reactstrap';
// import '../../css/Auth.css';
//
// export default class Forgot extends Component {
//     state = {
//         email: ''
//     };
//
//     _onChange = (e) => {
//         const {name, value} = e.target;
//
//         this.setState({
//             [name]: value
//         });
//     };
//
//     _forgotPassword = async () => {
//         const {email} = this.state;
//
//         const response = await axios.post(process.env.REACT_APP_API_URL + 'forgot-password', {
//             email
//         });
//
//         if (response && response.data && response.data.responseType === 'success') {
//
//             this.props.history.push('/change');
//         } else {
//             //error
//         }
//     };
//
//     render() {
//         const {email} = this.state;
//
//         return (
//             <Container className={'cont'}>
//                 <div>
//                     <Form>
//                         <h2>Forgot Password</h2>
//                         <FormGroup>
//                             <Label for="email">Please enter your email and we will send you a code to reset your password.</Label>
//                             <Input type={'text'} name={'email'} value={email} placeholder="Email" onChange={this._onChange}/>
//                             <Button className={'authbtn'}  color="primary" onClick={this._forgotPassword}>Send</Button>
//                         </FormGroup>
//                     </Form>
//                 </div>
//             </Container>
//         )
//     }
// }
