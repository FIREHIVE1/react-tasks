import React, {Component} from 'react';
import {Row, Col, Button} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from "axios";
import '../../css/Users.css';

export default class UserRow extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        edit: PropTypes.func.isRequired,
        rerender: PropTypes.func.isRequired
     };

    _showRole = role => {
        switch (role) {
            case 1:
                return 'User';
            case 2:
                return 'Admin';
            default:
                return 'Unknown'
        }
    };

    _edit = (user) => {
        const {edit} = this.props;
        edit && edit(user);

    };

    _shouldrerender = () =>{
        const {rerender} = this.props;
        rerender && rerender();
    }


    _delete = async() => {
        const {user} = this.props;

        if (user.id) {
            let res = await axios.delete(process.env.REACT_APP_API_URL + `admin/user/${user.id}`);
            this._shouldrerender();
        }
    }


    render() {
        const {user} = this.props;

        return (
            <Row>
                <Col xs={1}>{user.id}</Col>
                <Col xs={3}>{user.name}</Col>
                <Col xs={4}>{user.email}</Col>
                <Col xs={2}>{this._showRole(user.role_id)}</Col>
                <Col xs={2}>
                    <Button className={'btn'} color="success" size="sm" onClick={() => this._edit(user)}>Edit</Button>
                    <Button className={'btn'}color="danger" size="sm"  onClick={this._delete}>Delete</Button>
                </Col>
            </Row>
        );
    }
}