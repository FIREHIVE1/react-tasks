import React, {Component,Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import {Button} from 'reactstrap';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
   } from 'reactstrap';


export default class Header extends Component {
    state = {
        redirect: false
    };

    _logout = () => {
        sessionStorage.removeItem('token');

        this.setState({
            redirect: true
        });
    };
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }



    render() {
        if (this.state.redirect) {
            return <Redirect to={'/login'}/>;
        }

        return (
            <Fragment>
                <div>
                    <Navbar color="dark" dark expand="md">
                        <NavbarBrand href="/">Home</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <div className={'header'}>
                                        <Button color="danger" size="sm" onClick={this._logout}>Logout</Button>
                                    </div>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            </Fragment>

        );
    }
}