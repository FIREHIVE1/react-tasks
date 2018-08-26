import React, {Component} from 'react';
import {Row, Col, Button} from 'reactstrap';
import PropTypes from 'prop-types';
import '../../css/Users.css';

export default class UserRow extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        edit: PropTypes.func.isRequired,
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


    _delete = (user_id) => {
        const {onDelete} = this.props;

        onDelete && onDelete(user_id);
    };



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
                    <Button className={'btn'}color="danger" size="sm" onClick={() => this._delete(user.id)}>Delete</Button>
                </Col>
            </Row>
        );
    }
}