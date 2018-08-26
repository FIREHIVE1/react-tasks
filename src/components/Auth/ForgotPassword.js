import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Button,Container,FormGroup,Form,Label,Input} from 'reactstrap';
import '../../css/Auth.css';
import {Link} from "react-router-dom";

export default class ForgotPassword extends Component {
    state = {
        showCode: false,
        email: '',
        code: '',
        password: '',
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
                <Container className={'changepas'}>
                    <h2>Forgot Password</h2>
                    <FormGroup>
                        <Label for="exampleEmail">Please enter your email and we will send you a code to reset your password.</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Email" value={email} onChange={this._onChange}/>
                    </FormGroup>
                    <Button className={'authbtn'} color="primary" onClick={this._forgot}>Reset Password</Button>
                        <div>Remembered your password? Please <Link to={'login'}>Login.</Link></div>
                      <Link to={'#'} onClick={() => this._changeRender(true)}>Have a code?</Link>
                </Container>
            </Fragment>

        );
    }

    render() {
        const {showCode} = this.state;

        return (
            <div>
                {!showCode && this._renderMain()}
                {showCode && this._renderCode()}
            </div>
        )
    }

    _renderCode() {
        const {code, password} = this.state;

        return (
            <Fragment>
                <Container className={'changepas'}>
                    <h2>Reset Password</h2>
                        <FormGroup>
                            <Label for="exampleCode">Please enter your code</Label>
                            <Input type="text" name="code" id="exampleCode" placeholder="Code" value={code} onChange={this._onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">New password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="Password" value={password}
                                   onChange={this._onChange}/>
                        </FormGroup>
                        <Button className={'authbtn'} color="primary" onClick={this._change}>Change Password</Button>
                    <div>Remembered your password? Please <Link to={'login'}>Login.</Link></div>
                </Container>
            </Fragment>

    );
    }
}


// import React, {Component} from 'react';
// import axios from 'axios';
// import {Button,Container,FormGroup,Form,Label,Input} from 'reactstrap';
// import '../../css/Auth.css';
//
// export default class ForgotPassword extends Component {
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
//                         <h2>ForgotPassword Password</h2>
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
