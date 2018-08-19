import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import Users from './components/Users/Users';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Forgot from './components/Auth/Forgot';
import ChangePassword from './components/Auth/ChangePassword';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/users" component={Users}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/forgot" component={Forgot}/>
                    <Route exact path="/change" component={ChangePassword}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
