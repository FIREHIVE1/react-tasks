import React, {Component,Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
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
                        <NavbarBrand href="/">Tasks</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem className={'menu-item'}>
                                    <Link to={"/"}>Home</Link>
                                </NavItem>
                                <NavItem className={'menu-item'}>
                                    <Link to={"users"}>Users</Link>
                                </NavItem>
                                <NavItem className={'menu-item'}>
                                    <Link to={"tasks"}>Tasks</Link>
                                </NavItem>
                                <NavItem className={'menu-item'}>
                                    <Link onClick={this._logout} to={""}>Logout</Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            </Fragment>

        );
    }
}