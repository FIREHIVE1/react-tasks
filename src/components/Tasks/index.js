import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import axios from "axios";
import {ModalFooter, Button, Modal, ModalHeader, ModalBody, FormGroup, Form, Label, Input, Col, Row} from 'reactstrap';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import '../../css/tasks.css';

export default class Tasks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            users: [],
            shouldRerender: false,
            name: '',
            description: '',
            assign: '',
            open: false,
            id: false,
            page: 1
        }
    }

    async componentDidMount() {
        let response = await axios.get(process.env.REACT_APP_API_URL + `tasks`);

        let usersResponse = await axios.get(process.env.REACT_APP_API_URL + `admin/users`);

        this.setState({
            tasks: response.data.data,
            users: usersResponse.data.data,
            page: response.data.data.current_page
        });
    }

    _loadNextTasks = async () => {
        const {page, tasks} = this.state;

        if (tasks.current_page < tasks.last_page) {
            let response = await axios.get(process.env.REACT_APP_API_URL + `tasks?page=${(page + 1)}`);
            this.setState({
                tasks: {
                    ...response.data.data, data: [
                        ...response.data.data.data
                    ]
                },
                page: response.data.data.current_page
            });
        }
    };

    _loadPreviousTasks = async () => {
        const {page} = this.state;


        let response = await axios.get(process.env.REACT_APP_API_URL + `tasks?page=${(page - 1)}`);

        this.setState({
            tasks: {
                ...response.data.data, data: [
                    ...response.data.data.data
                ]
            },
            page: response.data.data.current_page
        });
    }

    async componentDidUpdate() {
        if (this.state.shouldRerender) {
            let response = await axios.get('http://api.tasks.local/v1/tasks');

            this.setState({
                tasks: response.data.data,
                shouldRerender: false,
                page: response.data.data.current_page
            });
        }
    }

    _toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _add = () => {
        this.setState({
            id: false,
            name: '',
            description: '',
            assign: '',
            open: true
        });
    };

    _edit = (task) => {
        this.setState({
            id: task.id,
            name: task.name,
            description: task.description,
            assign: task.assign,
            open: true
        });
    };

    _addTask = async () => {
        const {name, description, assign} = this.state;

        let res = await axios.post(process.env.REACT_APP_API_URL + 'task', {name, description, assign});

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                open: false
            });
        }
    };

    _editTask = async () => {
        const {id, name, description, assign} = this.state;

        let res = await axios.patch(process.env.REACT_APP_API_URL + `task/${id}`, {name, description, assign});

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                open: false
            });
        }
    };

    _deleteTask = async id => {
        let res = await axios.delete(process.env.REACT_APP_API_URL + `task/${id}`);

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true
            });
        }
    };

    _showUser = user_id => {
        const {users} = this.state;

        let name = '';

        users && users.map(user => {
            if (user.id === user_id) {
                name = user.name;
            }
        });

        return name;
    };

    render() {
        const {tasks, users, name, description, assign, open, id} = this.state;

        return (
            <Layout>
                <Modal isOpen={open} toggle={this._toggle}>
                    <ModalHeader toggle={this._toggle}>{id ? 'Edit task' : 'Add task'}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text"
                                       name="name"
                                       id="name"
                                       placeholder="Name"
                                       value={name}
                                       onChange={this._onChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea"
                                       name="description"
                                       id="description"
                                       placeholder="Description"
                                       value={description}
                                       onChange={this._onChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="assign">Select</Label>
                                <Input type="select"
                                       name="assign"
                                       id="assign"
                                       onChange={this._onChange}
                                       value={assign}>
                                    <option value={''}>Select</option>
                                    {users && users.map((user, key) => {
                                        return <option key={key} value={user.id}>{user.name}</option>;
                                    })}
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={id ? this._editTask : this._addTask}>{id ? 'Edit task' : 'Add task'}</Button>
                        <Button color="secondary" onClick={this._toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Button className={'addbtn'} color="primary" onClick={this._add}>Add task</Button>
                <div className={'tasks-list'}>
                    <Row className={'table-header'}>
                        <Col xs={1}>Id</Col>
                        <Col xs={2}>Name</Col>
                        <Col xs={3}>Description</Col>
                        <Col xs={2}>Created by</Col>
                        <Col xs={2}>Assigned to</Col>
                        <Col xs={2}>Actions</Col>
                    </Row>
                    {tasks && tasks.data && tasks.data.map((task, key) => {
                        return <Row key={key} className={`table-column ${key % 2 === 0 ? 'odd' : ''}`}>
                            <Col xs={1}>{task.id}</Col>
                            <Col xs={2}>{task.name}</Col>
                            <Col xs={3}>{task.description}</Col>
                            <Col xs={2}>{this._showUser(task.user_id)}</Col>
                            <Col xs={2}>{this._showUser(task.assign)}</Col>
                            <Col xs={2}>
                                <Button color="success" size="sm" onClick={() => this._edit(task)}>Edit</Button>
                                <Button color="danger" size="sm"
                                        onClick={() => this._deleteTask(task.id)}>Delete</Button>
                            </Col>

                        </Row>;
                    })}
                </div>

                <Pagination className={'pagebtn'} aria-label="Page navigation example">
                    <PaginationItem onClick={this._loadPreviousTasks}>
                        <PaginationLink previous/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            <div>{tasks.current_page}</div>
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem onClick={this._loadNextTasks}>
                        <PaginationLink next/>
                    </PaginationItem>
                </Pagination>
            </Layout>
        );
    }
}