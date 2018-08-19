import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <div>
                <p>Hello, friends!</p>
                <p>Go to <Link to={'/register'}>register</Link> page or <Link to={'/login'}>login</Link> if you already have an account</p>
            </div>
        )
    }
}
